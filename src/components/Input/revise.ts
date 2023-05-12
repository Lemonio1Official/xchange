export function minMax(min: number, max: number, value: string) {
  return value.length >= min && value.length <= max ? "" : `Min: ${min}; Max: ${max}`;
}
export function findSymbol(symbol: string, count: number, value: string) {
  let counter = 0;
  for (let i of value) {
    i === symbol && counter++;
  }
  return counter === count ? "" : "The field is filled incorrectly";
}
export function forbiddenSymbol(symbols: string[], value: string) {
  let error = "";
  symbols.map((i) => {
    if (error === "") error = value.indexOf(i) > -1 ? `"${i}" is a forbidden character` : "";
  });
  return error;
}
