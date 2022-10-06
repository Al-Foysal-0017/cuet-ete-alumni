import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useSelector((state: any) => state.user);
  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
