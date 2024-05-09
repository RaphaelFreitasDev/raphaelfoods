import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/resturant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/products-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: { name: "asc" },
        include: {
          Product: {
            where: { restaurantID: id },
            include: { restaurant: { select: { name: true } } },
          },
        },
      },
      Product: {
        take: 10,
        include: { restaurant: { select: { name: true } } },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage Restaurant={restaurant} />
      <div className=" z-60 relative mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white  p-5">
        <div className="flex items-center gap-[0.135rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>
      <div className="mt-3 flex w-full items-center gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
            key={category.id}
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold"> Mais Pedidos</h2>
        <ProductList product={restaurant.Product} />
      </div>
      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="px-5 font-semibold"> {category.name}</h2>
          <ProductList product={category.Product} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantPage;
