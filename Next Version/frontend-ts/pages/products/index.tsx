import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import Products from "@/components/Products";

export default function OrderPage() {
  const { query } = useRouter();
  const page = parseInt(query.page as string);
  return (
    <div>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
