import React from "react";

const Tabs = ({items,selected, setSelected, clickable}) => {

  const handleOnClick = (index) => {
    if(clickable)
      setSelected(index); // remove the curly braces
  };

  const activeStyle = "text-white";
  const unactiveStyle = "text-gray-400";

  return (
    <nav className="flex flex-col sm:flex-row gap-6 bg-black shadow-roseta p-6 rounded mt-10 ">
      {items.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => handleOnClick(index)}
            className={selected === index ? activeStyle : unactiveStyle}
          >
            {item}
          </button>
        );
      })}
    </nav>
  );
};

export default Tabs;