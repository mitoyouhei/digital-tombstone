import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { sendMessage } from "../../websocket";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const CreateGene = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const gene = useSelector((state) => {
    if (state.soulGene.genes) {
      return state.soulGene.genes.find((g) => g.plotId === id);
    }
    return null;
  });

  const defaultValues = { birthdate: formatDate(new Date()) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    gene &&
      Object.keys(gene).forEach((key) => {
        const value = gene[key];
        const isBirthdate = key === "birthdate";
        setValue(key, isBirthdate ? formatDate(new Date(value)) : value);
      });
  }, [setValue, gene]);

  const onSubmit = async (data) => {
    try {
      sendMessage({
        type: "createGene",
        body: { ...gene, ...data, plotId: id },
      });
      navigate("/");
    } catch (error) {
      console.error(
        "Error creating Soul Gene:",
        error.response?.data || error.message
      );
      alert(
        "Failed to create Soul Gene: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="col-md-3 position-absolute top-50 start-50 translate-middle">
        <div className="card">
          <div className="card-header">
            <h1>[{id}]</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="birthdate" className="form-label">
                  Birthdate
                </label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.birthdate ? "is-invalid" : ""
                  }`}
                  id="birthdate"
                  {...register("birthdate", {
                    required: "Birthdate is required",
                  })}
                />
                {errors.birthdate && (
                  <div className="invalid-feedback">
                    {errors.birthdate.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="introduction" className="form-label">
                  Personal Introduction
                </label>
                <textarea
                  className={`form-control ${
                    errors.introduction ? "is-invalid" : ""
                  }`}
                  id="introduction"
                  {...register("introduction", {
                    required: "Introduction is required",
                  })}
                />
                {errors.introduction && (
                  <div className="invalid-feedback">
                    {errors.introduction.message}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                {gene ? "Update Soul Gene" : "Create Soul Gene"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGene;
