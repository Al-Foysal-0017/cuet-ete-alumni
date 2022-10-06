import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ToSetProfileRoute = ({ children }: any) => {
  const { user } = useSelector((state: any) => state.user);
  if (user) {
    return <Navigate to="/set/profile" replace />;
  }

  return children;
};

export default ToSetProfileRoute;
