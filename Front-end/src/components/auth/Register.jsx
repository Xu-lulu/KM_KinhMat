import { useNavigate, NavLink } from "react-router-dom";
import "./auth.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import { registerUser } from "../../redux/api/apiRequest";
const Register = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnclickRegister = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
    };
    registerUser(dispatch, data, navigate);
  };
  return (
    <>
      <div className="Register">
        <div className="Background-Left">
          <div className="Register-left-form">
            <h1>Food Love</h1>
            <p>Đăng Ký</p>
            <div className="Register-left-form-input">
              <form onSubmit={handleOnclickRegister}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Tên người dùng
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    autoComplete="username"
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    autoComplete="current-password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    autoComplete="email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="btn-register">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    // onClick={handleOnclickRegister}
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
              <div className="Register-btn">
                <p>Đã có tài khoản ?</p>
                <NavLink to="/Login"> Đăng nhập</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="Background-Right"></div>
      </div>
    </>
  );
};

export default Register;
