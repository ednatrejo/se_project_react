import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, loggedIn, isLoggedInLoading, ...props }) {
  return isLoggedInLoading ? null : (
    <Route {...props}>{loggedIn ? children : <Redirect to={"/login"} />}</Route>
  );
}

export default ProtectedRoute;
