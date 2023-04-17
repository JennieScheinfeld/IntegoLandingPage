import checkmark from './../images/checkmark.svg'
import './../styles/productBullet.css'

export const ProductBullet = ({title, content, color, backgroundColor }) => {
    return <div style= {{color: color, backgroundColor: backgroundColor, marginBottom: `${backgroundColor ? "16px" : ""}`}} className='productBullet'>
        <img className= "checkmark" src={checkmark} />
        <div  style={{marginRight: "7px"}}> 
        <span  style={{fontWeight: "bold", marginRight: "7px"}}>{title}</span>
        <span>{content}</span>
        </div>

    </div>
}