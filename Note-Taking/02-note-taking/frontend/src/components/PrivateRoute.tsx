import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: ReactNode }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to={"/login"} />
    }

    return children;
}

export default PrivateRoute;