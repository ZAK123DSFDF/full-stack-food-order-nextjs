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
exports.getAllRoles = void 0;
var prisma_1 = require("../../../lib/prisma");
var verifyToken_1 = require("@/utils/verifyToken");
var decodeToken_1 = require("@/utils/decodeToken");
var abilities_1 = require("@/casl/abilities");
var checkAbilities_1 = require("@/casl/checkAbilities");
var enum_1 = require("@/utils/enum");
var All_1 = require("@/classes/All");
var Role_1 = require("@/classes/Role");
var getAllRoles = function (globalSearch, name, createdAt, active, sortBy, sortOrder) { return __awaiter(void 0, void 0, void 0, function () {
    var token, ability, _a, restaurantId, restaurantExists, filters, isDate, date, startOfDay, endOfDay, isActive, orderBy, roles, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                return [4 /*yield*/, (0, verifyToken_1.verifyToken)()];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, decodeToken_1.decodedToken)()];
            case 2:
                token = _b.sent();
                return [4 /*yield*/, (0, abilities_1.defineAbilitiesFor)(token)];
            case 3:
                ability = _b.sent();
                return [4 /*yield*/, (0, checkAbilities_1.checkAbilities)(ability, enum_1.AllowedActions.ALL, All_1.All)];
            case 4:
                _a = (_b.sent());
                if (_a) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, checkAbilities_1.checkAbilities)(ability, enum_1.AllowedActions.GET_ROLES, Role_1.Role)];
            case 5:
                _a = (_b.sent());
                _b.label = 6;
            case 6:
                if (!_a) return [3 /*break*/, 9];
                restaurantId = token.restaurantId;
                return [4 /*yield*/, prisma_1.prisma.restaurant.findUnique({
                        where: { id: restaurantId },
                    })];
            case 7:
                restaurantExists = _b.sent();
                if (!restaurantExists) {
                    throw new Error("Restaurant with ID ".concat(restaurantId, " not found."));
                }
                filters = { restaurantId: restaurantId };
                if (globalSearch) {
                    isDate = !isNaN(Date.parse(globalSearch));
                    filters.OR = [
                        {
                            name: {
                                contains: globalSearch,
                                mode: "insensitive",
                            },
                        },
                    ];
                    if (isDate) {
                        filters.OR.push({
                            createdAt: {
                                equals: new Date(globalSearch),
                            },
                        });
                    }
                }
                else {
                    if (name) {
                        filters.name = {
                            contains: name,
                            mode: "insensitive",
                        };
                    }
                    if (createdAt) {
                        date = new Date(createdAt);
                        if (!isNaN(date.getTime())) {
                            startOfDay = new Date(date.setHours(0, 0, 0, 0));
                            endOfDay = new Date(date.setHours(23, 59, 59, 999));
                            filters.createdAt = {
                                gte: startOfDay,
                                lte: endOfDay,
                            };
                        }
                    }
                    if (active === "true" || active === "false") {
                        isActive = active === "true";
                        filters.active = isActive;
                    }
                }
                orderBy = {};
                if (sortBy) {
                    orderBy[sortBy] = sortOrder === "desc" ? "desc" : "asc";
                }
                else {
                    orderBy["name"] = "asc";
                }
                return [4 /*yield*/, prisma_1.prisma.servantRole.findMany({
                        where: {
                            restaurantId: filters.restaurantId,
                            OR: filters.OR,
                            name: filters.name,
                            createdAt: filters.createdAt,
                            active: filters.active,
                        },
                        orderBy: orderBy,
                    })];
            case 8:
                roles = _b.sent();
                return [2 /*return*/, roles];
            case 9: throw new Error("you are not authorize to do this action");
            case 10: return [3 /*break*/, 12];
            case 11:
                error_1 = _b.sent();
                throw new Error("error getting roles");
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.getAllRoles = getAllRoles;
