// import { createSelector } from "reselect";
// import enLocale from "date-fns/locale/en-US";
// import frLocale from "date-fns/locale/fr";

// import { RootState } from "redux/rootReducer";
// import { LocaleProviderState } from "./reducer";

// export const localesFnsMap = {
//   en: enLocale,
//   fr: frLocale,
// };

// export const localeNamesMap = {
//   en: "English",
//   fr: "French",
// };

// export const getLocaleSelector = (state: RootState): LocaleProviderState =>
//   state.locale;

// export const getLocaleFullNameSelector = createSelector(
//   getLocaleSelector,
//   (locale) => localeNamesMap[locale] || localeNamesMap.fr
// );

// export const getLocalizationUtilsSelector = createSelector(
//   getLocaleSelector,
//   (locale) => (locale ? localesFnsMap[locale] : null)
// );
