import { Outlet } from "react-router";
import "./App.css";
import AppContainer from "./ui/AppBody";
import Footer from "./ui/footer";

import Nav from "./ui/nav";

function App() {
  return (
    <>
      <AppContainer>
        <Nav></Nav>
        <Outlet></Outlet>
        <Footer></Footer>
      </AppContainer>
    </>
  );
}

export default App;
