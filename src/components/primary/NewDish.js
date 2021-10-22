import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SelectElement from "../sharedComponents/SelectElement";
import "antd/dist/antd.css";
import { TreeSelect } from "antd";
import { useTranslation } from "react-i18next";
import { CREATE_DISH } from "../../apollo/queries";
import { useMutation } from "@apollo/client";
import { GlobalState } from "../../redux/GlobalProvider";
// const { SHOW_PARENT, SHOW_ALL } = TreeSelect;

export default function NewDish() {
  const [orders, setOrders] = useState();
  const [mains, setMains] = useState();
  const [sides, setSides] = useState();
  const [herbsAndSpices, setHerbsAndSpices] = useState();
  const [sauces, setSauces] = useState();

  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState();
  const [main, setMain] = useState();
  const [side, setSide] = useState();
  const [herbs, setHerbs] = useState();
  const [isOrderSelected, setIsOrderSelected] = useState(false);
  const [sauce, setSauce] = useState();
  const [salt, setSalt] = useState();
  const [pepper, setPepper] = useState();
  const [cooking, setCooking] = useState();
  const [herbsName, setHerbsName] = useState([]);
  const [reset, setReset] = useState(0);
  const [createOrder] = useMutation(CREATE_DISH, {
    onCompleted: (data) => {
      setSelectedOrder({ name: t("choose") });
      setReset(reset + 1);
    },
  });
  const { ui } = useContext(GlobalState);
  const { tableDetails } = ui;

  const { t } = useTranslation();

  const prodUri = "https://manage-rest-api.herokuapp.com";
  const api =
    process.env.NODE_ENV === "development" ? "http://localhost:3010" : prodUri;

  const promises = [
    axios.get(api + "/orders/read"),
    axios.get(api + "/mains/read"),
    axios.get(api + "/sides/read"),
    axios.get(api + "/herbsandspices/read"),
    axios.get(api + "/sauces/read"),
  ];

  const fetchAllData = () => {
    return Promise.all(promises)
      .then(
        ([
          { data: orders },
          { data: mains },
          { data: sides },
          { data: herbsAndSpices },
          { data: sauces },
        ]) => {
          setOrders(orders);
          setMains(mains);
          setSides(sides);
          setHerbsAndSpices(herbsAndSpices);
          setSauces(sauces);
          setLoading(false);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  const selectOrder = (opt) => {
    if (opt) {
      setSelectedOrder(opt);
      setMain(opt.main);
      setSide(opt.side);
      setHerbs(opt.herbsAndSpices);
      setSauce(opt.sauce);
      setSalt(opt.salt || t("none"));
      setPepper(opt.pepper || t("none"));
      setCooking(opt.cooking || t("none"));
      setIsOrderSelected(true);
    } else {
      setSelectedOrder({ name: t("choose") });
      setMain(undefined);
      setSide(undefined);
      setHerbs(undefined);
      setSauce(undefined);
      setSalt(undefined);
      setPepper(undefined);
      setCooking(undefined);
    }
  };

  useEffect(() => {
    if (isOrderSelected && selectedOrder?.name !== t("choose")) {
      setHerbsName(herbs.map((h) => h.name));
    }
  }, [selectedOrder?.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const herbsIds = herbsName.map((herb) => {
      const result = herbsAndSpices.find((h) => h.name === herb);
      if (result) return result._id;
    });
    createOrder({
      variables: {
        data: {
          table: tableDetails,
          name: selectedOrder.name,
          main: main._id,
          side: side._id,
          salt,
          pepper,
          herbsAndSpices: herbsIds,
          sauce: sauce._id,
          cooking,
        },
      },
      refetchQueries: ["fetchOrdersByTable"],
    });
  };

  return (
    <div className="border-2 border-gray-200 px-4 py-2">
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between item-center w-full">
          <div className="flex items-start">
            <label htmlFor="tableNumber" className="h-8 flex items-center">
              {t("dish")}:
            </label>
          </div>
          <SelectElement
            initValue={t("choose")}
            options={!loading && [t("choose"), ...orders]}
            complex={true}
            onChangeSelect={(opt) => {
              selectOrder(opt);
            }}
            elem="dish"
            reset={reset}
          />
        </div>
        {selectedOrder && selectedOrder.name !== t("choose") && (
          <div className="w-full">
            <div className="aligned-details-dish">
              <span>{t("main")}</span>
              <SelectElement
                elem="dish"
                id="main"
                initValue={main || t("none")}
                options={!loading && mains}
                complex={true}
                onChangeSelect={(opt) => {
                  setMain(opt);
                }}
              />
            </div>
            <div className="aligned-details-dish">
              <span>{t("side")}</span>
              <SelectElement
                elem="dish"
                id="side"
                initValue={side || t("none")}
                options={!loading && sides}
                complex={true}
                onChangeSelect={(opt) => {
                  setSide(opt);
                }}
              />
            </div>
            <div className="flex justify-between items-center mb-1 min-h-8">
              <span className="flex-auto">{t("herbsAndSpices")}</span>
              <TreeSelect
                value={herbsName}
                treeData={
                  !loading &&
                  herbsAndSpices.map((herb) => ({
                    title: herb.name,
                    value: herb.name,
                  }))
                }
                style={{ flex: 1 }}
                treeCheckable={true}
                // onSelect={(value, node, extra) => {
                //   console.log(value, node, extra);
                // }}
                onChange={(value, node, extra) => {
                  console.log(value, node, extra);
                  setHerbsName(value);
                }}
              />
            </div>
            <div className="aligned-details-dish">
              <span>{t("sauce")}</span>
              <SelectElement
                elem="dish"
                id="sauce"
                initValue={sauce || t("none")}
                options={!loading && sauces}
                complex={true}
                onChangeSelect={(opt) => {
                  setSauce(opt);
                }}
              />
            </div>
            <div className="aligned-details-dish">
              <span>{t("salt")}</span>
              <SelectElement
                elem="dish"
                id="salt"
                initValue={salt || t("none")}
                options={[t("none"), "S", "L"]}
                onChangeSelect={(opt) => {
                  setSalt(opt);
                }}
              />
            </div>
            <div className="aligned-details-dish">
              <span>{t("pepper")}</span>
              <SelectElement
                elem="dish"
                id="pepper"
                initValue={pepper || t("none")}
                options={[t("none"), "S", "L"]}
                onChangeSelect={(opt) => {
                  setPepper(opt);
                }}
              />
            </div>
            <div className="aligned-details-dish">
              <span>{t("cooking")}</span>
              <SelectElement
                elem="dish"
                id="cooking"
                initValue={cooking || t("none")}
                options={[t("rare"), t("medium_rare"), t("well_done")]}
                onChangeSelect={(opt) => {
                  setCooking(opt);
                }}
              />
            </div>
          </div>
        )}
        <div className="flex justify-end w-full">
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
