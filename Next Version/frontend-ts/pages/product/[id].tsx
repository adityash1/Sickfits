import SingleProduct from "@/components/SingleProduct";

export default function SingleProductPage({
  query,
}: {
  query: { id: string };
}) {
  return (
    <div>
      <SingleProduct id={query.id} />
    </div>
  );
}
