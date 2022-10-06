import { Route } from "react-router-dom";

const PublicRoute = ({ element, path }: any) => {
  return <Route path={path} element />;
};

export default PublicRoute;
