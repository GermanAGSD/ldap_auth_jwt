import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Импортируем компонент App
import { BrowserRouter as Router } from 'react-router-dom'; // Для маршрутизации

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root') // Отображаем компонент на элементе с id "root"
);
