import PropTypes from "prop-types";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import Link from "next/link";
import Image from "next/image";
import formatMoney from "@/lib/formatMoney";

const Product = ({ product }) => {
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
    </ItemStyles>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
