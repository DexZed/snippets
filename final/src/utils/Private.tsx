import { useLocation, Navigate } from "react-router";
import { useAuthContext } from "../contexts/context";




interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  
  // const authContext = useContext(AuthContext);

  // // Check for null
  // if (!authContext) {
  //   throw new Error("AuthContext must be used within an AuthProvider");
  // }
  
   const { currentUser } = useAuthContext(); // change for different purposes
  const location = useLocation();

  return currentUser ? (
    <>{children}</>
  ) : (
    <Navigate to="/signIn" state={{ from: location }} replace />
  );
};