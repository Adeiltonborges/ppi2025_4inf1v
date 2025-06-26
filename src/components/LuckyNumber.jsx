import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
    // react hook - useState()

    const  [luckyNumber, setLuckyNumber] = useState(0);

  function handleClick() { 
    setLuckyNumber(Math.ceil(Math.random() * 31)); 
    console.log("Lucky number is now: " + luckyNumber);

    if (array.includes(luckyNumber)) {
      setMessage
    }


}
  
    return (
     <div className={styles.container}>
        {luckyNumber ? (
            <h1> Lucky number = {luckyNumber} </h1>
        ) : (
            <h1>Lucky Number 🎲</h1>
        )}

       
        <button className={styles.button} onClick={handleClick}>
          Click me! 
          </button> 
          {Array.lenghth > 0 && (
            <div>
              <h3>lucky number array</h3>
              <p>
                [{array.toString()}]
              </p>
            </div>
          )}
     </div> 
  );
}
