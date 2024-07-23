import {
  allCategory,
  createCategory,
  updateCategory,
} from "@/services/category";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Box, Modal } from "@mui/material";
import { insertImage } from "@/services/image";
import { RxUpdate } from "react-icons/rx";
const ButtonUpdateCategory = ({
  setIsReloadNeeded,
  id,
}: {
  setIsReloadNeeded: React.Dispatch<React.SetStateAction<number>>;
  id: string;
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
  const [type, settype] = useState("");
  const [picsCategory, setPicsCategory] = useState("");
  const refFile = useRef<HTMLInputElement>(null);
  console.log(refFile?.current?.value);

  async function HandleUpdateCategory() {
    const updateData: { [key: string]: any } = {};
    if (type) updateData.type = type;
    if (refFile?.current?.value) {
      await insertImage(refFile).then(async (res) => {
        console.log(res);
        toast.success("Image inserted");
        setPicsCategory(res.data);
        console.log("retour api photo", res.data);
        updateCategory(id, updateData)
          .then((response) => {
            console.log(response);
            toast.success("Successfully product update");
            setIsReloadNeeded(new Date().getTime());
            handleClose();
          })
          .catch((e) => {
            toast.error("This didn't work."), console.log(e);
          });
      });
    } else {
      await updateCategory(id, updateData)
        .then((response) => {
          console.log(response);
          toast.success("Successfully product update");
          setIsReloadNeeded(new Date().getTime());
          handleClose();
        })
        .catch((e) => {
          toast.error("This didn't work."), console.log(e);
        });
    }
  }

  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("role") == "admin") {
      return (
        <div className="flex justify-center   ">
          <button
            onClick={handleOpen}
            className="   text-black w-auto p-2 text-sm "
          >
            <RxUpdate />
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 className="text-4xl text-center mb-10">Update category</h2>
              <input
                type="text"
                onChange={(e) => {
                  settype(e.target.value);
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

              <div className="flex justify-center items-center">
                <button
                  onClick={handleClose}
                  className="bg-yellow-100 h-15 text-black rounded-md text-center  p-2 m-4 "
                >
                  Annuler
                </button>
                <button
                  className="bg-yellow-100 h-15 text-black rounded-md text-center  p-2 m-4 "
                  onClick={() => {
                    HandleUpdateCategory();
                  }}
                >
                  Update category
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      );
    }
  }
};

export default ButtonUpdateCategory;
