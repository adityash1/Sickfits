import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Loader from "./styles/Loading";
import Router from "next/router";
import { useEffect } from "react";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      where: { id: $id }
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

function update(cache: any, payload: any) {
  console.log("payload", payload);
  console.log("running the update function after edit");
  cache.evict(cache.identify(payload.data.updateProduct));
}

export default function UpdateProduct({ id }: { id: string }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const [updateProduct, { error: updateError, loading: updateLoading }] =
    useMutation(UPDATE_PRODUCT_MUTATION, {
      update,
    });

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = await updateProduct({
      variables: {
        id,
        name: data.name,
        description: data.description,
        price: Number(data.price),
      },
    });
    console.log(res);
    Router.push({
      pathname: `/product/${res?.data?.updateProduct.id}`,
    });
  };

  useEffect(() => {
    if (data && !loading && !error) {
      const { name, price, description } = data.product;
      setValue("name", name);
      setValue("price", price);
      setValue("description", description);
    }
  }, [data, loading, error, setValue]);

  return (
    <>
      {updateLoading && <Loader />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DisplayError error={error || updateError} />
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              // name="name"
              placeholder="Name"
              {...register("name")}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              // name="price"
              placeholder="Price"
              {...register("price")}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              // name="description"
              placeholder="Description"
              {...register("description")}
            />
          </label>
          <button type="submit">Update Product</button>
        </fieldset>
      </Form>
    </>
  );
}
