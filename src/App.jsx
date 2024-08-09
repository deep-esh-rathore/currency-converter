import { useCallback, useEffect, useState } from 'react'
import './App.css'
import countryList from './assets/codes'
import useCurrConverter from './hooks/useCurrConverter'

function App() {
  const [amount,setamount] = useState(1)
  const [from,setfrom] = useState("USD")
  const [fromCountry, setfromCountry] = useState('US')
  const [toCountry, settoCountry] = useState('IN')
  const [to,setto] = useState("INR")
  const [output,setoutput] = useState("")


  const options = Object.entries(countryList).map(([currcode,countrycode]) => (
    <option value={currcode} name={countrycode} >
      {currcode}
    </option>
  ));


  const updateFlag = useCallback((e)=>{
    const {name , value}  =  e.target;
    const countrycode = e.target.selectedOptions[0].getAttribute('name');
    if(name === 'from'){
      setfrom(value);
      setfromCountry(countrycode);
    } else if(name ==='to'){
      setto(value);
      settoCountry(countrycode)
    }
  },[options])

  const updateAmount = (e)=>{
    const amount = e.target.value;
    if(amount <= 0 ){
      setamount(0)
    }else{
      setamount(amount)
    }
  }

  useEffect(()=>{
    const finalconversion = async()=>{
      const result = await useCurrConverter(from,to);
      setoutput(result*amount);
    };
    finalconversion()
  },[amount,from,to])


  return (
    <>
      <div>
        <h1>currency converter</h1>
        <div className='container'>
          <h3>enter amount</h3>
          <input type="text" value={amount} 
          onChange={updateAmount} />
          <div className='select-container'>
            <div className="from">
              <p>{from}</p>
              <img src={`https://flagsapi.com/${fromCountry}/flat/64.png`}  />
              <br />
              <select name="from" onChange={updateFlag} defaultValue={"USD"}>
                {options}
              </select>
            </div>
            <div className="to">
              <p>{to}</p>
              <img src={`https://flagsapi.com/${toCountry}/flat/64.png`} />
              <br />
              <select name="to" onChange={updateFlag} defaultValue={"INR"}>
                {options}
              </select>
            </div>
          </div>
          <div className='answer'>{amount +" "+ from +" "+'is'+" "+ output+" "+ to}</div>
        </div>
      </div>
    </>
  )
}

export default App
