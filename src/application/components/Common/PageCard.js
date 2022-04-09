import React from "react";

const PageCard = ({children}) => {

  return (
    <div className="col-span-12 bg-white rounded-2xl lg:p-4 lg:mx-2 lg:mb-4">
      <div className="lg:flex lg:justify-between items-center m-4 lg:pt-0 pt-7">
        <div className="flex items-center lg:mt-0 mt-5">
          <div className="my-2 lg:ml-2 -ml-2">
          </div>
        </div>
      </div>

      <div className="lg:mt-0 mt-5">{children}</div>
      
    </div>
  );
};

export default PageCard;
