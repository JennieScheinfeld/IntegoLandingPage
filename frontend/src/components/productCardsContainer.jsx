import { ExtendedProtectionCard } from './extendedProtectionCard'
import { EssentialProtectionCard } from './essentialProtection'
import { AdvancedProtectionCard } from './advancedProtection'
import './../styles/productCardsContainer.css'

export const ProductCardsContainer = () => {
    return <div className="productCardsContainer">
        <EssentialProtectionCard/>
        <AdvancedProtectionCard />
        <ExtendedProtectionCard bundleList={["essential", "vpn_addon"]}/>
      </div>

}
