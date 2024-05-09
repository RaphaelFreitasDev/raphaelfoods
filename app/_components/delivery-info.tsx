import { BikeIcon, ClockIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Card } from "./ui/card";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTime">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="mt-6 flex items-center justify-around p-5">
      <div className="">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Entrega</span>
          <BikeIcon size={16} />
        </div>
        <span className="text-center text-sm font-semibold ">
          {Number(restaurant.deliveryFee) > 0
            ? formatCurrency(Number(restaurant.deliveryFee))
            : "Grátis"}
        </span>
      </div>
      <div className="">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Entrega</span>
          <ClockIcon size={16} />
        </div>
        <h2 className="text-center text-sm font-semibold">
          {restaurant.deliveryTime} min
        </h2>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
