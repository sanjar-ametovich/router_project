import Nav from "./pages/Nav/Nav.jsx";
import './App.scss'
import MainPage from "./pages/MainPage/MainPage.jsx";
import {BrowserRouter as Router, Routes} from "react-router-dom";
import {Route} from "react-router";
import Checkout from "./pages/Checkout/Checkout.jsx";
const App = () => {
    return (
        <div className={'app'}>
            <Nav/>
            <Router>
                <Routes>
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/checkout'} element={<Checkout/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;