import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FirebaseProvider from './components/FirebaseProvider';
import {Routes, Route, HashRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/women"
          element={
            <FirebaseProvider men={false}>
              <App />
            </FirebaseProvider>
          }
        ></Route>
        <Route
          path="*"
          element={
            <FirebaseProvider men>
              <App />
            </FirebaseProvider>
          }
        ></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
