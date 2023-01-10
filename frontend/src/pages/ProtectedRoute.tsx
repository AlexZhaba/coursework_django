import { useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../App"
import { RootState } from "../redux/store/store";

interface Props {
  onUnAuthPath: string;
}

const ProtectedRoute: React.FC<Props> = ({ onUnAuthPath }) => {
  const { user } = useContext(AppContext);
  const { activeUser } = useSelector((state: RootState) => state.user);

  if (!(user || activeUser)) return (
    <Navigate to={onUnAuthPath} />
  );
  return (
    <Outlet />
  );
};

export default ProtectedRoute;
