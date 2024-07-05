import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { sendMessage } from "../../websocket";
import { useNavigate } from "react-router-dom";

const CreateGene = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const onSubmit = async (data) => {
    try {
      sendMessage({
        type: "createGene",
        body: { ...data, plotId: id },
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

              <button type="submit" className="btn btn-primary">
                Create Soul Gene
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGene;
