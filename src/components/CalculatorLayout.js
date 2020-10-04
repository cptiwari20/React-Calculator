import React, { useState } from 'react';
import '../styles/calculator.css';
import { calculate, parseCalculationString } from '../utils/helpers';

function Calculator() {
    const [result, setResult] = useState('0')
    const [mode, setMode] = useState('normal')
    const [theme, setTheme] = useState('light')

    const handleChange = ({target: {name, value}}) => {
        console.log(name, value)
        switch (name) {
            case 'num':
                return setResult(result+value)
            case 'operator':
                return setResult(result+value)
            case 'answer':
                return handleResult()
            case 'clear':
                return setResult('')
            default:
                break;
        }
    }

    const handleResult = () => {
        try {
            // Without BODMAS
            const res = calculate(parseCalculationString(result))
            setResult(res)
        } catch (e) {
            setResult('Error!!')
        } 
    }

  return (
    <div className="Calculator" style={{background: theme === 'light' ? '#fff' : '#000', height: '100vh'}}>
      <h1>Calculator GeoSnapshot Test</h1>
      <div className="container"  style={{background: theme === 'light' ? '#fff' : '#000'}}>
        <div className="header">React Calculator</div>
         <div className="result">
            {result}
         </div>
        <small style={{color: theme === 'light' ? '#000' : '#FFF'}}>Please check the result is "0" before start calculating, if it is not so, please click on the 'clear' button.</small>

        <div className='button-row'>
            <button onClick={() => setMode(mode === 'scientific' ? 'normal' : 'scientific')} className="button">{mode === 'scientific' ? 'Normal' : 'Scientific'}</button>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="button">{theme === 'light' ? 'Dark' : 'Light'} Theme</button>
        </div>
        { mode === 'scientific' && 
            <div className="first-row">
                <input onClick={handleChange} type="button" name="operator" value="&radic;" className="global"/>
                <input onClick={handleChange} type="button" name="operator" value="x&#178;" className="global"/>
                <input onClick={handleChange} type="button" name="operator" value="%" className="global"/>
                <input onClick={handleChange} type="button" name="operator" value="Flip Value" className="global"/>
            </div>
        }
        <div className="second-row">
          <input onClick={handleChange} type="button" name="num" value="7" className="global"/>
          <input onClick={handleChange} type="button" name="num" value="8" className="global"/>
          <input onClick={handleChange} type="button" name="num" value="9" className="global"/>
          <input onClick={handleChange} type="button" name="operator" value="/" className="global"/>
        </div>
        <div className="third-row">
          <input onClick={handleChange} type="button" name="num" value="4" className="global"/>
          <input onClick={handleChange} type="button" name="num" value="5" className="global"/>
          <input onClick={handleChange} type="button" name="num" value="6" className="global"/>
          <input onClick={handleChange} type="button" name="operator" value="*" className="global"/>
        </div>
        <div className="fourth-row">
          <input onClick={handleChange} type="button" name="num" value="1" className="global"/>
          <input onClick={handleChange} type="button" name="num" value="2" className="global"/>
          <input onClick={handleChange} type="button" name="num" value="3" className="global"/>
          <input onClick={handleChange} type="button" name="operator" value="-" className="global"/>
        </div>
        <div className="conflict">
          <div className="left">
            <input onClick={handleChange} type="button" name="num" value="0" className=" big"/>
            <input onClick={handleChange} type="button" name="num" value="." className=" small"/>
            <input onClick={handleChange} type="button" name="clear" value="Clear" className=" red small white-text top-margin"/>
            <input onClick={handleChange} type="button" name="answer" value="=" className=" green white-text big top-margin"/>
          </div>
          <div className="right">
            <input onClick={handleChange} type="button" name="operator" value="+" className="global grey plus"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
