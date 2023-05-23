import './App.css';
import ReactDom from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginPage/>}></Route>
        <Route path = "/signup" element = {<SignUpPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
