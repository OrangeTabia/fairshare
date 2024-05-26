const USDFormatter = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
});

export const centsToUSD = (cents) => {
    return USDFormatter.format(cents / 100);
};

// takes in an decimal or intiger, returns an integer
export const removeDecimals = (amount) => {
    let adjustedAmount;
    amount.toString()
    if (amount.toString().indexOf('.') >= 0) {
        adjustedAmount = parseInt(amount.toString().slice(0, amount.indexOf('.')) + amount.toString().slice(amount.indexOf('.') + 1))
        if (amount.toString().slice(amount.indexOf('.') + 1).length === 1) {
          adjustedAmount = parseInt(adjustedAmount.toString() + '0')
        }
      } else {
        adjustedAmount = parseInt(amount.toString() + '00')
      }
    return adjustedAmount;
  }
