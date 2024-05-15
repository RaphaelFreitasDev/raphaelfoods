import { useContext } from "react";
import { CartContext } from "../_providers/_contexts/card";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalDiscont, totalPrice } =
    useContext(CartContext);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem cartProduct={product} key={product.id} />
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between text-xs">
              <span className=" text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subTotalPrice)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Descontos</span>
              <span>- {formatCurrency(totalDiscont)}</span>
            </div>
            <Separator className="h-[0.5px]" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Entrega</span>
              <span>
                {Number(products[0].restaurant.deliveryFee) == 0
                  ? "Grátis"
                  : formatCurrency(Number(products[0].restaurant.deliveryFee))}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Total</span>
              <span>
                {formatCurrency(
                  totalPrice + Number(products[0].restaurant.deliveryFee),
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-6 w-full">Finalizar Pedido</Button>
    </div>
  );
};

export default Cart;
