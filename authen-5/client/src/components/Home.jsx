import { Outlet } from "react-router-dom";
import Register from "./Register";
import Header from "../layout/Header";

const Home = () => {
    return (
        <div>
           <Header></Header>
           <h1>Home page</h1>
           <Outlet></Outlet> 
        </div>
    );
};

export default Home;