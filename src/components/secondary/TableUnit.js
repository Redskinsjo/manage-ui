import React, { useContext } from "react";
import { GlobalState, GlobalDispatch } from "../../redux/GlobalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@apollo/client";
import { DELETE_TABLE } from "../../apollo/queries";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { IoRestaurant } from "react-icons/io5";
import { spring, Motion, StaggeredMotion } from "react-motion";

function TableUnit({ id, numero, seats, indoor, outdoor }) {
  const { ui } = useContext(GlobalState);
  const { tableDetails, tableMenu } = ui;
  const { displayTableDetails, displayTableMenu } = useContext(GlobalDispatch);
  const { t } = useTranslation();
  const [deleteTable, { data }] = useMutation(DELETE_TABLE, {
    onCompleted: () => {
      displayTableMenu(false);
      message.success(t("tableDeleted"));
    },
  });

  let selectedTable;
  if (tableMenu === numero) {
    selectedTable = { id, numero, seats, indoor, outdoor };
  }

  return (
    <div
      className={`w-full flex ${
        tableMenu === numero ? `justify-start animate-pulse` : "justify-center"
      } items-center ring-1 ring-gray-300`}
    >
      <div
        className={`bg-white rounded-xl flex items-center w-5/6 min-h-16 mx-4 my-8 hover:bg-yellow-300 cursor-pointer border-2 border-black ${
          tableDetails === numero && "bg-yellow-200"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          displayTableDetails(tableDetails === numero ? false : numero);
        }}
      >
        <div className="w-full h-full flex justify-between px-4 items-center">
          <div className="flex items-center">
            <IoRestaurant fontSize="18px" />
            <h2 className="my-0 mx-2">{numero}</h2>
          </div>
          <span className=" whitespace-nowrap">{`${seats} ${
            seats === 1 ? t("guest") : t("guests")
          }`}</span>
          <span className="text-red-500 ">
            {indoor ? t("indoor") : outdoor ? t("outdoor") : ""}
          </span>
        </div>
      </div>
      <div className={`relative ${tableMenu === numero && "w-1/6"}`}>
        <div className="flex flex-grow">
          <FontAwesomeIcon
            icon={["fas", "ellipsis-h"]}
            className="text-4xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              displayTableMenu(numero);
            }}
          ></FontAwesomeIcon>
          {tableMenu === numero && (
            <div
              className="absolute top-8 -left-4 bg-white z-10 border-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="hover:bg-yellow-200 px-2 cursor-not-allowed">
                  <div className="flex items-center justify-between my-1">
                    <FontAwesomeIcon icon={["fab", "btc"]}></FontAwesomeIcon>
                    <span>{t("billTable")}</span>
                  </div>
                </div>
                <div
                  className="hover:bg-yellow-200 px-2 cursor-pointer"
                  onClick={() => {
                    deleteTable({
                      variables: { id: selectedTable.id },
                      refetchQueries: ["fetchTables"],
                    });
                  }}
                >
                  <div className="flex items-center justify-between my-1">
                    <FontAwesomeIcon
                      icon={["fas", "trash-alt"]}
                      style={{ marginRight: "1rem" }}
                    ></FontAwesomeIcon>
                    <span>{t("deleteTable")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableUnit;
