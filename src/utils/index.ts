export const currencyFormatter = (num: number) => {
  return 'SGD' + new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" }).format(num);
}