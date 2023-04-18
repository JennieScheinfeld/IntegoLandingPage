const getIPaddress = async () => {
    const res = await fetch('https://api.ipify.org/?format=json')
    const json = await res.json()
    const ip = json.ip;
    return ip;
}


export const sendEventToServer = async ({eventName}) => {
    const ipAddress = await getIPaddress();
    fetch(`http://localhost:3000/logEvents/?event=${eventName}&ipAddress=${ipAddress}`,
    { method: 'POST'})
    .then(res => {
        console.log(res)
    })
    .catch(e => console.log(e.message))

}
