import { useForm } from "react-hook-form";
import Form from "./styles/Form";

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="Image">
        Image
        <input
          type="file"
          {...register("Image", { required: true })}
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName?.type === "required" && (
          <p role="alert">Image is required</p>
        )}
      </label>
      <label htmlFor="Name">
        Name
        <input
          {...register("Name", { required: true })}
          aria-invalid={errors.Name ? "true" : "false"}
        />
        {errors.Name?.type === "required" && (
          <p role="alert">Name is required</p>
        )}
      </label>
      <label htmlFor="Price">
        Price
        <input
          {...register("Price", { required: true })}
          aria-invalid={errors.Price ? "true" : "false"}
        />
        {errors.Price?.type === "required" && (
          <p role="alert">Price is required</p>
        )}
      </label>
      <label htmlFor="Description">
        Description
        <textarea
          {...register("Description", { required: true })}
          aria-invalid={errors.Description ? "true" : "false"}
        />
        {errors.Description?.type === "required" && (
          <p role="alert">Description is required</p>
        )}
      </label>
      <input type="submit" />
    </Form>
  );
}
