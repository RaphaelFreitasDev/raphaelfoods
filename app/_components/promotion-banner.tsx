import Image from "next/image";

interface PromotionBannerProps {
  link: string;
  text: string;
}

const PromotionBanner = ({ link, text }: PromotionBannerProps) => {
  return (
    <>
      <Image
        src={link}
        alt={text}
        height={0}
        width={0}
        className="h-auto w-full object-contain"
        sizes="100vw"
        quality={100}
      />
    </>
  );
};

export default PromotionBanner;
