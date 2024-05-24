const USDFormatter = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
});

export const centsToUSD = (cents) => {
    return USDFormatter.format(cents / 100);
};
