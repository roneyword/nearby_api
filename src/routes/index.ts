import { Router } from "express";

import { categoriesRoutes } from "./categories-route";
import { couponsRoutes } from "./coupons-route";
import { marketsRoutes } from "./markets-route";

const routes = Router();
routes.use("/categories", categoriesRoutes);
routes.use("/markets", marketsRoutes);
routes.use("/coupons", couponsRoutes);

export { routes };
