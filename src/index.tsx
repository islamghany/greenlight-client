import React from 'react';
import { render } from 'react-dom';
import '@babel/polyfill';
import App from '@/App';
import './styles/style.css';

const container = document.querySelector('#root');
render(<App />, container);
