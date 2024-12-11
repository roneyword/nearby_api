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

// src/controllers/markets-controller.ts
var markets_controller_exports = {};
__export(markets_controller_exports, {
  MarketsController: () => MarketsController
});
module.exports = __toCommonJS(markets_controller_exports);

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/markets-controller.ts
var import_zod = require("zod");
var MarketsController = class {
  async index(request, response, next) {
    try {
      const paramsSchema = import_zod.z.object({
        category_id: import_zod.z.string().uuid()
      });
      const { category_id } = paramsSchema.parse(request.params);
      const markets = await prisma.market.findMany({
        where: { categoryId: category_id },
        orderBy: { name: "asc" }
      });
      return response.json(markets);
    } catch (error) {
      next(error);
    }
  }
  async show(request, response, next) {
    try {
      const paramsSchema = import_zod.z.object({
        id: import_zod.z.string().uuid()
      });
      const { id } = paramsSchema.parse(request.params);
      const markets = await prisma.market.findUnique({
        where: { id },
        include: {
          rules: true
        }
      });
      return response.json(markets);
    } catch (error) {
      next(error);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarketsController
});
