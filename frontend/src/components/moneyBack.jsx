import moneySign from './../images/moneySign.svg'
import './../styles/moneyBack.css'
export const MoneyBack = () => {
    return <div className='moneyBack'>
        <img src={moneySign}/>
        <span> 30-day money back guarantee</span>
    </div>
}