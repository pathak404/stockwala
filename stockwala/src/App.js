import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import Home from "./Components/Home/Home";
import Statistics from "./Components/Statistics/Statistics";
import Page from "./Page";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Page Component={<Home />} />} path="/" />
        <Route element={<Page Component={<Statistics />} />} path="/:symbol" />
      </>
    )
  )


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  );
}

export default App;
