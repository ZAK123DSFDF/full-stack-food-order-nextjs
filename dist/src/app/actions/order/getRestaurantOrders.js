"use strict";
"use server";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getRestaurantOrders = void 0;
var prisma_1 = require("../../../lib/prisma");
var verifyToken_1 = require("@/utils/verifyToken");
var decodeToken_1 = require("@/utils/decodeToken");
var abilities_1 = require("@/casl/abilities");
var checkAbilities_1 = require("@/casl/checkAbilities");
var enum_1 = require("@/utils/enum");
var All_1 = require("@/classes/All");
var Orders_1 = require("@/classes/Orders");
var getRestaurantOrders = function (globalSearch, orderStatus, menuName, count, price, createdAt, customerName, customerEmail, customerPhoneNumber, customerLocation, sortBy, sortOrder) { return __awaiter(void 0, void 0, void 0, function () {
    var token, ability, _a, restaurantId_1, restaurantExists, whereClause, numericSearch, isDate, validOrder, date, startOfDay, endOfDay, orderBy, sortDirection, orders, error_1;
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
                return [4 /*yield*/, (0, checkAbilities_1.checkAbilities)(ability, enum_1.AllowedActions.SEE_ORDERS, Orders_1.Orders)];
            case 5:
                _a = (_b.sent());
                _b.label = 6;
            case 6:
                if (!_a) return [3 /*break*/, 9];
                restaurantId_1 = token.restaurantId;
                return [4 /*yield*/, prisma_1.prisma.restaurant.findUnique({
                        where: { id: restaurantId_1 },
                    })];
            case 7:
                restaurantExists = _b.sent();
                if (!restaurantExists) {
                    throw new Error("Restaurant with ID ".concat(restaurantId_1, " not found."));
                }
                whereClause = {
                    menu: {
                        restaurantId: restaurantId_1,
                    },
                };
                if (globalSearch) {
                    whereClause.OR = [
                        {
                            menu: {
                                name: { contains: globalSearch, mode: "insensitive" },
                            },
                        },
                        {
                            customer: {
                                OR: [
                                    { name: { contains: globalSearch, mode: "insensitive" } },
                                    { email: { contains: globalSearch, mode: "insensitive" } },
                                    {
                                        phoneNumber: { contains: globalSearch, mode: "insensitive" },
                                    },
                                    { location: { contains: globalSearch, mode: "insensitive" } },
                                ],
                            },
                        },
                    ];
                    numericSearch = Number(globalSearch);
                    if (!isNaN(numericSearch)) {
                        whereClause.OR.push({ menu: { price: numericSearch } }, { count: numericSearch });
                    }
                    isDate = !isNaN(Date.parse(globalSearch));
                    if (isDate) {
                        whereClause.OR.push({
                            createdAt: {
                                equals: new Date(globalSearch),
                            },
                        });
                    }
                }
                if (orderStatus) {
                    validOrder = ["READY", "PREPARING", "DELIVERED"];
                    if (validOrder.includes(orderStatus)) {
                        whereClause.orderStatus = orderStatus;
                    }
                }
                if (menuName) {
                    whereClause.menu.name = {
                        contains: menuName,
                        mode: "insensitive",
                    };
                }
                if (customerName ||
                    customerEmail ||
                    customerPhoneNumber ||
                    customerLocation) {
                    whereClause.customer = {};
                    if (customerName) {
                        whereClause.customer.name = {
                            contains: customerName,
                            mode: "insensitive",
                        };
                    }
                    if (customerEmail) {
                        whereClause.customer.email = {
                            contains: customerEmail,
                            mode: "insensitive",
                        };
                    }
                    if (customerPhoneNumber) {
                        whereClause.customer.phoneNumber = {
                            contains: customerPhoneNumber,
                            mode: "insensitive",
                        };
                    }
                    if (customerLocation) {
                        whereClause.customer.location = {
                            contains: customerLocation,
                            mode: "insensitive",
                        };
                    }
                }
                if (count && !isNaN(Number(count))) {
                    whereClause.count = Number(count);
                }
                if (price && !isNaN(Number(price))) {
                    whereClause.menu.price = Number(price);
                }
                if (createdAt) {
                    date = new Date(createdAt);
                    if (!isNaN(date.getTime())) {
                        startOfDay = new Date(date.setHours(0, 0, 0, 0));
                        endOfDay = new Date(date.setHours(23, 59, 59, 999));
                        whereClause.createdAt = {
                            gte: startOfDay,
                            lte: endOfDay,
                        };
                    }
                }
                orderBy = {};
                if (sortBy) {
                    sortDirection = sortOrder === "desc" ? "desc" : "asc";
                    switch (sortBy) {
                        case "menuname":
                            orderBy.menu = { name: sortDirection };
                            break;
                        case "menuprice":
                            orderBy.menu = { price: sortDirection };
                            break;
                        case "count":
                            orderBy.count = sortDirection;
                            break;
                        case "customerphoneNumber":
                            orderBy.customer = { phoneNumber: sortDirection };
                            break;
                        case "customername":
                            orderBy.customer = { name: sortDirection };
                            break;
                        case "customeremail":
                            orderBy.customer = { email: sortDirection };
                            break;
                        case "customerlocation":
                            orderBy.customer = { location: sortDirection };
                            break;
                        case "createdAt":
                            orderBy.createdAt = sortDirection;
                            break;
                        default:
                            orderBy.createdAt = "asc";
                    }
                }
                else {
                    orderBy.createdAt = "asc";
                }
                return [4 /*yield*/, prisma_1.prisma.order.findMany({
                        where: __assign(__assign({}, whereClause), { OR: whereClause.OR }),
                        orderBy: orderBy,
                        include: {
                            menu: true,
                            customer: true,
                        },
                    })];
            case 8:
                orders = _b.sent();
                orders.forEach(function (order) {
                    if (order.menu.restaurantId !== restaurantId_1) {
                        throw new Error("You can only get orders from your restaurant");
                    }
                });
                if (orders.length === 0) {
                    throw new Error("Order not found");
                }
                console.log("Orders found:", orders);
                return [2 /*return*/, orders];
            case 9: throw new Error("you are not authorize to do this action");
            case 10: return [3 /*break*/, 12];
            case 11:
                error_1 = _b.sent();
                console.error("Error in getRestaurantOrders:", error_1);
                throw new Error("Error getting restaurant orders: ".concat(error_1 === null || error_1 === void 0 ? void 0 : error_1.message));
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.getRestaurantOrders = getRestaurantOrders;
