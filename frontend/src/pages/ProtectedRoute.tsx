import { useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../redux/store/store";

interface Props {
  onUnAuthPath: string;
}

const ProtectedRoute: React.FC<Props> = ({ onUnAuthPath }) => {
  const { activeUser } = useSelector((state: RootState) => state.user);

  if (!activeUser) return (
    <Navigate to={onUnAuthPath} />
  );
  return (
    <Outlet />
  );
};

export default ProtectedRoute;
