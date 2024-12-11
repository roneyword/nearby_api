"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/coupons-route.ts
var coupons_route_exports = {};
__export(coupons_route_exports, {
  couponsRoutes: () => couponsRoutes
});
module.exports = __toCommonJS(coupons_route_exports);
var import_express = require("express");

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/controllers/coupons-controller.ts
var import_node_crypto = __toESM(require("crypto"));
var import_zod = require("zod");
var CouponsController = class {
  async update(request, response, next) {
    try {
      const paramsSchema = import_zod.z.object({
        market_id: import_zod.z.string().uuid()
      });
      const { market_id } = paramsSchema.parse(request.params);
      const market = await prisma.market.findUnique({
        where: { id: market_id }
      });
      if (!market) {
        throw new AppError("Estabelecimento n\xE3o encontrado!", 404);
      }
      if (market.coupons <= 0) {
        throw new AppError("N\xE3o h\xE1 cupom dispon\xEDvel no momento!");
      }
      await prisma.market.update({
        data: { coupons: { decrement: 1 } },
        where: { id: market_id }
      });
      const coupon = import_node_crypto.default.createHash("sha256").update(market.id).digest("hex").substring(0, 8).toUpperCase();
      return response.json({ coupon });
    } catch (error) {
      next(error);
    }
  }
};

// src/routes/coupons-route.ts
var couponsRoutes = (0, import_express.Router)();
var couponsController = new CouponsController();
couponsRoutes.patch("/:market_id", couponsController.update);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  couponsRoutes
});
