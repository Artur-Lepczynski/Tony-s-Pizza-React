import {useState} from "react";

export default function useInput(validateInput){

  const [enteredValue, setEnteredValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const enteredValueisValid = validateInput(enteredValue); 
  const inputIsValid = enteredValueisValid || !inputTouched; 

  function inputBlurHandler(){
    setInputTouched(true);
  }

  function inputChangeHandler(event){
    setEnteredValue(event.target.value)
  }

  function reset(){
    setEnteredValue("");
    setInputTouched(false);
  }

  return {
    enteredValue,
    setEnteredValue,
    enteredValueisValid, 
    inputIsValid,
    inputBlurHandler, 
    inputChangeHandler, 
    reset, 
  }

}