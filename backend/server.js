const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Currency Converter API');
});

app.post('/convert', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;
  let x=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`
  // console.log(x);
  try {
    const response = await axios.get(
      // `https://api.example.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      // Replace 'https://api.example.com/convert' with the actual API endpoint
      x
    );
    
    const data = response.data; // Parse the response data
    console.log(toCurrency);
    
    console.log(data.toCurrency);
    // res.json(data); // Send the data as a response to the client
    res.json({
      success: true,
      amount: amount,
      // Include the conversion data in the response if needed
      from: fromCurrency,
      exchangeValue: [
        {
          to: toCurrency,
          value: amount ,
        },
      ],
    });
  }  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Currency conversion failed' });
  }
  // console.log(x);
});
  const port =  7850;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
