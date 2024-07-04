import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const token = localStorage.getItem("token");

const CreateGene = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/soulGene`,
        { ...data, plotId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Soul Gene created:", response.data);
      alert("Soul Gene created successfully!");
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
    <div className="container mt-5">
      <h1>{id}</h1>
      <div className="card p-3" style={{ width: "28rem" }}>
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
              className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
              id="birthdate"
              {...register("birthdate", { required: "Birthdate is required" })}
            />
            {errors.birthdate && (
              <div className="invalid-feedback">{errors.birthdate.message}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Create Soul Gene
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGene;
