import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
//setup redux toolkit
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
//i18
import './i18n';
//Cấu hình realtime (websocket với signalR)
import * as signalR from '@aspnet/signalr'
import { DOMAIN } from './util/settings/config';
//Đoạn code để kết nối đến server lắng nghe sự kiện từ server
const root = ReactDOM.createRoot(document.getElementById('root'));

export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();


connection.start().then(() => {
  root.render(
      <Provider store={store}>
        <App />
      </Provider>
  );
}).catch(error => {
  alert(error.response.data.message +', '+ error.response.data.content);
})
reportWebVitals();
