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
        <input type="file" {...register("Image", { required: true })} />
        {errors.Image && <div>This field is required</div>}
        Name
        <input {...register("Name", { required: true })} />
        {errors.Name && <span>This field is required</span>}
      </label>
      <label htmlFor="Price">
        Price
        <input {...register("Price", { required: true })} />
        {errors.Price && <span>This field is required</span>}
      </label>
      <label htmlFor="Description">
        Description
        <textarea {...register("Description", { required: true })} />
        {errors.Description && <span>This field is required</span>}
      </label>
      <input type="submit" />
    </Form>
  );
}
