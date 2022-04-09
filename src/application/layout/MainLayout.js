import React from "react";

const MainLayout = ({ children }) => {

  return (
		<React.Fragment>
            <div className={`inline-block float-right transition-all ease-in-out duration-100 w-full text-white overflow-y-auto h-screen no-scrollbar`}>            
				{children}
            </div>
		</React.Fragment>
	)
      
};

export default MainLayout;