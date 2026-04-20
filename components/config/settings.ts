export const settings = {
    supportedCurrencies: {
      USD: { symbol: "$" },
      NGN: { symbol: "₦" },
    },
  };
  
  
  export const navigationLink = [
    {name: "home",link:"/"},
    {name: "pricing",link:"/pricing"},
    {name: "security",link:"/security"},
    {name: "privacy",link:"/privacy"}
  ] as const