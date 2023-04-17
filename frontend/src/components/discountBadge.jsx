import './../styles/discountBadge.css'

export const DiscountBadge = ({ discount, imgSrc, doublePackage }) => {
    return  <div className="discountBadgeContainer">
                {doublePackage ? <img className='icon2' src={imgSrc}/> : <img className='icon1' src={imgSrc}/>}
                <div className='discountContainer'>
                    <div className='discountValue'>{discount}%</div>
                    <div className='discountText'>Discount</div>
                </div>
            </div>
}