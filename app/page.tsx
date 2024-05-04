import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromotionBanner from "./_components/promotion-banner";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
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
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <PromotionBanner
          link="/banner-pizza.png"
          text="Até 30% de deconto em pizzas"
        />
      </div>
      <div className="space-y-4 pt-6 ">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold"> Pedidos Recomendados</h2>
          <Button
            variant={"ghost"}
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>

        <ProductList product={products} />
      </div>
      <div className="px-5 pt-6">
        <PromotionBanner
          link="/banner-hamburger.png"
          text="Até 30% de deconto em hamburgers"
        />
      </div>
    </>
  );
};

export default Home;
