const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '540ccf5c10mshddbf6269f448d3ep181ac9jsna1e4cdcaacf5',
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
};

const useCurrConverter= async(from,to)=>{
    const data = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=1.0`,options);
    const result = await data.json();
    console.log(result);

    return result
}

export default useCurrConverter;