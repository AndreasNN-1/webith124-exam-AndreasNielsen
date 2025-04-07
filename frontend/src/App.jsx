import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Login from "./pages/Login";
import Rumfærgen from "./pages/Rumfærgen";
import Ture from "./pages/Ture";
import Galleri from "./pages/Galleri";
import Sikkerhed from "./pages/Sikkerhed";
import Kontakt from "./pages/Kontakt";
import UdvalgtTur from "./pages/UdvalgtTur";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/rumfærgen", element: <Rumfærgen /> },
        { path: "/ture", element: <Ture /> },
        { path: "/ture/:id", element: <UdvalgtTur /> },
        { path: "/galleri", element: <Galleri /> },
        { path: "/sikkerhed", element: <Sikkerhed /> },
        { path: "/kontakt", element: <Kontakt /> },
        { path: "/login", element: <Login /> },
      ],
    },
    {
      element: <LayoutAdmin />,
      errorElement: <PageNotFound />,
      children: [
        { path: "/admin/dashboard", element: <HomeAdmin /> },
        { path: "/admin/info", element: <HomeAdmin /> },
        { path: "/admin/account", element: <HomeAdmin /> },
        { path: "/admin/settings", element: <HomeAdmin /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
