import smilingGuy from './../images/suprisinglyHappyGuy.png'
import review1 from './../images/Review1.png'
import review2 from './../images/Review2.png'
import review3 from './../images/Review3.png'
import './../styles/recommendations.scss'



export const Recommendations = () => {
    return <div className='recContainer'>
        <div className='wrapper'>
            <div className= "title">What the experts are <br/>saying about Intego</div>
            <img className= "rec" src={review1} />
            <img className= "rec" src={review2} />
            <img className= "rec" src={review3} />
        </div>
        <img className='smilingGuyPic' src={smilingGuy} />

    </div>
}
