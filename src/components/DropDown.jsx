import React from 'react';
import { HiMiniStar } from "react-icons/hi2";
import { FaRegStar } from "react-icons/fa6";

const DropDown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
    title=""
}) => {

    const isFav = curr => favorites.includes(curr);

  return (
    <div>
        <label htmlFor={title} className=' block text-sm font-medium text-gray-700'>
            {title}
        </label>
        <div className=" mt-1 relative">
            <select className=' w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-300'
            value={currency}
            onChange={(e) => {
                setCurrency(e.target.value)
            }}>

                {
                    favorites.map((curr,i)=>(
                        <option value={curr} key={i}
                        className=' bg-gray-200'>
                            {curr}
                        </option>
                    ))
                }
                <hr />
                {
                    currencies?.filter((c)=>(!favorites.includes(c))).map((curr,i)=>(
                        <option value={curr} key={i} className=' bg-gray-100'>
                            {curr}
                        </option>
                    ))
                }
            </select>
            <button className=' absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5'
            onClick={()=>{
                handleFavorite(currency)
            }}>
            {
                isFav(currency)?<HiMiniStar></HiMiniStar>:<FaRegStar></FaRegStar>
            }
            </button>
        </div>
    </div>
  )
}

export default DropDown