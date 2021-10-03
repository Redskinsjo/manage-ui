import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectElement from "../sharedComponents/SelectElement";
import "antd/dist/antd.css";
import { TreeSelect } from "antd";
import { useTranslation } from "react-i18next";
const { SHOW_PARENT, SHOW_ALL } = TreeSelect;

export default function NewDish() {
  const [orders, setOrders] = useState();
  const [mains, setMains] = useState();
  const [sides, setSides] = useState();
  const [herbsAndSpices, setHerbsAndSpices] = useState();
  const [sauces, setSauces] = useState();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [main, setMain] = useState();
  const [side, setSide] = useState();
  const [herbs, setHerbs] = useState();
  const [sauce, setSauce] = useState();
  const [salt, setSalt] = useState();
  const [pepper, setPepper] = useState();
  const [cooking, setCooking] = useState();

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
  useEffect(() => {
    Promise.all(promises)
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
  }, []);

  const selectOrder = () => {
    const order = orders.find((order) => order._id === name);
    if (order) {
      setSelectedOrder(order);
      setMain(order.main);
      setSide(order.side);
      // const herbs = order.herbsAndSpices.map(
      //   (herb) => herb.name + "|" + herb.origin
      // );
      setHerbs(order.herbsAndSpices);
      setSauce(order.sauce);
      setSalt(order.salt || t("none"));
      setPepper(order.pepper || t("none"));
      setCooking(order.cooking);
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
    if (orders) {
      selectOrder();
    }
  }, [name]);

  const [value, setValue] = useState(["OK"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            // id="main"
            initValue={t("choose")}
            options={!loading && [t("choose"), ...orders]}
            complex={true}
            onChangeSelect={(opt) => {
              setName(opt._id);
            }}
            elem="dish"
          />
        </div>
        {selectedOrder && selectedOrder.name !== t("choose") && (
          <div className="w-full">
            <div className="aligned-details-dish">
              <span className="flex-auto">{t("main")}</span>
              <SelectElement
                elem="dish"
                id="main"
                initValue={main || t("none")}
                options={!loading && mains}
                complex={true}
              />
            </div>
            <div className="aligned-details-dish">
              <span className="flex-auto">{t("side")}</span>
              <SelectElement
                elem="dish"
                id="side"
                initValue={side || t("none")}
                options={!loading && sides}
                complex={true}
              />
            </div>
            <div className="flex justify-between items-center mb-1 min-h-8">
              <span className="flex-auto">{t("herbsAndSpices")}</span>
              <TreeSelect
                value={value}
                treeData={[
                  { title: "OK", value: "OK" },
                  { title: "node2", value: "node2" },
                  { title: "node3", value: "node3" },
                  { title: "node4", value: "node4" },
                ]}
                style={{
                  height: "100%",
                  flex: 1,
                }}
                treeCheckable={true}
                onSelect={(value, node, extra) => {
                  console.log(value, node, extra);
                }}
                onChange={(value, node, extra) => {
                  console.log(value, node, extra);
                  setValue(value);
                }}
                // defaultValue={["OK", "node2"]}
              />
            </div>
            <div className="aligned-details-dish">
              <span className="flex-auto">{t("sauce")}</span>
              <SelectElement
                elem="dish"
                id="sauce"
                initValue={sauce || t("none")}
                options={!loading && sauces}
                complex={true}
              />
            </div>
            <div className="aligned-details-dish">
              <span className="flex-auto">{t("salt")}</span>
              <SelectElement
                elem="dish"
                id="salt"
                initValue={salt || t("none")}
                options={[t("none"), "S", "L"]}
              />
            </div>
            <div className="aligned-details-dish">
              <span className="flex-auto">{t("pepper")}</span>
              <SelectElement
                elem="dish"
                id="pepper"
                initValue={pepper || t("none")}
                options={[t("none"), "S", "L"]}
              />
            </div>
            <div className="aligned-details-dish">
              <span className="flex-auto">{t("cooking")}</span>
              <SelectElement
                elem="dish"
                id="cooking"
                initValue={cooking || t("none")}
                options={[t("rare"), t("medium_rare"), t("well_done")]}
              />
            </div>
          </div>
        )}
        <div className="flex justify-end w-full">
          {/* <label></label> */}
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
