import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import Link from "next/link";
import Image from "next/image";
import formatMoney from "@/lib/formatMoney";
import DeleteProduct from "./DeleteProduct";

export type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: {
    id: string;
    image: {
      publicUrlTransformed: string;
    };
  };
};

const Product = ({ product }: { product: ProductType }) => {
  return (
    <ItemStyles>
      <Image
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
        width={500}
        height={500}
      />
      <Title>
        <Link href={`/product/${product.id}`}> {product.name} </Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "/update",
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
};

export default Product;
