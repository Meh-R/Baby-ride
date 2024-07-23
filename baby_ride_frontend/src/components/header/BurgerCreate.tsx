import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Button } from "../ui/button";
import { FaRegUserCircle } from "react-icons/fa";
import ButtonCreateCategory from "./ButtonCreateCategory";
import { RiShoppingCart2Line } from "react-icons/ri";
import ButtonCreateProduct from "./ButtonCreateProduct";
import { RxHamburgerMenu } from "react-icons/rx";

const BurgerCreate = ({
  setIsReloadNeeded,
}: {
  setIsReloadNeeded: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-row items-center z-100 ">
      <div className="m-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <RxHamburgerMenu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto">
            <div className="bg-pink-100 z-100 ">
              <ButtonCreateCategory setIsReloadNeeded={setIsReloadNeeded} />
              <ButtonCreateProduct setIsReloadNeeded={setIsReloadNeeded} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BurgerCreate;
