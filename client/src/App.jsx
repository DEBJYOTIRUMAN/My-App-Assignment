import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AfterLogin from "./pages/AfterLogin";
import Redirect from "./pages/Redirect";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { MyAppContext } from "./MyAppContext";
import { useEffect, useState } from "react";
import { getUser, storeUser } from "./storage";

function App() {
  const [user, setUser] = useState({});

  // Fetch User From Local Storage
  useEffect(() => {
    getUser().then((user) => {
      if (!user) {
        return;
      }
      setUser(JSON.parse(user));
    });
  }, []);
  // Store User Local Storage
  useEffect(() => {
    if (!user._id) return;
    storeUser(user);
  }, [user]);

  return (
    <Router>
      <MyAppContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/after_login" element={<AfterLogin />} />
          <Route path="/redirect/:token" element={<Redirect />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </MyAppContext.Provider>
    </Router>
  );
}

export default App;
