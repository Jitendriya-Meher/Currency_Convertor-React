import React, { useEffect, useState } from 'react'
import DropDown from './DropDown';
import { IoMdSwap } from "react-icons/io";

const CurrencyConvertor = () => {

    const url="https://api.frankfurter.app/currencies";

    const [ currencies, setCurrencies] = useState([]);
    const [ amount, setAmount] = useState(1);
    const [from, setFrom] = useState("USD");
    const [ to, setTo] = useState("INR");
    const [ convertedAmount, setConvertedAmount] = useState(null);
    const [ converting, setConverting] = useState(false);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("fav"))||[]);

    const fetchCurrencies = async () => {
        try{
            const res = await fetch(url);
            const data = await res.json();

            // console.log(data);
            setCurrencies(Object.keys(data));
        }
        catch(err){
            console.log(err.message);
        }
    }

    const convertCurrencies = async () => {
        if( !amount){
            return;
        }
        setConverting(true);
        try{
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
            const data = await res.json();

            // console.log(data);

            setConvertedAmount(data.rates[to]+" "+to)
        }
        catch(err){
            console.log(err.message);
        }
        finally{
            setConverting(false);
        }
    }

    const handleFavorite = (currency) => {
        // add to favorites
        let updatedFav = [...favorites];

        if( favorites.includes(currency)){
            updatedFav = updatedFav.filter((fav) => fav!==currency);
        }
        else{
            updatedFav.push(currency);
        }

        localStorage.setItem("fav",JSON.stringify(updatedFav));
        setFavorites(updatedFav);
    }

    const swapCurrencies = () => {
        setFrom(to);
        setTo(from);
    }

    useEffect(()=>{
        fetchCurrencies();
    },[]);

    
  return (
    <div className=' max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>

        <h2 className=' mb-5 text-2xl font-semibold to-gray-700 text-center'>
            Currency Convertor
        </h2>

        <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            
            <DropDown currencies={currencies}
            title='From:' 
            handleFavorite={handleFavorite}
            setCurrency={setFrom}
            currency={from}
            favorites={favorites}
            ></DropDown>

            <div className=" flex justify-center -mb-5 sm:mb-0">
                <button className=' p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'
                onClick={swapCurrencies}>
                    <IoMdSwap className=' text-xl to-gray-700'></IoMdSwap>
                </button>
            </div>

            <DropDown currencies={currencies} 
            title='To:' 
            handleFavorite={handleFavorite}
            setCurrency={setTo}
            favorites={favorites}
            currency={to}></DropDown>

        </div>

        <div className=" mt-4">
            <label htmlFor="amount" className=' block text-sm font-medium to-gray-700'>
                Amount
            </label>
            <input type="number" className=' my-1 p-2 w-full border bg-grey-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm'
            onChange={(e)=>{
                setAmount(e.target.value);
            }} 
            value={amount}
            />
        </div>

        <div className=" flex justify-end mt-6">
            <button className={` px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting}?" animate-pulse":""`}
            onClick={convertCurrencies}>
                Convert
            </button>
        </div>

        {convertedAmount && <div className=" mt-4 text-xl font-medium text-right text-green-600">
            Converted Amount : {convertedAmount}
        </div>}


    </div>
  )
}

export default CurrencyConvertor