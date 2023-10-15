import express from "express";
import authRoutes from "./auth.route";
import formRoutes from "./form.route";
import responseRoutes from "./response.route";
import userRoutes from "./user.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/forms",
    route: formRoutes,
  },
  {
    path: "/responses",
    route: responseRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
