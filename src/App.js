//import "./App.css";
import Homepage from "./Pages/Homepage";
import SignUp from "./Pages/SignUp";
import Verification from "./Pages/Verification";
import LogIn from "./Pages/LogIn";
import ViewVid from "./Pages/View/ViewVid";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
//import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <Box w="100%" h="100vh" className="App" bg="blue.200">
      <Routes>
        <Route path="/" exact element={<Homepage />}></Route>
        <Route path="/register" exact element={<SignUp />}></Route>
        <Route path="/login" exact element={<LogIn />}></Route>
        <Route path="/verification" exact element={<Verification />}></Route>
        <Route path="/view/:fileId" exact element={<ViewVid />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
