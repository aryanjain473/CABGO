import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import Riding from "./pages/Riding";
import { UserLogout } from "./pages/UserLogout";
import Home from "./pages/Home";
import CaptainHome from "./pages/CaptainHome";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />

  <Route path='/user/logout' element={<UserProtectWrapper>
    <UserLogout />

  </UserProtectWrapper>
} />

        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />  
      </Routes>
    </div>
  );
};

export default App;
