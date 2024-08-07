import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Reportstatistics from "pages/Reportstatistics";
import Loginpage from "pages/Loginpage";
import Dashboard from "pages/Dashboard";
import Orders from "pages/Orders";
import TwentyTwo from "pages/TwentyTwo";
import Instock from "pages/Instock";
import InstockTwo from "pages/InstockTwo";

const ProjectRoutes = () => {
  let element = useRoutes([
    {path: "/", element: <Home />},
    {path: "*", element: <NotFound />},
    {
      path: "reportstatistics",
      element:<Reportstatistics/>,
    },
    {
      path: "loginpage",
      element:<Loginpage/>,
    },
    {
      path: "dashboard",
      element:<Dashboard/>,
    },
    {
      path: "orders",
      element:<Orders/>,
    },
    {
      path: "twentytwo",
      element:<TwentyTwo/>,
    },
    {
      path: "instock",
      element:<Instock/>,
    },
    {
      path: "instocktwo",
      element:<InstockTwo/>,
    },
  ]);

  return element;
};

export default ProjectRoutes;