import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import './style.scss';
import './assets/fonts/Roboto-Regular.ttf';
import './assets/fonts/Roboto-Light.ttf';
import './assets/fonts/Roboto-Medium.ttf';
import './assets/fonts/Comfortaa-Regular.ttf';
import './assets/images/Clouds.png';
import App from './App'
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
        <AuthProvider>
            <Router>
                <App/>
            </Router>
        </AuthProvider>,
     document.getElementById('root'));

