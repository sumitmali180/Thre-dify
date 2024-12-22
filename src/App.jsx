import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import CategoriesPreference from './container/CategoriesPreference';
import PostsData from './container/PostsData';
import NavbarForApp from './container/NavbarForApp';
import LoginSignup from './container/LoginSignup';
import ContactUS from './container/ContactUS';
import { Profile } from './container/Profile';
import Thread from './container/Thread';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });

  const handleLogin = (status, data) => {
    setLoggedIn(status);
    setUserData(data);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserData({ name: "", email: "" });
  };

  return (
    <>
      <NavbarForApp loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<PostsData />} />
        <Route path="/category" element={<CategoriesPreference />} />
        <Route path="/contactus" element={<ContactUS />} />
        <Route path="/thread" element={<Thread />} />
        <Route path="/loginSignUp" element={<LoginSignup onLogin={handleLogin} />} />
        <Route
          path="/profile"
          element={<Profile name={userData.name} email={userData.email} onLogout={handleLogout} />}
        />
      </Routes>
    </>
  );
}

export default App;
