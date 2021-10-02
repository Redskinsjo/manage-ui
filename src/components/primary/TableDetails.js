import React, { useState, useEffect, useContext } from "react";
import data from "../../data.json";
import Dish from "../secondary/Dish";
import AddElement from "../sharedComponents/AddElement";
import { useTranslation } from "react-i18next";
import { GlobalState } from "../../redux/GlobalProvider";

export default function TableDetails({ numero }) {
  const [tableData, setTableData] = useState();
  const { t } = useTranslation();
  const {
    data: { tables },
  } = useContext(GlobalState);

  const getTableData = async () => {
    const table = data.find((table) => table.numero === numero);
    // const table = await
    // const table = tables.find((table) => table.numero === numero);
    setTableData(table);
  };
  useEffect(() => {
    getTableData();
  }, [numero]);

  return (
    <div className="flex flex-col px-4 py-2 h-full">
      <div className="flex w-full justify-between">
        <div className="flex flex-1 text-red-500">
          {tableData && tableData.indoor
            ? t("indoor")
            : tableData?.outdoor
            ? t("outdoor")
            : ""}
        </div>
        <div className="flex flex-1 justify-center">
          {t("tableNumber")} {numero}
        </div>
        <div className="flex flex-1 justify-end">
          {t("Capacity")}: {tableData && tableData.seats} {t("guests")}
        </div>
      </div>
      <div className="flex justify-center items-center">
        {tableData && tableData.guests?.count + " "}
        {(tableData && !tableData.guests.count) ||
        (tableData && tableData.guests.count === 1)
          ? t("guest")
          : t("guests")}
      </div>
      <div className="flex-grow">
        {tableData &&
          tableData.orders.map((item) => (
            <Dish
              key={item.id}
              name={item.name}
              main={item.main}
              side={item.side}
              salt={item.salt}
              pepper={item.pepper}
              herbsAndSpices={item.herbsAndSpices}
              sauce={item.sauce}
              cooking={item.cooking}
            ></Dish>
          ))}
      </div>
      <AddElement unit={"dish"} />
      {/* <div className="border-2 border-gray-500 h-8 my-4 hover:bg-gray-300 hover:border-black cursor-pointer flex justify-center items-center">
        <FontAwesomeIcon icon={["fas", "plus"]}></FontAwesomeIcon>
      </div> */}
    </div>
  );
}
