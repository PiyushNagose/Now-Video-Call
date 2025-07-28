import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();

    const isAuthenticated = () => {
      return !!localStorage.getItem("token");
    };

    useEffect(() => {
      if (!isAuthenticated()) {
        navigate("/authentication");
      }
    }, [navigate]);

    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
