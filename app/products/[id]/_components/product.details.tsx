"use client";

import BadgeDiscount from "@/app/_components/badge-discount";
import {
  formatCurrency,
  calculateProductTotalPrice,
} from "@/app/_helpers/price";
import ProductImage from "./product-image";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import ProductList from "@/app/_components/products-list";
import DeliveryInfo from "@/app/_components/delivery-info";

interface ProductDetailsProp {
  product: Prisma.ProductGetPayload<{ include: { restaurant: true } }>;
  extraProducts: Prisma.ProductGetPayload<{ include: { restaurant: true } }>[];
}

const ProductDetails = ({ product, extraProducts }: ProductDetailsProp) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncraeseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantityClick = () =>
    setQuantity((curentState) => {
      if (curentState == 1) {
        return 1;
      }
      return curentState - 1;
    });

  return (
    <div>
      <ProductImage product={product} />
      <div className=" relative z-50 mt-[-1.5rem] rounded-tl-3xl bg-white p-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
        <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <BadgeDiscount value={product.discountPercentage} />
              )}
            </div>
            {product.discountPercentage > 0 && (
              <p className="text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              size={"icon"}
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4 text-center">{quantity}</span>
            <Button size={"icon"} onClick={handleIncraeseQuantityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <DeliveryInfo restaurant={product.restaurant} />
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sucos</h3>
          <ProductList product={extraProducts} />
        </div>
        <div className="mt-6">
          <Button className="w-full font-semibold">Adicionar a sacola</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
