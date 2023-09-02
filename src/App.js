import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [calValue, updateValue] = useState('0');

  const handleClick = (value) => {
    if (calValue === 'Error') {
      updateValue('0');
    } 
    else if (value === '=') {
      try {
        updateValue(eval(calValue).toString());
      } catch (error) {
        updateValue('Error');
      }
    } else if (value === 'c') {
      if (calValue === '0') {
        updateValue('0');
      } else {
        updateValue('0');
      }
    } else if (calValue === '0') {
      updateValue(value);
    } else {
      updateValue(calValue + value);
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key;
    if (/[0-9+\-*/=c]/.test(key)) {
      handleClick(key);
    }
  };

  return (
    <div tabIndex="0" onKeyDown={handleKeyPress}>
    <h1 style={{marginLeft:600}}>Calculator</h1>
    <div className="container2">
      
      <table>
        <tbody>
          <tr className="display">
            <td colSpan={4}>{calValue}</td>
          </tr>
          <tr>
            <td><button onClick={() => handleClick('7')}>7</button></td>
            <td><button onClick={() => handleClick('8')}>8</button></td>
            <td><button onClick={() => handleClick('9')}>9</button></td>
            <td><button onClick={() => handleClick('c')}>c</button></td>
          </tr>
          <tr>
            <td><button onClick={() => handleClick('4')}>4</button></td>
            <td><button onClick={() => handleClick('5')}>5</button></td>
            <td><button onClick={() => handleClick('6')}>6</button></td>
            <td><button className ='operator' onClick={() => handleClick('/')}>/</button></td>
          </tr>
          <tr>
            <td><button onClick={() => handleClick('1')}>1</button></td>
            <td><button onClick={() => handleClick('2')}>2</button></td>
            <td><button onClick={() => handleClick('3')}>3</button></td>
            <td><button class='operator' onClick={() => handleClick('*')}>*</button></td>
          </tr>
          <tr>
            <td><button class='operator'  onClick={() => handleClick('+')}>+</button></td>
            <td><button onClick={() => handleClick('0')}>0</button></td>
            <td><button class='operator' onClick={() => handleClick('-')}>-</button></td>
            <td><button class='special' onClick={() => handleClick('=')}>=</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;
