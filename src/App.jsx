import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { Layout } from "./components/Layout";
import { Loginpage } from "./pages/Loginpage";
import { Errorpage } from "./pages/Errorpage";
import { Registrationpage } from "./pages/Registrationpage.jsx";
import { UserProfilepage } from "./pages/UserProfilepage";
import { Profilepage } from "./pages/Profilepage";
import { Eventspage } from "./pages/Eventspage";
import { EventProfilepage } from "./pages/EventProfilepage";
import { RequireAuth } from "./hoc/RequireAuth";
import { checkUser } from "./redux/slices/authSlice";
import { CreateEventPage } from "./pages/CreateEventpage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="*" element={<Errorpage />} />
      <Route index path="/" element={<Navigate to="events" replace />} />
      <Route
        path="login"
        element={<Loginpage />}
        errorElement={<Errorpage />}
      />
      <Route
        path="registration"
        element={<Registrationpage />}
        errorElement={<Errorpage />}
      />
      <Route path="profile/:id" element={<Profilepage />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <UserProfilepage />
          </RequireAuth>
        }
        errorElement={<Errorpage />}
      />
      <Route
        path="event/:id"
        element={<EventProfilepage />}
        //errorElement={<Errorpage />}
      />
      <Route path="events" element={<Eventspage />} />
      <Route
        path="create-event"
        element={
          <RequireAuth>
            <CreateEventPage />
          </RequireAuth>
        }
      />
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkUser());
    }
  }, [dispatch]);
  return <RouterProvider router={router} />;
};

export default App;
