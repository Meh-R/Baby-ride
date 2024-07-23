"use client";
import Header from "@/components/header/Header";
import { Context } from "@/context/context";
import { createCartHasProduct, productById } from "@/services/product";
import { Product } from "@/utils/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = ({ params }: { params: { id: string } }) => {
  const [detailProduct, setDetailsProduct] = useState<Product>();
  const [productNumber, setProductNumber] = useState(0);
  const [reload, setReload] = useState(1);
  const productId = detailProduct?.id;

  useEffect(() => {
    const getProduct = async () => {
      const response = await productById(params.id);
      setDetailsProduct(response.data);
      console.log(response.data);
    };
    getProduct();
  }, [params.id]);

  async function HandlecreateCartHasProduct() {
    if (productId) {
      if (productNumber > detailProduct!.stock) {
        toast.error("La quantité ne peut pas dépasser le stock disponible.");
        return;
      }

      if (productNumber <= 0) {
        toast.error("La quantité doit être supérieure à zéro.");
        return;
      }

      await createCartHasProduct(productId, productNumber)
        .then((res) => {
          console.log(res);
          toast.success("Produit ajouté au panier avec succès");
          setReload(new Date().getTime());
        })
        .catch((e) => {
          toast.error("Une erreur est survenue."), console.log(e);
        });
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);

    if (newQuantity > detailProduct!.stock) {
      toast.error("La quantité ne peut pas dépasser le stock disponible.");
      setProductNumber(detailProduct!.stock);
    } else if (newQuantity < 0) {
      toast.error("La quantité ne peut pas être négative.");
      setProductNumber(0);
    } else {
      setProductNumber(newQuantity);
    }
  };

  return (
    <div>
      <Context.Provider value={{ setReload, reload }}>
        <Header>
          <Link className="mr-5 mb-1" href={`/myHomePage`}>
            Home
          </Link>
        </Header>
      </Context.Provider>
      <div className="mt-5 flex flex-col items-center md:flex md:flex-row md:mt-15 md:mb-10 md:ml-20">
        <input
          type="number"
          value={productNumber}
          onChange={handleQuantityChange}
          className=" w-3/6 md:w-2/6 text-black rounded-md indent-3 mb-5 mt-5 border-2 border-gray-400 "
          placeholder="Quantity"
          required
        />
        <button
          className=" w-2/6 md:w-1/6 bg-yellow-100 hover:bg-yellow-200 h-15 text-black rounded-md text-center  p-2 m-4 "
          onClick={HandlecreateCartHasProduct}
        >
          Add to cart
        </button>
      </div>
      <div className="md:flex md:flex-row">
        <img
          className="w-full md:w-2/3 md:ml-10 md:mb-10 object-cover object-center"
          src={`http://localhost:3000/image/view/${detailProduct?.picsProduct}`}
          alt="product"
        />
        <div className="ml-5">
          <p className="my-4 pl-4 font-bold text-gray-800">
            Name: {detailProduct?.name}
          </p>
          <p className="my-4 pl-4 font-bold text-gray-800">
            Description: {detailProduct?.description}
          </p>
          <p className="my-4 pl-4 font-bold text-gray-800">
            Stock: {detailProduct?.stock}
          </p>
          <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
            Price: {detailProduct?.price} $
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
