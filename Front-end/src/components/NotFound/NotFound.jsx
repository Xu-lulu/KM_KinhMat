import Lottie from "lottie-react";
import notfound from "../../assets/animation/NotFound404.json";
const NotFound = () => {
  return (
    <>
      <Lottie style={{height: "100vh"}} animationData={notfound} loop={true} />;
    </>
  );
};
export default NotFound;
