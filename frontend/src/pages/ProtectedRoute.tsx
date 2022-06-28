import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../App"

interface Props {
  onUnAuthPath: string;
}

const ProtectedRoute: React.FC<Props> = ({ onUnAuthPath }) => {
  const { user } = useContext(AppContext);
  console.log('user=',user);
  console.log(onUnAuthPath);
  if (!user) return (
    <Navigate to={onUnAuthPath} />
  );
  return (
    <Outlet />
  );
};

export default ProtectedRoute;
