import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { ALL_PRODUCTS_QUERY } from "./Products";
import Loader from "./styles/Loading";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    createProduct({
      variables: {
        name: data.Name,
        description: data.Description,
        price: Number(data.Price),
        image: data.Image[0],
      },
    });
  };

  return (
    <>
      {loading && <Loader />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DisplayError error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
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
              type="number"
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
        </fieldset>
      </Form>
    </>
  );
}
