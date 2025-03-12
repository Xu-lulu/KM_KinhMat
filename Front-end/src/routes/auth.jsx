import Login from "../components/auth/Login";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";

import Register from "../components/auth/Register";
// import Blog from "../components/auth/test";
const AuthRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default AuthRoute;
