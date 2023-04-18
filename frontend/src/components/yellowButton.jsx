import './../styles/buttons.css'
import { sendEventToServer } from '../analytics';


export const YellowButton = ({bundleName}) => {
    const handleClick = async () => {
        sendEventToServer({ eventName: "clicked on buy for " + bundleName + " card"})
    }

    return <button className='yellowButton' onClick={handleClick}>
        Buy Now
    </button>
}