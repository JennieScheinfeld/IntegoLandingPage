import React, { useEffect, useState } from "react";
import './../styles/productCard.css'
import { PlainButton } from "./plainButton";
import {MoneyBack} from "./moneyBack"
import { ProductBullet } from "./productBullet";
import { DiscountBadge} from "./discountBadge"

import integtoAntiVurusImg from '../images/stackedImg.svg'

export const AdvancedProtectionCard = ({currency="usd"}) => {
    const [productDetails, setProductDetails] = useState({})
    const bundleName = "advanced"

    useEffect(() => {
        fetch(`http://localhost:3000/getPriceByBundle/?bundle=${bundleName}&currency=${currency}`)
        .then((res) =>  res.json())
        .then(res => {
            setProductDetails(res)
        })
        .catch(e => console.log(e.message))
      }, [])

    return <div className="container">
        <DiscountBadge discount={productDetails.discountValue} doublePackage={true} imgSrc={integtoAntiVurusImg}/>
        <div className="productTitle" style={{ marginTop: "50px"}}>Advanced Protection</div>
        <div className="productSubTitle">Online Privacy Features:</div>
        <div className="monthlyAmount">Only ${productDetails.monthlyCost}/month</div>
        <div className="billingInfo">
            <span>Billed </span>
            <span style={{	fontWeight: "bold"}}>${productDetails.newPrice} </span>
            <span style={{ textDecoration: "line-through", color: "#7E7E9C"}}>${productDetails.origPrice} </span>
            <span>for the first 1 year</span>
        </div>
        <PlainButton bundleName={bundleName} />
        <MoneyBack/>
        <div className="solid"/>
        <div className="productDescriptionsContainer">
            <ProductBullet title="Essential  Protection Plan" backgroundColor="rgba(255, 192, 1, 0.1)"/>
            <ProductBullet title="Secure Wi-Fi protection:" content=" Secure your connection when connected to public Wi-Fi or low security networks" />
            <ProductBullet title="Protect your Privacy:" content="Keep yourpersonal data safe & private" />
            <ProductBullet title="Browse without boundaries:" content="Intego VPN opens up the web for streaming & browsing" />
        </div>
        <div className="smallPrint">Discount applicable for the first payment only</div>
    </div>
}