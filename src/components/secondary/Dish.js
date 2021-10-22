import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="flex flex-col mx-4 my-8 border-2 border-gray-200 p-2">
      <div className="flex justify-between">
        <h1>{name}</h1>
        <span>{cooking}</span>
      </div>
      <div className="flex mt-4 mb-2 flex-wrap ">
        {main.name && (
          <div className="dish-ingredient-container">
            <div className="flex justify-center">
              <span className="dish-ingredient-title">{t("main")}</span>
            </div>
            <span className="dish-ingredient-data">{main.name}</span>
          </div>
        )}
        {side.name && (
          <div className="dish-ingredient-container">
            <div className="flex justify-center">
              <span className="dish-ingredient-title">{t("side")}</span>
            </div>
            <span className="dish-ingredient-data">{side.name}</span>
          </div>
        )}
        {sauce.main && (
          <div className="dish-ingredient-container">
            <div className="flex justify-center">
              <span className="dish-ingredient-title">{t("sauce")}</span>
            </div>
            <div className="w-full border-r-2 border-gray-300 px-4 mb-2 box-content">
              <div className="flex justify-center">
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
                {sauce.side1 && (
                  <div className="flex items-center">
                    <span>{sauce.side1}</span>
                    <FontAwesomeIcon
                      size="xs"
                      className="mx-2"
                      icon={["fas", "circle"]}
                    />
                  </div>
                )}
                {sauce.side2 && (
                  <div className="flex items-center">
                    <span>{sauce.side2}</span>
                    <FontAwesomeIcon
                      size="xs"
                      className="mx-2"
                      icon={["fas", "circle"]}
                    />
                  </div>
                )}
                {sauce.ratio && <span>{sauce.ratio}</span>}
              </div>
            </div>
          </div>
        )}

        {herbsAndSpices.length > 0 && (
          <div className="dish-ingredient-container">
            <div className="flex justify-center">
              <span className="dish-ingredient-title">
                {t("herbsAndSpices")}
              </span>
            </div>
            <div className="w-full border-r-2 border-gray-300 px-4 mb-2 box-content">
              <div className="flex justify-center">
                {herbsAndSpices.map((elem, index) => {
                  if (!elem) return undefined;
                  if (index === herbsAndSpices.length - 1) {
                    return <span key={index}>{elem.name}</span>;
                  }
                  return (
                    <div key={index} className="flex items-center">
                      <span>{elem.name}</span>
                      <FontAwesomeIcon
                        size="xs"
                        className="mx-2"
                        icon={["fas", "circle"]}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {salt && (
          <div className="dish-ingredient-container">
            <div className="flex justify-center">
              <span className="dish-ingredient-title">{t("salt")}</span>
            </div>
            <div className="dish-ingredient-data">{salt}</div>
          </div>
        )}
        {pepper && (
          <div className="dish-ingredient-container">
            <div className="flex justify-center">
              <span className="dish-ingredient-title">{t("pepper")}</span>
            </div>
            <div className="dish-last-ingredient-data">{pepper}</div>
          </div>
        )}
      </div>
    </div>
  );
}
