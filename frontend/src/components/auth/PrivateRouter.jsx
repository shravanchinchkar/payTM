

// import { useRecoilValue } from "recoil";
// import { isAuthenticated } from "../../store/atoms/isAuth";
// import { Navigate } from "react-router-dom";

// export function PrivateRouter({ children }) {
//   console.log("PrivateRouter Mounted!");
//   const isAuth = useRecoilValue(isAuthenticated);
//   if (isAuth === null) {
//     console.log("value of isAuth in PrivateRoute:", isAuth);
//     return children
//   } else if(isAuth!==null) {
//     console.log("value of isAuth in children PrivateRoute:", isAuth);
//     console.log("Childreeennn");
//     return children;
//   // }else if (isAuth!=null and the user routes to /signin even when he is signedin how to stop him from redirecting to /signin)
// }


import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../../store/atoms/isAuth";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRouter({ children }) {
  console.log("PrivateRouter Mounted!");
  const isAuth = useRecoilValue(isAuthenticated);
  const location = useLocation(); // Get the current route
  
  console.log("value of isAuth in PrivateRoute:", isAuth);

  if (isAuth === null) {
    if(location.pathname==="/send"){
      console.log("User is not authenticated, redirecting to /")
      return <Navigate to="/"/>
    }
    // User is not authenticated, allow them to access the route
    return children;
  } else if (isAuth !== null) {
    if (location.pathname === "/signin") {
      // Redirect signed-in users away from the signin page
      console.log("User is already authenticated, redirecting to /dashboard");
      return <Navigate to="/dashboard" />;
    }
    console.log("value of isAuth in children PrivateRoute:", isAuth);
    console.log("Childreeennn");
    return children;
  }
}

