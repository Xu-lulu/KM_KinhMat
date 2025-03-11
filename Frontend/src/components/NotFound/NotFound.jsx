import Lottie from "lottie-react";
import notfound from "../../assets/animation/NotFound404.json";
import "./NotFound.scss"
const NotFound = () => {
  return (
    <>
      <Lottie style={{height: "100vh"} } animationData={notfound} loop={true} className="not_found"/>;
    </>
  );
};
export default NotFound;
