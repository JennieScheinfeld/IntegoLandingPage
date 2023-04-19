import girl1 from './../images/girl1.svg'
import girl2 from './../images/girl2.svg'
import './../styles/features.scss'

export const Features = () => {
    return <div className='featureContainer'>
        <div className='top'>
            <div className='featureContainer'>
                <div className='featureTitle'>24/7 PC Protection </div>
                <div className='paragraph'> Using the latest technology, malware engine and behavior analysis, Intego will protect your system around the clock to block Malware, Spyware, Adware,Ransomware and other threats - before they attack.</div>
            </div>
            <img className='icon' src={girl1} />
        </div>

        <div className='bottom'>
            <div className='featureContainer'>
                <div className='featureTitle'>Safely Browse and Shop Online</div>
                <div className='paragraph'>You and your family will be protected from online dangers with Intego Web Shield. Phishing attacks, fake websites, and other malware will be blocked quickly so that your PC remains safe at all times.</div>
            </div>
            <img className='icon' src={girl2} />
        </div>
    </div>
}
