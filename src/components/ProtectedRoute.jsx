import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>; // wait until login check

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;

