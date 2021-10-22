import React, { useEffect, useContext, useState } from "react";
// import data from "../../data.json";
import Dish from "../secondary/Dish";
import AddElement from "../sharedComponents/AddElement";
import { useTranslation } from "react-i18next";
import { GlobalState } from "../../redux/GlobalProvider";
import { useQuery } from "@apollo/client";
import { FETCH_ORDERS_BY_TABLE } from "../../apollo/queries";

export default function TableDetails({ numero }) {
  const { data } = useContext(GlobalState);
  const { tables } = data;
  const { data: result } = useQuery(FETCH_ORDERS_BY_TABLE, {
    variables: { tableId: numero },
  });
  const { t } = useTranslation();
  const [table, setTable] = useState();

  useEffect(() => {
    if (tables) setTable(tables.find((table) => table.numero === numero));
  }, [numero, tables]);

  return (
    <>
      {table?.numero && (
        <div className="flex flex-col px-4 py-2 h-full bg-white">
          <div className="flex w-full justify-between">
            <div className="flex flex-1 text-red-500">
              {table.indoor ? t("indoor") : table.outdoor ? t("outdoor") : ""}
            </div>
            <div className="flex flex-1 justify-center">
              {t("tableNumber")} {table.numero}
            </div>
            <div className="flex flex-1 justify-end">
              {t("Capacity")}: {table.seats} {t("guests")}
            </div>
          </div>
          <div className="flex justify-center items-center">
            {table.guests.count + " "}
            {table.guests.count > 1 ? t("guests") : t("guest")}
          </div>
          <div className="flex-grow overflow-y-scroll overflow-hidden">
            {result &&
              result.ordersByTable.map((ord) => {
                return (
                  <Dish
                    key={ord._id}
                    name={ord.name}
                    main={ord.main}
                    side={ord.side}
                    salt={ord.salt}
                    pepper={ord.pepper}
                    herbsAndSpices={ord.herbsAndSpices}
                    sauce={ord.sauce}
                    cooking={ord.cooking}
                  ></Dish>
                );
              })}
          </div>
          <AddElement unit={"dish"} />
        </div>
      )}
    </>
  );
}
