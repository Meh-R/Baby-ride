"use client";

import Header from "@/components/header/Header";
import ButtonCreateProduct from "@/components/header/ButtonCreateProduct";
import ItemCardList from "@/components/list/ItemCardList";
import { allProducts, searchProducts } from "@/services/product";
import { Category, Product } from "@/utils/types";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/header/Pagination";
import ButtonCreateCategory from "@/components/header/ButtonCreateCategory";
import { allCategory } from "@/services/category";
import ItemCategoryList from "@/components/list/ItemCategoryList";
import BurgerCreate from "@/components/header/BurgerCreate";
import { Context2 } from "@/context/context2";

const page = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isReloadNeeded, setIsReloadNeeded] = useState(1);
  const [page, setPage] = useState(0);
  const [categoryPage, setCategoryPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [text1, setText1] = useState("");

  useEffect(() => {
    const getProductList = async () => {
      const response = await allProducts(page);
      setProductList(response.data);
    };
    console.log(page);
    if (!selectedCategory) {
      getProductList();
    }
  }, [isReloadNeeded, page, selectedCategory]);

  useEffect(() => {
    const productSearch = async () => {
      const response = await searchProducts(text1);
      setProductList(response.data);
    };
    if (text1) {
      productSearch();
    }
  }, [text1]);

  useEffect(() => {
    const getCategoryList = async () => {
      const response = await allCategory();
      setCategoryList(response.data);
    };
    getCategoryList();
  }, [isReloadNeeded]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCategoryPage(0);
  };

  return (
    <div>
      <Header>
        <div className="md:hidden">
          <BurgerCreate setIsReloadNeeded={setIsReloadNeeded} />
        </div>
        <div className="hidden sm:flex">
          <ButtonCreateProduct setIsReloadNeeded={setIsReloadNeeded} />
          <ButtonCreateCategory setIsReloadNeeded={setIsReloadNeeded} />
        </div>
      </Header>

      <Context2.Provider value={{ isReloadNeeded, setIsReloadNeeded }}>
        <ItemCategoryList
          categoryList={categoryList}
          setProductList={setProductList}
          categoryPage={categoryPage}
          handleCategorySelect={handleCategorySelect}
        />
        <div className="ml-20 w-1/6 mt-20 items-center border-b-2 border-gray-800 py-2">
          <input
            onChange={(e: any) => {
              setText1(e.target.value);
            }}
            value={text1}
            className="appearance-none bg-transparent border-none  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search product"
          />
        </div>
        <ItemCardList productList={productList} />
      </Context2.Provider>
      <Pagination
        page={selectedCategory ? categoryPage : page}
        setPage={selectedCategory ? setCategoryPage : setPage}
      />
    </div>
  );
};

export default page;
