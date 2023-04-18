const express = require( "express");
const cors = require('cors');
const getData = require("./bundleData/getData")
const dbConnect = require("./dbConnect.jsx");
const { Result } = require("antd");

const app = express();
app.use(cors());
app.use(express.json());


const validateBundleRequest = (req, res, next) => {
    const validBundleNames = getData.getBundleNames()
    console.log("req.query", req.query)
    const {bundle, currency} = req.query
    if (!validBundleNames.includes(bundle) && bundle !== "*") {
        throw new Error('Invalid bundle name')
    }
    const supportedCurrencies = getData.getSupportedCurrencies()

    if (!supportedCurrencies.includes((currency).toUpperCase())) {
        throw new Error('Invalid currency')
    }
    next();
  }
  

  const validateMultipleBundleRequest = (req, res, next) => {
    const validBundleNames = getData.getBundleNames()
    let bundleList = req.query.bundleList
    bundleList = bundleList.split(",")
    console.log("bundleList", bundleList)
    if (!bundleList.filter(bundle => validBundleNames.includes(bundle))) {
        throw new Error('Invalid bundle names')
    }
    const supportedCurrencies = getData.getSupportedCurrencies()

    if (!supportedCurrencies.includes((req.query.currency).toUpperCase())) {
        throw new Error('Invalid currency')
    }
    next();
  }

  const validateEvent = (req, res, next) => {
    const {ipAddress, event, additionalInfo} = req.query;
    if (typeof ipAddress !== "string") {
      throw new Error('IP Address must be a string')
    }
    if (ipAddress.split(".").length !== 4) {
      throw new Error('Invalid Ip Address')
    }
    if (typeof event !== "string") {
      throw new Error('event must be a string')
    }
    if (additionalInfo && typeof additionalInfo !== "string") {
      throw new Error('additionalInfo must be a string')
    }
    next();
  }

  const getBundleInfo = (bundleName) => {
    const {origPriceUSD, newPriceUSD} = getData.getBundlePrice(bundleName)
    const discountValue = getData.getDiscountValue({origPrice: origPriceUSD, newPrice: newPriceUSD})
    const monthlyCost = (newPriceUSD/12).toFixed(2);
    return {origPrice: origPriceUSD, newPrice: newPriceUSD, monthlyCost, discountValue}

  }

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.get('/getPriceByBundle', validateBundleRequest, (req, res) => {
    const bundleName = req.query.bundle;
    if (bundleName === "*") {
      const bundleNames = getData.getBundleNames()
      const result = bundleNames.reduce((res, bundleName) => {
        res[bundleName] = getBundleInfo(bundleName)
        return res
      }, {})
      res.send(result);
    }

    res.send(getBundleInfo(bundleName))
  });

  app.get('/getPriceByMultipleBundles', validateMultipleBundleRequest, (req, res) => {
    const bundleNames = req.query.bundleList;
    const bundleList = bundleNames.split(",")
    const sums = bundleList.reduce((sums, bundleName) => {
      const {origPriceUSD, newPriceUSD} = getData.getBundlePrice(bundleName)
      sums.origPriceUSD = sums.origPriceUSD + parseInt(origPriceUSD)
      sums.newPriceUSD = sums.newPriceUSD + parseInt(newPriceUSD)
      return sums
    }, {origPriceUSD: 0, newPriceUSD: 0})

    const {origPriceUSD, newPriceUSD} = sums
    const discountValue = getData.getDiscountValue({origPrice: origPriceUSD, newPrice: newPriceUSD})
    const monthlyCost = (newPriceUSD/12).toFixed(2);
    res.send({origPrice: origPriceUSD, newPrice: newPriceUSD, monthlyCost, discountValue});
  });

  app.post('/logEvents', validateEvent, (req, res) => {
    const eventName = req.query.event;
    const additionalInfo = req.query.additionalInfo;
    const ipAddress = req.query.ipAddress;
    console.log({event: eventName, ipAddress, additionalInfo})
    dbConnect.insertRow({ tableName: "user_actions", data: {event: eventName, ipAddress, additionalInfo}})

    res.json({ message: 'Data received' });
  });
  
  // Start server
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });