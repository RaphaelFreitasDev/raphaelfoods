"use client";

import { calculateProductTotalPrice } from "@/app/_helpers/price";
import { Prisma, Product, Restaurant } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  addProductToCart: (product: Product, quantity: number) => void;
  decreaseProductQtd: (productId: string) => void;
  increaseProductQtd: (productId: string) => void;
  removeProductToCart: (productId: string) => void;
  subTotalPrice: number;
  totalPrice: number;
  totalDiscont: number;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
  decreaseProductQtd: () => {},
  increaseProductQtd: () => {},
  removeProductToCart: () => {},
  subTotalPrice: 0,
  totalDiscont: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscont = subTotalPrice - totalPrice;

  const decreaseProductQtd = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id == productId) {
          if (cartProduct.quantity == 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      }),
    );
  };
  const increaseProductQtd = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id == productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const removeProductToCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id != productId),
    );
  };

  const addProductToCart = (product: Product, quantity: number) => {
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id == product.id,
    );

    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id == product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }

          return cartProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQtd,
        increaseProductQtd,
        removeProductToCart,
        subTotalPrice,
        totalDiscont,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
