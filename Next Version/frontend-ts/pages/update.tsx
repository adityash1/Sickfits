import UpdateProduct from "@/components/UpdateProduct";

export default function UpdatePage({ query }: any) {
  console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
