// import React from "react";
// import { useSelector } from "react-redux";
// import { IntlProvider } from "react-intl";
// import { MuiPickerUtilsProvider } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

// import { getLocalizationUtilsSelector, getLocaleSelector } from "./selectors";

// const LocaleProvider = ({ messages, children }) => {
//   const locale = useSelector(getLocaleSelector);
//   const localizationUtils = useSelector(getLocalizationUtilsSelector);
//   return (
//     <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
//       <MuiPickerUtilsProvider utils={DateFnsUtils} locale={localizationUtils}>
//         {React.Children.only(children)}
//       </MuiPickerUtilsProvider>
//     </IntlProvider>
//   );
// };

// export default LocaleProvider;
