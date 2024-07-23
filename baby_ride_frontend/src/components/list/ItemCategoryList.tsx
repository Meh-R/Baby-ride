import React, { useContext, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { productByCategory } from "@/services/product";
import { Category, Product } from "@/utils/types";
import ButtonUpdateCategory from "./buttonUpdateCategory";
import { Context2 } from "@/context/context2";
import { Button } from "../ui/button";
import { ImBin } from "react-icons/im";
import { deleteCategory } from "@/services/category";
import toast from "react-hot-toast";

const ItemCategoryList = ({
  categoryList,
  setProductList,
  categoryPage,
  handleCategorySelect,
}: {
  categoryList: Category[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
  categoryPage: number;
  handleCategorySelect: (category: string) => void;
}) => {
  const { isReloadNeeded, setIsReloadNeeded } = useContext(Context2);
  const [categoryType, setCategoryType] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("role") === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  async function getProductListByCategory(type: string, page: number) {
    const response = await productByCategory(type, page);
    setProductList(response.data);
  }

  async function categoryDelete(elementId: string) {
    await deleteCategory(elementId)
      .then(async (res) => {
        toast.success("Category deleted");
        setIsReloadNeeded(new Date().getTime());
      })
      .catch((e) => {
        toast.error("Ça n'a pas fonctionné."), console.log(e);
      });
  }

  useEffect(() => {
    if (categoryType) {
      getProductListByCategory(categoryType, categoryPage);
    }
  }, [categoryType, categoryPage]);

  return (
    <div className="flex justify-center">
      <Carousel
        opts={{
          loop: true,
        }}
        className="md:basis-1/2 lg:basis-2/3"
      >
        <CarouselContent>
          {categoryList &&
            categoryList.map((item: Category) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <div
                  className=""
                  onClick={() => {
                    setCategoryType(item.type);
                    handleCategorySelect(item.type);
                  }}
                >
                  <p className="my-4 pl-4 font-bold text-gray-500">
                    {item.type}
                  </p>
                  <img
                    className=""
                    src={`http://localhost:3000/image/view/${item.picsCategory}`}
                    alt="category"
                  />
                </div>
                <div className="w-full md:w-1/4 flex flex-row justify-around">
                  <ButtonUpdateCategory
                    setIsReloadNeeded={setIsReloadNeeded}
                    id={item.id}
                  />
                  {isAdmin && (
                    <Button onClick={() => categoryDelete(item.id)}>
                      <ImBin />
                    </Button>
                  )}
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ItemCategoryList;
