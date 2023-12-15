import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import React, { useEffect } from "react";

const Products = React.lazy(() => import("../pages/product/index.jsx"));

const RedirectToDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/detail/1");
  }, [navigate]);

  return null;
};

function AppRouter() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<RedirectToDetails />} />
          <Route path="/detail/:id" element={<Products />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default AppRouter;
