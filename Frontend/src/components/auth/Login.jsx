import { useContext, useState } from "react";
import "./auth.scss";
import { useNavigate, NavLink } from "react-router-dom";
import login from "../../assets/animation/Hello.json";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import { CartContext } from "../../Contexts/CartContext";
import { loginUser } from "../../redux/api/apiRequest";
import { SpinLoad } from "../../common/loading";
import Lottie from "lottie-react";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const { datalogin, setdatalogin } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnclickLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      username: username,
      password: password,
    };

    try {
      await loginUser(dispatch, data, navigate);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="Login">
        <div className="Background-Left">
          <div className="Login-left-form">
            {/* <h1>Food Love</h1>
            <p>Đăng nhập</p> */}
            <Lottie
              className="Login-left-form__animation"
              animationData={login}
              loop={true}
            />
            <div className="Login-left-form-input">
              <form onSubmit={handleOnclickLogin}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Tên người dùng
                  </label>
                  <input
                    autoComplete="username"
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    autoComplete="current-password"
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="mb-3 ">
                  <a href="">Quên mật khẩu?</a>
                </div>
                <div className="btn-login">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleOnclickLogin}
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
              <div className="Register-btn">
                <p>Chưa có tài khoản ?</p>
                <NavLink to="/Register">Đăng ký</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="Background-Right"></div>
      </div>
      {loading && <SpinLoad />}
    </>
  );
};
export default Login;
