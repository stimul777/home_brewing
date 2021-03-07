import store from "../store/store";

// Фильтр даты и времени.Работает с помощью  Intl.DateTimeFormat и в зависимости от переданного
// аргумента переключает форматы дата-время
function dateFilter(value, format = "date") {
  const options = {};

  if (format.includes("date")) {
    options.day = "2-digit";
    options.month = "long";
    options.year = "numeric";
  }

  if (format.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }

  const locale = store.getters.info.locale || "ru-RU";
  return new Intl.DateTimeFormat(locale, options).format(new Date(value));
}

export default dateFilter;
