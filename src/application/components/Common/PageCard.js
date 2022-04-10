import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PageCard = ({children, information}) => {

  return (
    <div className="col-span-12 bg-gray-500 rounded-2xl lg:p-4 lg:mx-2 lg:mb-4">
      <div className="items-center m-4 lg:pt-0 pt-1">
        <div className="flex items-center lg:mt-0 mt-5">
          <div className="my-2 lg:ml-2">
            <FontAwesomeIcon icon={information.pageIcon}/> {information.pageName}
          </div>
        </div>
      </div>

      <div className="lg:mt-0 mt-5 sm:mx-0 mx-3 pb-5">
        {children}
      </div>
      
    </div>
  );
};

export default PageCard;
