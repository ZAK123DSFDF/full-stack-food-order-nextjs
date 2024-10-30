"use strict";
"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAbilitiesFor = defineAbilitiesFor;
var All_1 = require("@/classes/All");
var OrderHistory_1 = require("@/classes/OrderHistory");
var enum_1 = require("@/utils/enum");
var ability_1 = require("@casl/ability");
var prisma_1 = require("@/lib/prisma");
var Orders_1 = require("@/classes/Orders");
var Menu_1 = require("@/classes/Menu");
var Role_1 = require("@/classes/Role");
var Users_1 = require("@/classes/Users");
var createOrder_1 = require("@/classes/createOrder");
function defineAbilitiesFor(user) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, can, cannot, build, servantRole, userCheck_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = new ability_1.AbilityBuilder(ability_1.createMongoAbility), can = _a.can, cannot = _a.cannot, build = _a.build;
                    if (!(user.role === "CUSTOMER")) return [3 /*break*/, 1];
                    can(enum_1.AllowedActions.ORDER_HISTORY, OrderHistory_1.OrderHistory);
                    can(enum_1.AllowedActions.CREATE_ORDER, createOrder_1.createOrderCus);
                    return [3 /*break*/, 5];
                case 1:
                    if (!(user.role === "ADMIN")) return [3 /*break*/, 2];
                    can(enum_1.AllowedActions.ALL, All_1.All);
                    return [3 /*break*/, 5];
                case 2:
                    if (!(user.role === "SERVANT")) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma_1.prisma.servantRole.findUnique({
                            where: { id: user.servantRoleId },
                            select: { allowedActions: true },
                        })];
                case 3:
                    servantRole = _b.sent();
                    if (!servantRole) {
                        throw new Error("Role is not found");
                    }
                    return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                            where: { id: user.user },
                        })];
                case 4:
                    userCheck_1 = _b.sent();
                    if (servantRole.allowedActions.length > 0) {
                        servantRole.allowedActions.forEach(function (action) {
                            switch (action) {
                                case "SEE_ORDERS":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.SEE_ORDERS, Orders_1.Orders);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.SEE_ORDERS, Orders_1.Orders);
                                    }
                                    break;
                                case "UPDATE_ORDERS":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.UPDATE_ORDERS, Orders_1.Orders);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.UPDATE_ORDERS, Orders_1.Orders);
                                    }
                                    break;
                                case "ADD_MENU":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.ADD_MENU, Menu_1.Menu);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.ADD_MENU, Menu_1.Menu);
                                    }
                                    break;
                                case "ADD_ROLE":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.ADD_ROLE, Role_1.Role);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.ADD_ROLE, Role_1.Role);
                                    }
                                    break;
                                case "UPDATE_ROLE":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.UPDATE_ROLE, Role_1.Role);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.UPDATE_ROLE, Role_1.Role);
                                    }
                                    break;
                                case "DELETE_ROLE":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.DELETE_ROLE, Role_1.Role);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.DELETE_ROLE, Role_1.Role);
                                    }
                                    break;
                                case "ADD_USER":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.ADD_USER, Users_1.Users);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.ADD_USER, Users_1.Users);
                                    }
                                    break;
                                case "UPDATE_USER":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.UPDATE_USER, Users_1.Users);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.UPDATE_USER, Users_1.Users);
                                    }
                                    break;
                                case "DELETE_USER":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.DELETE_USER, Users_1.Users);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.DELETE_USER, Users_1.Users);
                                    }
                                    break;
                                case "GET_USERS":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.GET_USERS, Users_1.Users);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.GET_USERS, Users_1.Users);
                                    }
                                case "GET_ROLES":
                                    if (userCheck_1 === null || userCheck_1 === void 0 ? void 0 : userCheck_1.active) {
                                        can(enum_1.AllowedActions.GET_ROLES, Role_1.Role);
                                    }
                                    else {
                                        cannot(enum_1.AllowedActions.GET_ROLES, Role_1.Role);
                                    }
                                    break;
                                default:
                                    console.log("Unknown action: ".concat(action));
                                    break;
                            }
                        });
                    }
                    _b.label = 5;
                case 5: return [2 /*return*/, build()];
            }
        });
    });
}
