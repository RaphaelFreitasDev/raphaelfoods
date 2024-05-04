import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";

interface ProductListPops {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = async ({ product }: ProductListPops) => {
  return (
    <div className="flex gap-3 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {product.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
