import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import './style.scss';
import './assets/fonts/Roboto-Regular.ttf';
import './assets/fonts/Roboto-Light.ttf';
import './assets/fonts/Roboto-Medium.ttf';
import './assets/fonts/Comfortaa-Regular.ttf';
import './assets/images/Clouds.png';
import App from './App'
import { AuthProvider } from './Auth';
import { FirebaseProvider } from './firebase'

ReactDOM.render(
    <FirebaseProvider>
        <AuthProvider>
            <Router>
                <App/>
            </Router>
        </AuthProvider>
    </FirebaseProvider>,
     document.getElementById('root'));

