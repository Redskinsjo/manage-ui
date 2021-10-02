import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dish({
  name,
  main,
  side,
  salt,
  pepper,
  herbsAndSpices,
  sauce,
  cooking,
}) {
  // pas de props ici, seulement passé un id du dish et fetch la data
  // mais on utilise ici les props pour simplifier
  return (
    <div className="flex flex-col mx-4 my-8 border-2 border-gray-200 p-2">
      <div className="flex justify-between">
        <h1>{name}</h1>
        <span>{cooking}</span>
      </div>
      <div className="flex mt-4 mb-2 flex-wrap">
        <span className="border-r-2 border-gray-300 px-4 mb-2">{main}</span>
        <span className="border-r-2 border-gray-300 px-4 mb-2">{side}</span>
        <div className="flex border-r-2 border-gray-300 px-4 mb-2">
          {sauce.main && (
            <div className="flex items-center">
              <span>{sauce.main}</span>
              <FontAwesomeIcon
                size="xs"
                className="mx-2"
                icon={["fas", "circle"]}
              />
            </div>
          )}
          {sauce.side && (
            <div className="flex items-center">
              <span>{sauce.side}</span>
              <FontAwesomeIcon
                size="xs"
                className="mx-2"
                icon={["fas", "circle"]}
              />
            </div>
          )}
          {sauce.ratio && <span>{sauce.ratio}</span>}
        </div>
        <div className="flex border-r-2 border-gray-300 px-4 mb-2">
          {herbsAndSpices.map((elem, index) => {
            if (!elem) return undefined;
            if (index === herbsAndSpices.length - 1) {
              return <span key={index}>{elem}</span>;
            }
            return (
              <div key={index} className="flex items-center">
                <span>{elem}</span>
                <FontAwesomeIcon
                  size="xs"
                  className="mx-2"
                  icon={["fas", "circle"]}
                />
              </div>
            );
          })}
        </div>
        {salt && (
          <div className="border-r-2 border-gray-300 px-4 mb-2">
            Salt: {salt}
          </div>
        )}
        {pepper && <div className="px-4 mb-2">Pepper: {pepper}</div>}
      </div>
    </div>
  );
}
// "orders": [
//     {
//       "id": 2,
//       "name": "saumon",
//       "main": "saumon",
//       "side": "haricots",
//       "salt": "S",
//       "pepper": null,
//       "herbs&spices": ["aneth"],
//       "sauce": { "main": "milk", "side": "butter", "ratio": "1/2" },
//       "cooking": "rosé"
//     },
//     { "id": 3, "name": "oeufs pochés" }
//   ]
