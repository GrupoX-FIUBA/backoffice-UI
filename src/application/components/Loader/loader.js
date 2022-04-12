import React from "react";
import logo from '../../../assets/logo.png'

const Loader = () => {
  return (
    <div className="bg-black">
    <div className="flex items-center justify-center">
      <div className="flex  items-center  space-x-2 animate-pulse h-96">
        <div className="px-2 text-white">Loading  </div>  
      <img src={logo} className="inline-block my-4 md:my-0 h-10" alt=""/>
      </div>
      </div>
    </div>
  );
};

export default Loader;