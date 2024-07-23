import { allCategory } from "@/services/category";
import { createProduct } from "@/services/product";
import { Category } from "@/utils/types";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Box, Modal } from "@mui/material";
import { insertImage } from "@/services/image";

const ButtonCreateProduct = ({
  setIsReloadNeeded,
}: {
  setIsReloadNeeded: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [picsProduct, setPicsProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const refFile = useRef<HTMLInputElement>(null);

  async function HandleCreateProduct() {
    await insertImage(refFile).then(async (res) => {
      console.log(res);
      toast.success("Image inserted");
      setPicsProduct(res.data);
      console.log("retour api photo", res.data);
      createProduct(name, res.data, description, price, stock, categoryId)
        .then((response) => {
          console.log(response);
          toast.success("Successfully product created");
          setIsReloadNeeded(new Date().getTime());
          handleClose();
        })
        .catch((e) => {
          toast.error("This didn't work."), console.log(e);
        });
    });
  }

  useEffect(() => {
    const getCategoryList = async () => {
      const response = await allCategory();

      setCategoryList(response.data);
    };
    getCategoryList();
  }, []);

  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("role") == "admin") {
      return (
        <div className="flex justify-center  ">
          <button
            onClick={handleOpen}
            className="   text-black w-40 p-2 text-sm z-100"
          >
            Create product
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 className="text-4xl text-center mb-10">Create product</h2>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="text-black rounded-md  indent-3 mb-10 border-2 border-gray-400 w-full"
                placeholder="Name"
                required
              />
              <input
                ref={refFile}
                type="file"
                className="text-black bg-white rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
                placeholder="PicsName"
                required
              />

              <input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
                placeholder="Description"
                required
              />

              <input
                type="number"
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
                className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
                placeholder="Price"
                required
              />
              <input
                type="number"
                onChange={(e) => {
                  setStock(Number(e.target.value));
                }}
                className="text-black rounded-md mb-10 indent-3 border-2 border-gray-400 w-full"
                placeholder="stock"
                required
              />
              <select
                name="category"
                id="category-select"
                className="text-neutral-400 bg-white rounded-md mb-10 indent-3 border-2 border-gray-400 w-full"
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option></option>
                {categoryList &&
                  categoryList.map((element) => {
                    return (
                      <option key={element.id} value={element.id}>
                        {element.type}
                      </option>
                    );
                  })}
              </select>

              <div className="flex justify-center items-center">
                <button
                  onClick={handleClose}
                  className="bg-yellow-100 hover:bg-yellow-200 h-15 text-black rounded-md text-center  p-2 m-4 "
                >
                  Annuler
                </button>
                <button
                  className="bg-yellow-100 hover:bg-yellow-200 h-15 text-black rounded-md text-center  p-2 m-4 "
                  onClick={() => {
                    HandleCreateProduct();
                  }}
                >
                  Creat new product
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      );
    }
  }
};

export default ButtonCreateProduct;
