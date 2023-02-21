import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
    }
  }
`;

function update(cache: any, payload: any) {
  console.log("payload",payload);
  console.log("running the update function after delete");
  cache.evict(cache.identify(payload.data.deleteProduct));
}

interface DeleteProductProps {
  id: string;
  children: React.ReactNode;
}

export default function DeleteProduct({ id, children }: DeleteProductProps) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          console.log("DELETE");
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
