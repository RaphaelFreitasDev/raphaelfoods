import Image from "next/image";
import { CartContext, CartProduct } from "../_providers/_contexts/card";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const { decreaseProductQtd, increaseProductQtd, removeProductToCart } =
    useContext(CartContext);

  const handleDecreaseProductQtd = () => {
    decreaseProductQtd(cartProduct.id);
  };
  const handleIncraeseProductQtd = () => {
    increaseProductQtd(cartProduct.id);
  };

  const handleRemoveProductToCart = () => {
    removeProductToCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 ">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              size={"icon"}
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon size={16} onClick={handleDecreaseProductQtd} />
            </Button>
            <span className="block w-3 text-center text-xs">
              {cartProduct.quantity}
            </span>
            <Button
              size={"icon"}
              className="h-7 w-7"
              onClick={handleIncraeseProductQtd}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        size={"icon"}
        className="h-8 w-8 border border-solid border-muted-foreground"
        variant={"ghost"}
        onClick={handleRemoveProductToCart}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
