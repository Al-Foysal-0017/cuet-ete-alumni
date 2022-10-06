import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }: any) => {
  const { user } = useSelector((state: any) => state.user);

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
