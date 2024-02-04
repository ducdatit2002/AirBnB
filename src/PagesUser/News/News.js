import React, { useState, memo } from "react";
import { BackIcon, NextIcon } from "../../Utilities/IconSVG";
import { Link } from "react-router-dom";
import { data_vnBooking } from "../../Assets/dataNews";
function News() {
  const [item, setItem] = useState(0);
  let newData = data_vnBooking.slice(item, item + 2);
  let handleNext = () => {
    let newNumber = item + 2;
    setItem(newNumber);
  };
  let handleBack = () => {
    let newNumber = item - 2;
    setItem(newNumber);
  };
  let renderContent = () =>
    newData.map((item, i) => (
      <div
        style={{height:220}}
        className="flex"
        key={i}
      >
        <img className="w-1/3 h-48 rounded-xl" src={item.image} alt="newsImage" />
        <section className="p-3">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {" "}
            <h3 className="text-lg hover:text-red-500 duration-300">
              {item.title}
            </h3>
          </a>
          <p>{item.detail}</p>
        </section>
      </div>
    ));

  return (
    <>
      {" "}
      <div className="grid lg:grid-cols-2 gap-10">{renderContent()}</div>
      <section className="text-right">
        {item < 2 ? (
          <button className="bg-white  opacity-50 cursor-not-allowed  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            <BackIcon />
          </button>
        ) : (
          <button
            onClick={handleBack}
            className="bg-white hover:bg-gray-100  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            <BackIcon />
          </button>
        )}
        {item + 2 >= data_vnBooking.length ? (
          <button className="bg-white opacity-50 cursor-not-allowed ml-1 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            <NextIcon />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-white  hover:bg-gray-100 ml-1 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            <NextIcon />
          </button>
        )}
      </section>
      <br />
    </>
  );
}
export default memo(News);
