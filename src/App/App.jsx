import { RouterProvider } from "react-router-dom";
import { route } from "../routes/route.jsx";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <RouterProvider router={route} />
            <ToastContainer
                position="bottom-right"
                newestOnTop={true}
                autoClose={2000}
            />    </>
    );
}

export default App;
