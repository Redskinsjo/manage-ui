import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../redux/GlobalProvider";
import axios from "axios";
import { CREATE_TABLE } from "../../apollo/queries";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import SelectElement from "../sharedComponents/SelectElement";

export default function NewTable() {
  const [tableNumber, setTableNumber] = useState("");
  const [location, setLocation] = useState("");
  const [guest1, setGuest1] = useState("");
  const [guest2, setGuest2] = useState("");
  const [guest3, setGuest3] = useState("");
  const [guest4, setGuest4] = useState("");
  const [guest5, setGuest5] = useState("");
  const [guest6, setGuest6] = useState("");
  const guests = [guest1, guest2, guest3, guest4, guest5, guest6];

  const {
    data: { tables },
  } = useContext(GlobalState);
  const [tablesAvailable, setTablesAvailable] = useState();
  const [loading, setLoading] = useState(true);
  let selectedTable;
  let guestsOnTable = guests.filter((guest) => guest.length > 0);

  const [createTable, { data }] = useMutation(CREATE_TABLE);
  const { t } = useTranslation();

  let profiles = [guest1, guest2, guest3, guest4, guest5, guest6];
  for (let i = 0; i < profiles.length; i++) {}
  profiles = profiles.map((guest) => {
    if (guest.length === 0) {
      return;
    } else {
      return guest;
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tableNumber === "Choisir") {
      throw new Error("You didn't choose a table number. Try to handle this.");
    }
    createTable({
      variables: {
        data: {
          numero: Number(tableNumber),
          seats: selectedTable.seats,
          indoor: selectedTable.indoor,
          outdoor: selectedTable.outdoor,
          active: true,
          guests: { count: guestsOnTable.length, profiles: guestsOnTable },
          orders: [],
        },
      },
      refetchQueries: ["fetchTables"],
      onCompleted: setTableNumber("Choisir"),
    });
  };

  const fetchTablesAvailable = async () => {
    const prodUri = "https://manage-rest-api.herokuapp.com";
    try {
      const response = await axios.get(
        process.env.NODE_ENV === "development"
          ? "http://localhost:3010/tables/read"
          : prodUri + "/tables/read"
      );
      if (response.status === 200) {
        const { data } = response;
        const numeros = tables.map((table) => table.numero);
        const tablesAvailable = data.filter((table) => {
          if (numeros.indexOf(table.numero) === -1) {
            return table;
          } else {
            return;
          }
        });
        setTablesAvailable(tablesAvailable);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchTablesAvailable();
  }, [tables]);

  if (tableNumber) {
    selectedTable = tablesAvailable.find(
      (table) => table.numero === Number(tableNumber)
    );
  }

  let seats = [];
  if (selectedTable) {
    for (let i = 0; i < selectedTable.seats; i++) {
      seats.push("");
    }
  }
  return (
    <div className="flex flex-col border-2 border-gray-200 px-4 py-2">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between item-center">
          <label htmlFor="tableNumber" className="flex items-center">
            {t("tableNumber")}:
          </label>
          <SelectElement
            id="tableNumber"
            elem="table"
            initValue={t("choose")}
            options={!loading && [t("choose"), ...tablesAvailable]}
            onChangeSelect={(opt) => {
              setTableNumber(opt.numero);
            }}
            classnames={"w-36 h-10"}
          />
        </div>

        {tableNumber && tableNumber !== t("choose") && (
          <div className="flex justify-between item-center">
            <label htmlFor="location" className="flex items-center">
              {t("in_out")}
            </label>
            <div className="aligned-details-table">
              <div>
                {selectedTable.indoor
                  ? t("indoor")
                  : selectedTable.outdoor
                  ? t("outdoor")
                  : null}
              </div>
            </div>
          </div>
        )}
        {tableNumber && tableNumber !== t("choose") && (
          <div className="flex justify-between item-center">
            <label htmlFor="capactiy" className="flex items-center">
              {t("Capacity")}
            </label>
            <div className="aligned-details-table">
              <div>{selectedTable && selectedTable.seats}</div>
            </div>
          </div>
        )}

        {selectedTable &&
          seats.map((guest, index) => {
            return (
              <div key={index} className="flex justify-between item-center">
                <label
                  htmlFor={`guest${index + 1}`}
                  className="flex items-center"
                >
                  {t("guest")} n°{index + 1}
                </label>
                <input
                  id={`guest${index + 1}`}
                  type="text"
                  className="w-36 h-10"
                  placeholder="search"
                  value={eval(`guest${index + 1}`)}
                  onChange={(e) => {
                    if (e.target.value !== "<" || e.target.value !== ">") {
                      const setGuest = eval(`setGuest${index + 1}`);
                      setGuest(e.target.value);
                    } else console.log(e.target.value);
                    // notif erreur
                  }}
                />
              </div>
            );
          })}

        <div className="flex justify-between">
          <div></div>
          <input
            className="px-4 py-2 mt-4 cursor-pointer hover:bg-yellow-300"
            type="submit"
            value={t("addAction")}
          />
        </div>
      </form>
    </div>
  );
}
