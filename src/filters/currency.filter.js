// фильтр возвращает валюту(символ)
// Используется: HomeBill
export default function currencyFilter(value, currency = "RUB") {
  return Intl.NumberFormat('ru-ru', {
    style: 'currency',
    currency:currency
  }).format(value)
}