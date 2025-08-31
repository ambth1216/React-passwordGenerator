import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [lenght, setlenght] = useState(8) // used to store the lenght value and the default is 8
  const [numbersAllowed, setNumbers] = useState(false) 
  const [charAllowed, setChar] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null) // used for reference

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~"

    for (let i = 1; i <= lenght; i++) {
      let index = Math.floor(Math.random()*str.length)
      pass += str.charAt(index)
    }

    setPassword(pass)
  }, [lenght, numbersAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  }, [lenght, numbersAllowed, charAllowed, passwordGenerator])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className='card'>
        <input type="text" 
        id='passwordfield'
        value = {password}
        placeholder='Password'
        ref={passwordRef}
        readOnly/>
        <button className='copy' id='cpoyId' onClick={copyPassword}>Copy</button>
      </div>
      <div className='variables'>
        <input type="range" id='lenght'
        min={8}
        max={50}
        value={lenght}
        onChange={(e)=>{setlenght(Number(e.target.value))}}/><label htmlFor="lenght">Lenght: {lenght}</label>
        <input type="checkbox" id='numbers'
        defaultChecked={numbers}
        onChange={() => {setNumbers((prev)=>!prev)}}/><label htmlFor="numbers">Nunbers</label>
        <input type="checkbox" id='characters'
        defaultChecked={char}
        onChange={() => {setChar((prev) => !prev)}}/><label htmlFor="Characters">Characters</label>
      </div>
    </div>
  )
}

export default App
