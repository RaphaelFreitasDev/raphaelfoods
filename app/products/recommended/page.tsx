import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import ProductList from "@/app/_components/products-list";
import { db } from "@/app/_lib/prisma";

const RecommendedProducts = async () => {
  const products = await db.product.findMany({
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <h2 className="p-5 text-xl font-semibold"> Pedidos recomendados</h2>
      <div className="mt-6 grid grid-cols-2 gap-6 px-5">
        {products.map((Product) => (
          <ProductItem
            key={Product.id}
            product={Product}
            className="min-w-full"
          />
        ))}
      </div>
    </>
  );
};

export default RecommendedProducts;
