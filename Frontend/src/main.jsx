import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PersistGate } from "redux-persist/integration/react";
import {Provider} from 'react-redux'
import { store } from './redux/store.jsx'
import {persistor } from "./redux/store.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </PersistGate>
  </Provider>
)
