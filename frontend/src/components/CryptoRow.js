
import React, { useState, useEffect } from 'react';
import './CryptoRow.css'
import { UpArrow,DownArrow, TailedUpArrow, TailedDownArrow } from '../utils/icons';
const CryptoRow = ({ value, prevValue,rate,cryptoDetailPage,toFixed,AIValue }) => {
  const [animationClass, setAnimationClass] = useState('');
  const [increased,setIncreased] =useState('');

  useEffect(() => {
    if (value > prevValue) {
      setAnimationClass('fade-green');
      setIncreased(true)
    } else if (value < prevValue) {
      setAnimationClass('fade-red');
      setIncreased(false)
    } else {
      setAnimationClass('');
    }

   /*  const timer = setTimeout(() => {
      setAnimationClass('');
    }, 6000);

    return () => clearTimeout(timer); */
  }, [value, prevValue]);

  if(cryptoDetailPage){
    return (
      <span className={animationClass}>
      <div className='data-cell' >
      <span>{increased?<UpArrow/>:<DownArrow/>}</span>
      <span>{value? value.toFixed(2) + "%" : 'N/A'} </span>
      </div>
    </span>
    )
  }
  if(toFixed && AIValue){
    return (
      <span className={increased?'green':'red'}>
      <div className='data-cell' >
      <span>{increased?<TailedUpArrow/>:<TailedDownArrow/>}</span>
      <span>{value? value?.toFixed(2) : 'N/A'} </span>
      </div>
    </span>
    )
  }

  return (
    <span className={animationClass}>
      <div className='data-cell' >
      <span>${value ? rate? value.toFixed(6): value.toLocaleString() : 'N/A'} </span> 

      </div>
    </span>
  );
};

export default CryptoRow;
