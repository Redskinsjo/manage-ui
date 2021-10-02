import React from "react";
import { Menu, Dropdown, message } from "antd";
import { useTranslation } from "react-i18next";

const Language: React.FC = () => {
  const { t, i18n } = useTranslation();

  const onClick = (key: string): void => {
    i18n.changeLanguage(key);
    message.info(t("languageChoiceMsg"));
  };

  const menu = (
    <Menu
      onClick={(e) => {
        onClick(e.key);
      }}
    >
      <Menu.Item key="fr">FR</Menu.Item>
      <Menu.Item key="en">EN</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} className="w-12">
      <div className="h-12 flex items-center justify-center w-12">
        <a className="text-xl text-center" onClick={(e) => e.preventDefault()}>
          {i18n.language.toUpperCase()}
        </a>
      </div>
    </Dropdown>
  );
};

export default Language;
