import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Login from "./pages/Login";
import Search from "./pages/Search";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <Home /> },
        { path: "/info", element: <Home /> },
        { path: "/coolstuff", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/search", element: <Search /> },
        { path: "/search/:id", element: <Search /> },
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
