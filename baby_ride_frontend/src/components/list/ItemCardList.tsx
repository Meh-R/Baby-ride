import { Product } from "@/utils/types";
import Link from "next/link";
import React, { useContext } from "react";
import ButtonUpdateProduct from "./buttonUpdateProduct";
import { Context2 } from "@/context/context2";
import { Button } from "../ui/button";
import { ImBin } from "react-icons/im";
import { deleteProduct } from "@/services/product";
import toast from "react-hot-toast";

const ItemCardList = ({ productList }: { productList: Product[] }) => {
  console.log({ productList });
  const { isReloadNeeded, setIsReloadNeeded } = useContext(Context2);

  async function productDelete(elementId: string) {
    await deleteProduct(elementId)
      .then(async (res) => {
        toast.success("Product delete");
        setIsReloadNeeded(new Date().getTime());
      })
      .catch((e) => {
        toast.error("Ça n'a pas fonctionné."), console.log(e);
      });
  }
  return (
    <div className="md:flex md:flex-row md:flex-wrap sm:hidden ">
      {productList &&
        productList?.map((item: Product) => {
          return (
            <div className=" md:w-1/4 ">
              <Link
                href={`/productPage/${item.id}`}
                key={item.id}
                className="flex mt-5  bg-white items-center justify-center"
              >
                <div className="max-w-xs cursor-pointer rounded-lg p-2 duration-150 hover:scale-104 hover:shadow-md">
                  <img
                    className="w-full rounded-lg object-cover object-center"
                    src={`http://localhost:3000/image/view/${item.picsProduct}`}
                    alt="product"
                  />
                  {item.category && (
                    <p className="my-4 pl-4 font-bold text-gray-500">
                      type: {item.category.type}
                    </p>
                  )}
                  <p className="my-4 pl-4 font-bold text-gray-800">
                    {item.name}
                  </p>
                  <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                    price: {item.price} $
                  </p>
                </div>
              </Link>
              <div className="w-full md:ml-5 md:w-1/4 flex flex-row justify-around">
                <ButtonUpdateProduct
                  setIsReloadNeeded={setIsReloadNeeded}
                  id={item.id}
                />
                <Button
                  onClick={() => {
                    productDelete(item.id);
                  }}
                >
                  <ImBin />
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ItemCardList;
