import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import './style.css';
import './assets/fonts/Roboto-Regular.ttf';
import './assets/fonts/Roboto-Light.ttf';
import './assets/fonts/Roboto-Medium.ttf';
import './assets/fonts/Comfortaa-Regular.ttf';
import './assets/images/Clouds.png';
import App from './App'

ReactDOM.render(<Router>
    <App/>
</Router>, document.getElementById('root'));

