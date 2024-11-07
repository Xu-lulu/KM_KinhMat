// import React, { useState } from "react";
// import "./test.scss";
// import anh1 from "../../assets/auth/earth.jpg";
// import anh2 from "../../assets/auth/mars.jpg";
// import { useDispatch } from "react-redux";
// import { useNavigate, NavLink } from "react-router-dom";
// import { loginUser, registerUser } from "../../redux/api/apiRequest";
// import Lottie from "lottie-react";
// import login from "../../assets/animation/Khunglong.json";
// export default function Blog() {
//   const [searchActive, setSearchActive] = useState(false);
//   const [username, setusername] = useState("");
//   const [password, setpassword] = useState("");
//   const [usernameRegister, setusernameRegister] = useState("");
//   const [passwordRegister, setpasswordRegister] = useState("");
//   const [email, setemail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleOnclickLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = {
//       username: username,
//       password: password,
//     };

//     try {
//       await loginUser(dispatch, data, navigate);
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOnclickRegister = async (e) => {
//     e.preventDefault();
//     const dataRegister = {
//       username: usernameRegister,
//       password: passwordRegister,
//       email: email,
//     };
//     console.log(dataRegister)
//     registerUser(dispatch, dataRegister, navigate);
//   };
//   return (
//     <>
//       <section className={`${searchActive ? "active" : ""}`}>
//         <div className={`container ${searchActive ? "active" : ""}`}>
//           <div className="flip">
//             <div className="user signinBx">
//               <div className="imgBx">
//                 <img src={anh1} />
//                 {/* <Lottie
//                   className="Login-left-form__animation"
//                   animationData={login}
//                   loop={true}
//                 /> */}
//               </div>
//               <div className="formBx">
//                 <form onSubmit={handleOnclickLogin}>
//                   <h2>Sign In</h2>
//                   <div className="mb-3">
//                     <label htmlFor="exampleInputEmail1" className="form-label">
//                       Tên người dùng
//                     </label>
//                     <input
//                       autoComplete="username"
//                       type="text"
//                       className="form-control"
//                       id="exampleInputEmail1"
//                       aria-describedby="emailHelp"
//                       onChange={(e) => setusername(e.target.value)}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label
//                       htmlFor="exampleInputPassword1"
//                       className="form-label"
//                     >
//                       Password
//                     </label>
//                     <input
//                       autoComplete="current-password"
//                       type="password"
//                       className="form-control"
//                       id="exampleInputPassword1"
//                       onChange={(e) => setpassword(e.target.value)}
//                     />
//                   </div>
//                   <div className="mb-3 ">
//                     <a href="">Quên mật khẩu?</a>
//                   </div>
//                   <div className="btn-login">
//                     <button
//                       type="submit"
//                       className="btn btn-primary signin"
//                       onClick={handleOnclickLogin}
//                     >
//                       Đăng nhập
//                     </button>
//                   </div>
//                   <div className="No-acc">
//                     <p>Bạn chưa có tài khoản? </p>
//                     <a
//                       className="signin"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setSearchActive(!searchActive);
//                       }}
//                     >
//                       Đăng ký
//                     </a>
//                   </div>
//                 </form>
//               </div>
//             </div>
//             <div className="user signupBx">
//               <div className="formBx">
//                 <form onSubmit={handleOnclickRegister}>
//                   <div className="mb-3">
//                     <h2>Sign Up</h2>

//                     <label htmlFor="exampleInputEmail1" className="form-label">
//                       Tên người dùng
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="exampleInputEmail1"
//                       autoComplete="username"
//                       onChange={(e) => setusernameRegister(e.target.value)}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label
//                       htmlFor="exampleInputPassword1"
//                       className="form-label"
//                     >
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       id="exampleInputPassword1"
//                       autoComplete="current-password"
//                       onChange={(e) => setpasswordRegister(e.target.value)}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="exampleInputEmail1" className="form-label">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="exampleInputEmail1"
//                       aria-describedby="emailHelp"
//                       autoComplete="email"
//                       onChange={(e) => setemail(e.target.value)}
//                     />
//                   </div>
//                   <div className="btn-register">
//                     <button
//                       type="submit"
//                       className="btn btn-primary signup"
//                       onClick={ handleOnclickRegister }
//                     >
//                       Đăng ký
//                     </button>
//                   </div>
//                   <div className="Comeback">
//                     <p>Quay lại đăng nhập </p>
//                     <a
//                       className="signup"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setSearchActive(!searchActive);
//                       }}
//                     >
//                       Đăng Nhập
//                     </a>
//                   </div>
//                 </form>
//               </div>
//               <div className="imgBx">
//                 <img src={anh2} alt="signup" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div></div>
//     </>
//   );
// }
