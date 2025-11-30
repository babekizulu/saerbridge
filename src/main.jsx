//libs
import { createRoot } from "react-dom/client";
//components
import App from './App';
//dom elements
const container = document.querySelector('#root');
const root = createRoot(container);
//styles
import './scss/main.scss';
//render
root.render(<App/>);