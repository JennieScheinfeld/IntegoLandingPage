import React, { useEffect, useState } from "react";
import './../styles/productCard.css'
import './../styles/extendedProtectionCard.css'
import { YellowButton } from "./yellowButton";
import {MoneyBack} from "./moneyBack"
import bestValueTag from './../images/bestValueTag.svg'
import { ProductBullet } from "./productBullet";
import { DiscountBadge} from "./discountBadge"

import integtoAntiVurusImg from '../images/stackedImg.svg'
import { PlainButton } from "./plainButton";

export const ExtendedProtectionCard = ({bundleList, currency="usd"}) => {
    const [productDetails, setProductDetails] = useState({})
    const bundleName = "extended"

    useEffect(() => {
        fetch(`http://localhost:3000/getPriceByMultipleBundles/?bundleList=${bundleList}&currency=${currency}`)
        .then((res) =>  res.json())
        .then(res => {
            setProductDetails(res)
        })
        .catch(e => console.log(e.message))
      }, [])

    return <div className="container">
        <DiscountBadge discount={productDetails.discountValue} imgSrc={integtoAntiVurusImg} doublePackage={true}/>
        <img className= "" src={bestValueTag} />
        <div className="productTitle">Extended Protection</div>
        <div className="productSubTitle">Best Offer you will get!</div>
        <div className="monthlyAmount">Only ${productDetails.monthlyCost}/month</div>
        <div className="billingInfo">
            <span>Billed </span>
            <span style={{	fontWeight: "bold"}}>${productDetails.newPrice} </span>
            <span style={{ textDecoration: "line-through", color: "#7E7E9C"}}>${productDetails.origPrice} </span>
            <span>for the first 2 years</span>
        </div>
        <YellowButton bundleName={bundleName} />
        <MoneyBack/>
        <div className="solid"/>
        <div className="productDescriptionsContainer">
            <ProductBullet color="red" title={`Get ${productDetails.discountValue}% OFF!`} />
            <ProductBullet title="2 years protection" />
            <ProductBullet backgroundColor="rgba(255, 192, 1, 0.1)" title="Essential  Protection Plan" />
            <ProductBullet backgroundColor="rgba(255, 192, 1, 0.1)" title="Advanced Protection Plan"  />
        </div>
        <div className="smallPrint">Discount applicable for the first payment only</div>
    </div>
}