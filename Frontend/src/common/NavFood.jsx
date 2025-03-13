import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbars from "../components/Navbars/Navbars";
import {
  NavbarAdmin,
} from "../components/Navbars/NavbarAdmin";
export const NavbarFood = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/Login" || location.pathname === "/Register" ? (
        <div hidden>
          <Navbars />
        </div>
      ) : (
        <Navbars />
      )}{" "}
    </>
  );
};

export const FooterFood = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/Login" || location.pathname === "/Register" ? (
        <div className="Footer" hidden>
          <Footer />
        </div>
      ) : (
        <div className="Footer">
          <Footer />
        </div>
      )}{" "}
    </>
  );
};
export const NavbarAdminHidden = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/Login" || location.pathname === "/Register" ? (
        <div className="NavbarAdmin" hidden>
          <NavbarAdmin />
        </div>
      ) : (
        <div className="NavbarAdmin">
          <NavbarAdmin />
        </div>
      )}{" "}
    </>
  );
};
export const NavbarAdminLogoutHidden = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/Login" || location.pathname === "/Register" ? (
        <div hidden>
          <NavbarAdmin />
        </div>
      ) : (
        <div>
          <NavbarAdmin />
        </div>
      )}{" "}
    </>
  );
};
export const NotFoundNavBar = () => {
  return (
    <div hidden>
      <Navbars />
    </div>
  );
};

export const NotFoundFooter = () => {
  return (
    <div className="Footer" hidden>
      <Footer />
    </div>
  );
};
