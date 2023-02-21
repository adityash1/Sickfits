import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import DisplayError from "./ErrorMessage";

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  Image {
    /* width: 100%; */
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }: { id: string }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { product } = data;
  console.log(product);
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {product.name}</title>
      </Head>
      <Image
        src={product.photo.image.publicUrlTransformed}
        alt={product.photo.altText}
        width={500}
        height={500}
      />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
}
