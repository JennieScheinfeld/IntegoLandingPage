import './../styles/faq.scss'
import { sendEventToServer } from '../analytics'
import { useState } from 'react'

const initialQuestions = {
    1: {
        text: "What are the system requirements for Intego antivirus?",
        answer: "Blah blah blah",
        open: false
    },
    2: {
        text: "Is the trial version completley free? What’s the catch?",
        answer: "Blah blah blah",
        open: false
    },
    3: {
        text: "What happen when my trial period is over?",
        answer: "Blah blah blah",
        open: false
    },
    4: {
        text: "in what payment methods can I use to purchase intego antivirus?",
        answer: "Blah blah blah",
        open: false
    },
    5: {
        text: "What if i purchase Intego's premium and then regret it?",
        answer: "Blah blah blah",
        open: false
    }
}


export const Faq = () => {
    const [questions, setQuestions] = useState(initialQuestions)
    
    const handleClick = (questionId) => {
        sendEventToServer({ eventName: `question id: ${questionId} was ${questions[questionId].open ? "opened": "closed"}`})
        setQuestions(preState => {
            const open = preState[questionId].open
            return {...preState, [questionId]: {
                ...preState[questionId], open: !open
            }}
        })
    }

    return <div className='faqContainer'>
        <div className='faqWrapper'>
            <div className='faqTitle'>Frequently<br/> Asked<br/> Questions</div>
            <div className='faqParagraph'>Dicta omnes atomorum voluptatum definitionem petentium sit at, vel at quis corrumpit facilisi contentiones per.</div>
        </div>

        <div className='buttonsContainer'>
            {Object.keys(questions).map(qId => {
                return <div className='faqWrapper'>
                    <button className='faqButton' style={{background: questions[qId].open ? "#4F4F64" : "white", color: questions[qId].open ? "white" : "black"}} onClick={() => handleClick(qId)}>{questions[qId].open ? "-" : "+"} {questions[qId].text}</button>
                    {questions[qId].open ? <div className='faqParagraph'>{questions[qId].answer}</div> : null}
                    </div>
            })}
        </div>
    </div>
}
