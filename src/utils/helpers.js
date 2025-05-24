import * as currencyCodes from 'currency-codes';

function codeToCurrency(codeNum) {
  const found = currencyCodes.number(codeNum.toString());
  return found ? found.code : null;
}
export const currencyCodeConversion = (currency) => {
  return currency
    .map((entry) => {
      return {
        ...entry,
        currencyCodeA: codeToCurrency(entry.currencyCodeA),
        currencyCodeB: codeToCurrency(entry.currencyCodeB),
      };
    })
    .filter(
      (entry) =>
        (entry.currencyCodeA === 'USD' && entry.currencyCodeB === 'UAH') ||
        (entry.currencyCodeA === 'EUR' && entry.currencyCodeB === 'UAH')
    );
};

export const formatValue = (value) => {
  return value.toFixed(2);
};
