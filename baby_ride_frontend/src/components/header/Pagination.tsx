import React from "react";

const Pagination = ({
  page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex justify-between m-10">
        <button
          className="m-2 w-40 bg-yellow-100 px-4 h-10 text-base font-medium text-black border rounded-lg hover:bg-yellow-200"
          onClick={() => {
            setPage((prev) => (prev > 0 ? prev - 1 : prev));
          }}
        >
          Previous
        </button>
        <button
          className="m-2 w-40 bg-yellow-100 px-4 h-10 text-base font-medium text-black border rounded-lg hover:bg-yellow-200"
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
