import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const AuthRoute = () => {
  /***Authentication check
   * Currently this block has no effect
   * ***/
  const navigate = useNavigate();
  const isAuthenticated = true;
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  /**********************/

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default AuthRoute;
