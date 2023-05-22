import logo from './logo.svg';
import './App.css';
import ReactDom from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginPage/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
