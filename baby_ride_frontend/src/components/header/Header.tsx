import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaRegUserCircle } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import {
  allCartHasProduct,
  deleteCartHasProduct,
  updateCartHasProduct,
} from "@/services/product";
import { AuthProps, CartHasProduct } from "@/utils/types";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Context } from "@/context/context";
import toast from "react-hot-toast";

const Header = ({ children }: { children: React.ReactNode }) => {
  const [cartHasProductList, setCartHasProductList] = useState<
    CartHasProduct[]
  >([]);
  const [user, setUser] = useState<AuthProps>();
  const { reload, setReload } = useContext(Context);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const getCartHasProduct = async () => {
      const response = await allCartHasProduct();
      setCartHasProductList(response.data.cartHasProduct);
      setUser(response.data.user);
      const initialQuantities = response.data.cartHasProduct.reduce(
        (acc: { [key: string]: number }, item: CartHasProduct) => {
          acc[item.product.id] = item.quantity;
          return acc;
        },
        {}
      );
      setQuantities(initialQuantities);
    };
    getCartHasProduct();
  }, [reload]);

  async function cartHasProductDelete(elementId: string) {
    await deleteCartHasProduct(elementId)
      .then(async (res) => {
        toast.success("Produit du panier supprimé");
        setReload(new Date().getTime());
      })
      .catch((e) => {
        toast.error("Ça n'a pas fonctionné."), console.log(e);
      });
  }

  async function cartHasProductUpdate(elementId: string, quantity: number) {
    await updateCartHasProduct(elementId, quantity)
      .then(async (res) => {
        setReload(new Date().getTime());
      })
      .catch((e) => {
        toast.error("Ça n'a pas fonctionné."), console.log(e);
      });
  }

  const totalGeneral = cartHasProductList.reduce((total, element) => {
    return total + element.product.price * element.quantity;
  }, 0);

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productId];
      const newQuantity = currentQuantity + change;
      const product = cartHasProductList.find(
        (item) => item.product.id === productId
      );

      if (newQuantity < 0) {
        toast.error("La quantité ne peut pas être inférieure à zéro.");
        return prev;
      }

      if (product && newQuantity > product.product.stock) {
        toast.error("La quantité ne peut pas dépasser le stock disponible.");
        return prev;
      }

      cartHasProductUpdate(productId, newQuantity);
      return { ...prev, [productId]: newQuantity };
    });
  };

  return (
    <div className="">
      <header>
        <div className="bg-yellow-100 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-0">
          <div className="flex flex-row justify-between items-center">
            <a href={`/myHomePage`} className="">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Baby ride
              </span>
            </a>
            <div
              className="justify-between items-center w-full"
              id="mobile-menu-2"
            >
              <div className="flex justify-end align-center flex-wrap font-medium">
                {children}
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="m-1">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">
                      <FaRegUserCircle />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto">
                    <div className="bg-pink-100">
                      <button
                        onClick={() => {
                          window.localStorage.removeItem("token");
                          window.localStorage.removeItem("role");
                          window.alert("Déconnecté avec succès");
                          window.location.href = "./";
                        }}
                        className="text-black m-1 mx-5"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Sheet>
                  <SheetTrigger asChild>
                    <span className="flex flex-row items-center">
                      <RiShoppingCart2Line />{" "}
                      <span className="text-black rounded-full w-6 h-6 flex items-center justify-center">
                        ({cartHasProductList.length})
                      </span>
                    </span>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetTitle>Panier</SheetTitle>
                    {cartHasProductList &&
                      cartHasProductList.map((element) => (
                        <div
                          key={element.product.id}
                          className="mt-5 flex flex-row items-center cursor-pointer rounded-lg  duration-150 hover:scale-105 hover:shadow-md"
                        >
                          <img
                            className="w-10 h-10 md:w-20 md:h-20 rounded-full object-cover object-center"
                            src={`http://localhost:3000/image/view/${element.product.picsProduct}`}
                            alt="product"
                          />
                          <div className="w-20 ml-2">
                            <p className="font-light text-xs  md:font-medium text-gray-800">
                              {element.product.name}
                            </p>
                            <p className="font-light text-xs  md:font-medium text-gray-800">
                              prix : {element.product.price} $
                            </p>
                            <p className="font-light text-xs  md:font-medium text-gray-800">
                              quantité : {element.quantity}
                            </p>
                          </div>
                          <div className="flex w-20 items-center flex-col ">
                            <div className="flex flex-row">
                              <Button
                                className="mr-1"
                                onClick={() =>
                                  handleQuantityChange(element.product.id, 1)
                                }
                              >
                                <FaPlus />
                              </Button>
                              <p>{quantities[element.product.id]}</p>
                              <Button
                                className="ml-1"
                                onClick={() =>
                                  handleQuantityChange(element.product.id, -1)
                                }
                              >
                                <FaMinus />
                              </Button>
                            </div>
                            <p className="font-light text-xs md:font-medium text-gray-800">
                              Total :{" "}
                              {element.product.price *
                                quantities[element.product.id]}{" "}
                              $
                            </p>
                          </div>
                          <div className="ml-1 md:ml-10">
                            <Button
                              onClick={() =>
                                cartHasProductDelete(element.product.id)
                              }
                            >
                              <RiDeleteBin2Fill />
                            </Button>
                          </div>
                        </div>
                      ))}
                    <div className="mt-5 flex flex-row justify-end items-center p-2">
                      <p className="font-medium text-lg text-gray-800">
                        Total Général : {totalGeneral} $
                      </p>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
