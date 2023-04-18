import React, { useEffect, useState } from "react";
import './../styles/productCard.css'
import { PlainButton } from "./plainButton";
import {MoneyBack} from "./moneyBack"
import { ProductBullet } from "./productBullet";
import { DiscountBadge} from "./discountBadge"

import integtoAntiVurusImg from '../images/productImg.svg'

export const EssentialProtectionCard = ({currency="usd"}) => {
    const [productDetails, setProductDetails] = useState({})
    const bundleName = "essential"

    useEffect(() => {
        fetch(`http://localhost:3000/getPriceByBundle/?bundle=${bundleName}&currency=${currency}`)
        .then((res) =>  res.json())
        .then(res => {
            setProductDetails(res)
        })
        .catch(e => console.log(e.message))
      }, [])

    return <div className="container">
        <DiscountBadge discount={productDetails.discountValue} imgSrc={integtoAntiVurusImg}/>
        <div className="productTitle" style={{ marginTop: "50px"}}>Essential Protection</div>
        <div className="productSubTitle">Windows PC Antivirus</div>
        <div className="monthlyAmount">Only ${productDetails.monthlyCost}/month</div>
        <div className="billingInfo">
            <span>Billed </span>
            <span style={{	fontWeight: "bold"}}>${productDetails.newPrice} </span>
            <span style={{ textDecoration: "line-through", color: "#7E7E9C"}}>${productDetails.origPrice} </span>
            <span>for the first 1 year</span>
        </div>
        <PlainButton bundleName={bundleName}/>
        <MoneyBack/>
        <div className="solid"/>
        <div className="productDescriptionsContainer">
            <ProductBullet title="Powerful malware engine:" content="Adaptive, real-time malware engine monitors and eliminates threats before they reach your PC"/>
            <ProductBullet title="Easy to use, easy on your PC:" content="Intuitive and simple UI with light, customizable scans" />
            <ProductBullet title="100% malware immunity:" content="Independant lab tests show that Intego eradicates 100% of malwares" />
            <ProductBullet title="Ransomware protection:" content="Protects your personal data from being hacked and sncrypted from ransom" />
        </div>
        <div className="smallPrint">Discount applicable for the first payment only</div>
    </div>
}