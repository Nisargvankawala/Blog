import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";


function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/write" element={user ? <Write /> : <Login />} />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route exact path="/register" element={user ? <Home /> : <Register />} />
        <Route exact path="/setting" element={user ? <Setting /> : <Login />} />
        <Route exact path="/post/:postId" element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
