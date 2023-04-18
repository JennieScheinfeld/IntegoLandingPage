import { useState, useEffect } from 'react'
import './App.scss'
import { ExtendedProtectionCard } from './components/extendedProtectionCard'
import { EssentialProtectionCard } from './components/essentialProtection'
import { AdvancedProtectionCard } from './components/advancedProtection'
import { PageHeader } from './components/pageHeader'
import { sendEventToServer } from './analytics';


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
    <div className="productCardsContainer">
       <EssentialProtectionCard/>
       <AdvancedProtectionCard />
       <ExtendedProtectionCard bundleList={["essential", "vpn_addon"]}/>
      </div>
    </div> 
  )
   

}

export default App
