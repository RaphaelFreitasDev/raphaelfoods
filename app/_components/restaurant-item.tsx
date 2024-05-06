import { Restaurant } from "@prisma/client";
import {
  BikeIcon,
  HeartPulseIcon,
  StarIcon,
  StarsIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
      <div className="relative flex h-[136px] w-full items-center">
        <Image
          src={restaurant.imageUrl}
          fill
          className="rounded-lg object-cover"
          alt={restaurant.name}
        />
        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
        <div className="absolute right-2 top-2 flex items-center gap-[2px] rounded-full bg-[#3c3c3c] px-2 py-2 text-white">
          <HeartPulseIcon size={12} className="fill-white text-white" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) == 0
                ? "Entraga Gartis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TimerIcon size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTime} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
