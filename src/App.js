import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [calValue, updateValue] = useState('0');

  const handleClick = (value) => {
    if (value === 'AC') { // Changed 'c' to 'AC'
      updateValue('0');
    } else if (calValue === 'Error' && value !== 'AC') { // Allow AC to clear Error
      updateValue(value === '=' ? 'Error' : value); // If Error, only allow new number input or AC
    }
    else if (value === '=') {
      try {
        // Replace display operators with JS evaluable operators
        const evaluableExpression = calValue.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
        updateValue(eval(evaluableExpression).toString());
      } catch (error) {
        updateValue('Error');
      }
    } else if (calValue === '0' && value !== 'AC') { // Prevent leading zeros unless it's the only digit
      updateValue(value);
    } else {
      // Prevent multiple operators, or leading operator if not minus
      const lastChar = calValue.slice(-1);
      const operators = ['÷', '×', '−', '+'];
      if (operators.includes(value) && operators.includes(lastChar)) {
        updateValue(calValue.slice(0, -1) + value); // Replace last operator
      } else {
        updateValue(calValue + value);
      }
    }
  };

  const handleKeyPress = (event) => {
    let key = event.key;
    if (key === 'Enter') key = '=';
    if (key === 'Escape') key = 'AC';
    if (key === '/') key = '÷';
    if (key === '*') key = '×';
    // No direct key for '−', usually '-' is fine for input.
    if (/[0-9+\-÷×=]|AC/.test(key) || (key === 'c' && handleClick('AC'))) { // map 'c' key to AC
      if (key === 'c') handleClick('AC');
      else handleClick(key);
    }
  };

  return (
    <div tabIndex="0" onKeyDown={handleKeyPress}>
    {/* <h1 style={{marginLeft:600}}>Calculator</h1>  Removed title as it's not in iOS calc */ }
    <div className="container2">
      <table>
        <tbody>
          <tr className="display">
            <td colSpan={4}>{calValue}</td> {/* Display spans all 4 columns */}
          </tr>
          {/* Row 1: AC, (empty), (empty), ÷ */}
          <tr>
            <td><button className="special" onClick={() => handleClick('AC')}>AC</button></td>
            <td></td> {/* Placeholder for future +/- */}
            <td></td> {/* Placeholder for future % */}
            <td><button className="operator" onClick={() => handleClick('÷')}>÷</button></td>
          </tr>
          {/* Row 2: 7, 8, 9, × */}
          <tr>
            <td><button onClick={() => handleClick('7')}>7</button></td>
            <td><button onClick={() => handleClick('8')}>8</button></td>
            <td><button onClick={() => handleClick('9')}>9</button></td>
            <td><button className="operator" onClick={() => handleClick('×')}>×</button></td>
          </tr>
          {/* Row 3: 4, 5, 6, − */}
          <tr>
            <td><button onClick={() => handleClick('4')}>4</button></td>
            <td><button onClick={() => handleClick('5')}>5</button></td>
            <td><button onClick={() => handleClick('6')}>6</button></td>
            <td><button className="operator" onClick={() => handleClick('−')}>−</button></td>
          </tr>
          {/* Row 4: 1, 2, 3, + */}
          <tr>
            <td><button onClick={() => handleClick('1')}>1</button></td>
            <td><button onClick={() => handleClick('2')}>2</button></td>
            <td><button onClick={() => handleClick('3')}>3</button></td>
            <td><button className="operator" onClick={() => handleClick('+')}>+</button></td>
          </tr>
          {/* Row 5: 0, (empty), = */}
          <tr>
            <td colSpan={2}><button className="button-zero" onClick={() => handleClick('0')}>0</button></td>
            <td></td> {/* Placeholder for future . (dot) */}
            <td colSpan={1}><button className="operator" onClick={() => handleClick('=')}>=</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;
