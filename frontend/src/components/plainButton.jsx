import './../styles/buttons.css'
import { sendEventToServer } from '../analytics';

export const PlainButton = ({ bundleName }) => {
    const handleClick = async () => {
        sendEventToServer({ eventName: "clicked on buy for " + bundleName + " card"})
    }
    
    return <button className='plainButton' onClick={handleClick}>
        Buy Now
    </button>
}