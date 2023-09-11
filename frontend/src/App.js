import React, { useState } from 'react';
import axios from 'axios';

function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrencies, setToCurrencies] = useState(['EUR', 'GBP']);
  const [convertedAmounts, setConvertedAmounts] = useState([]);

  const convertCurrency = async () => {
    try {
      const response = await axios.post('/convert', {
        amount,
        fromCurrency,
        toCurrencies,
      });

      setConvertedAmounts(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          From Currency:
          <input type="text" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          To Currencies (comma-separated):
          <input
            type="text"
            value={toCurrencies.join(',')}
            onChange={(e) => setToCurrencies(e.target.value.split(','))}
          />
        </label>
      </div>
      <button onClick={convertCurrency}>Convert</button>
      <div>
        <h2>Converted Amounts:</h2>
        <ul>
          {convertedAmounts.map((conversion, index) => (
            <li key={index}>
              {conversion.amount} {conversion.fromCurrency} =&gt; {conversion.convertedAmount} {conversion.toCurrency}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CurrencyConverter;
