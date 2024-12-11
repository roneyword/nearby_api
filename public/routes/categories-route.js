"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/categories-route.ts
var categories_route_exports = {};
__export(categories_route_exports, {
  categoriesRoutes: () => categoriesRoutes
});
module.exports = __toCommonJS(categories_route_exports);
var import_express = require("express");

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/categories-controller.ts
var CategoriesController = class {
  async index(request, response, next) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: "asc" }
      });
      return response.json(categories);
    } catch (error) {
      next(error);
    }
  }
};

// src/routes/categories-route.ts
var categoriesRoutes = (0, import_express.Router)();
var categoriesController = new CategoriesController();
categoriesRoutes.get("/", categoriesController.index);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  categoriesRoutes
});
