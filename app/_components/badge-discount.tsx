import { ArrowDownIcon } from "lucide-react";

interface BadgeDiscountProps {
  value: number;
}

const BadgeDiscount = ({ value }: BadgeDiscountProps) => {
  return (
    <div className="flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
      <ArrowDownIcon size={12} />
      <span className="text-xs font-semibold">{value}%</span>
    </div>
  );
};

export default BadgeDiscount;
