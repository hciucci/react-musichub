// Layout.js
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import './css/Layout.css';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <footer>
                <p>This is my footer</p>
            </footer>
        </>
    );
};

export default Layout;
