
import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef(null);

  const passwoedGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "123456789";
    if(charAllowed) str += "~`!@#$%^&*()_+={}|";

    for (let i = 1; i <= length; i++) {
          let char = Math.floor((Math.random() * str.length) + 1 );
          pass += str.charAt(char);
    }
    setpassword(pass);
  },[length,numAllowed,charAllowed,setpassword]);

  const copyToClipboard = useCallback (() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect (() => {
    passwoedGenerator();
  },[length,numAllowed,charAllowed,passwoedGenerator]);

  return (
    <div className='flex items-center justify-center'>
    <div className=' text-blue-500 h-fit w-1/2 bg-zinc-700 rounded-lg my-10 flex flex-col items-center'>
      <h1 className=' my-4 text-2xl font-semibold'>Password Generator</h1>
      <div className=' w-2/3 flex items-center gap-2'>
      <input 
      type="text" 
      className=' rounded-md w-full px-2 py-1 my-2 outline-none'
      placeholder='Password'
      value={password}
      ref={passwordRef}
      readOnly
      />
      <button onClick={copyToClipboard} className=' text-white bg-blue-600 px-2 rounded-md py-1'>copy</button>
      </div>
      <div className='flex items-center gap-5 text-lg my-4'>
       <div>
       <input 
        type="range"  
        min={5}
        max={100}
        value={length}
        onChange={(e)=>{setlength(e.target.value)}}
        />
        <label htmlFor="Length"> Lenght : ({length}) </label>
       </div>
       <div>
        <input 
        type="checkbox"  
        defaultChecked = {numAllowed}
        onChange={ () =>{
          setnumAllowed((prev) => !prev)
        }}
        />
        <label htmlFor="num"> Number </label>
       </div>
       <div>
        <input
         type="checkbox" 
         defaultChecked = {charAllowed}
         onChange={ () => {
          setcharAllowed((prev) => !prev )
         }}
         />
         <label htmlFor="char"> Character </label>
       </div>
      </div>
    </div>
    </div>
  )
}

export default App