import express from "express";
import userRoutes from "./user.route";
import formRoutes from "./form.route";
import responseRoutes from "./response.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/forms",
    route: formRoutes,
  },
  {
    path: "/response",
    route: responseRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
