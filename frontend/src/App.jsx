import { useState, useEffect } from 'react'
import './App.scss'
import { PageHeader } from './components/pageHeader'
import { ProductCardsContainer } from './components/productCardsContainer';
import { sendEventToServer } from './analytics';
import { Recommendations } from './components/recommendations'
import { AVReport } from './components/avReport';
import { Features } from './components/features';
import { Faq } from './components/faq';
function App() {
  const [enteredPage, setEnteredPage] = useState(false)

  useEffect(() => {
    if (!enteredPage) {
      sendEventToServer({ eventName:"entered page" })
      setEnteredPage(true)
    }
  }, [])


  return (
    <div className='App'>
      <PageHeader />
      <ProductCardsContainer />
      {/* <AVReport /> */}
      <Recommendations />
      <Features />
      <Faq />
    </div> 

  )
   

}

export default App
