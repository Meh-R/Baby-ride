import React from "react";

export const Main = () => {
  return (
    <div className="h-screen bg-white bg-ImgMain bg-center bg-auto bg-no-repeat mb:bg-ImgMain md:bg-contain ">
      <section className="">
        <div className=" text-white ">
          <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
            <div className="mt-20 md:ml-20 flex flex-col w-full justify-center items-start p-8 md:w-1/3">
              <h1 className="text-4xl font-bold  p-2 text-black tracking-loose md:text-7xl">
                Baby ride
              </h1>
              <h2 className=" mt-10 text-2xl md:text-4xl leading-relaxed  text-black md:leading-snug mb-2">
                Nursery store for transporting your baby
              </h2>

              <a
                href="./register"
                className="bg-yellow-100 mt-10 hover:bg-yellow-200 text-black rounded shadow hover:shadow-lg py-2 px-4 "
              >
                SignUp/Signin
              </a>
            </div>
            <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
