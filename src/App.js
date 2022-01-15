import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./components/Login/Login.js";
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" exact element={<Login/>}></Route>
                    <Route path="/home" element={<Home/>}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
