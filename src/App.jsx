import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Header />}></Route>
          <Route path="/" element={<Navigate to="/sign-up"></Navigate>} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
