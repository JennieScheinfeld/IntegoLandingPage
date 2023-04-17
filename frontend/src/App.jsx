import { useState, useEffect } from 'react'
import './App.scss'
import { ExtendedProtectionCard } from './components/extendedProtectionCard'
import { EssentialProtectionCard } from './components/essentialProtection'
import { AdvancedProtectionCard } from './components/advancedProtection'
import { PageHeader } from './components/pageHeader'


function App() {
  const [count, setCount] = useState(0)
  const bundleNames = ['essential, advanced, ']


  return (
    <div className='App'>
    <PageHeader />
    <div className="productCardsContainer">
       <EssentialProtectionCard bundleName="advanced"/>
       <AdvancedProtectionCard />
       <ExtendedProtectionCard bundleList={["essential", "vpn_addon"]}/>
      </div>
    </div> 
  )
   

}

export default App
