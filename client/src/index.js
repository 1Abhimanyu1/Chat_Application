/*
import React from "react";
import ReactDOM from "react-dom";

import App from './App';

ReactDOM.render(<App/>,document.querySelector('#root'));
*/

import React from "react";
import ReactDOM from 'react-dom/client'; // Notice the /client import
import App from './App';

/*
// This is the old code for React 17 and earlier.
// It uses ReactDOM.render(), which is not a function in React 18.
import ReactDOM from "react-dom";
ReactDOM.render(<App/>,document.querySelector('#root'));
*/

// This is the correct code for React 18.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);