import Link from "next/link";
import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({
    include: {
      Product: true,
    },
  });

  const categoriasComItens = categories.filter(
    (categoria) => categoria.Product.length > 0,
  );

  return (
    <div className="grid grid-cols-2 gap-3">
      {categoriasComItens.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
