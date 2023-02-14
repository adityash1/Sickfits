import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import Router from "next/router";
import Loader from "./styles/Loading";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";

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
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  function update(cache, payload) {
    cache.evict(cache.identify(payload.data.createProduct));
  }

  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      update,
    }
  );

  const onSubmit = async (data) => {
    console.log(data);
    const res = await createProduct({
      variables: {
        name: data.Name,
        description: data.Description,
        price: Number(data.Price),
        image: data.Image[0],
      },
    });

    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [formState, reset]);

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
              aria-invalid={errors.Image ? "true" : "false"}
            />
            {errors.Image?.type === "required" && (
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
