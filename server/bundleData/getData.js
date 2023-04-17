const pricing = require("./pricing.json")

const getBundlePrice = (bundleName) => {
    const origPriceUSD = pricing.original[bundleName].USD
    const newPriceUSD = pricing.offers[bundleName].USD
    return {origPriceUSD, newPriceUSD}
}

const getDiscountValue = ({origPrice, newPrice}) => {
    const calcDiscount = Math.ceil(((origPrice - newPrice)/origPrice) * 100)
    return calcDiscount.toString()
}


const getMonthlyCosts = (yearlyCost) => {
    const cost = yearlyCost/12
    return cost.toString()
}

const getBundleNames = () => {
    const keys = Object.keys(pricing.original);
    return keys;
}

const getSupportedCurrencies = () => {
    return ["USD", "JPY", "GBP", "EUR", "CAD", "AUD", "SEK", "SGD", "MXN", "NZD", "DKK", "BRL", "NOK", "HKD", "CLP",
        "THB", "ZAR", "INR", "COP"]
}

module.exports = {getBundlePrice, getDiscountValue, getMonthlyCosts, getBundleNames, getSupportedCurrencies}