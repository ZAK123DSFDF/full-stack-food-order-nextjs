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
exports.createOrder = void 0;
var zod_1 = require("zod");
var prisma_1 = require("../../../lib/prisma");
var verifyToken_1 = require("@/utils/verifyToken");
var decodeToken_1 = require("@/utils/decodeToken");
var abilities_1 = require("@/casl/abilities");
var checkAbilities_1 = require("@/casl/checkAbilities");
var enum_1 = require("@/utils/enum");
var createOrder_1 = require("@/classes/createOrder");
var createOrder = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var token, ability, customerId, customer, menuIdInt, OrderSchema, parsed, errorMessages, menu_1, invalidToppings, order, error_1;
    var menuId = _b.menuId, count = _b.count, toppings = _b.toppings;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 10, , 11]);
                return [4 /*yield*/, (0, verifyToken_1.verifyToken)()];
            case 1:
                _c.sent();
                return [4 /*yield*/, (0, decodeToken_1.decodedToken)()];
            case 2:
                token = _c.sent();
                return [4 /*yield*/, (0, abilities_1.defineAbilitiesFor)(token)];
            case 3:
                ability = _c.sent();
                return [4 /*yield*/, (0, checkAbilities_1.checkAbilities)(ability, enum_1.AllowedActions.CREATE_ORDER, createOrder_1.createOrderCus)];
            case 4:
                if (!_c.sent()) return [3 /*break*/, 8];
                customerId = token === null || token === void 0 ? void 0 : token.user;
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        where: { id: customerId },
                    })];
            case 5:
                customer = _c.sent();
                if (!customer) {
                    throw new Error("Customer not found");
                }
                menuIdInt = parseInt(menuId, 10);
                if (isNaN(menuIdInt)) {
                    throw new Error("Invalid menu ID format");
                }
                OrderSchema = zod_1.z.object({
                    menuId: zod_1.z.number().nonnegative("Invalid menu ID"),
                    count: zod_1.z.number().min(1, "Count must be at least 1").optional(),
                    toppings: zod_1.z.array(zod_1.z.string()).optional(),
                });
                parsed = OrderSchema.safeParse({
                    menuId: menuIdInt,
                    count: count,
                    toppings: toppings,
                });
                if (!parsed.success) {
                    errorMessages = parsed.error.errors
                        .map(function (err) { return "".concat(err.path.join("."), " - ").concat(err.message); })
                        .join(", ");
                    throw new Error("Validation error: ".concat(errorMessages));
                }
                return [4 /*yield*/, prisma_1.prisma.menu.findUnique({
                        where: { id: menuIdInt },
                    })];
            case 6:
                menu_1 = _c.sent();
                if (!menu_1) {
                    throw new Error("Menu item not found");
                }
                if (toppings && toppings.length > 0) {
                    invalidToppings = toppings.filter(function (topping) { return !menu_1.toppings.includes(topping); });
                    if (invalidToppings.length > 0) {
                        throw new Error("Invalid toppings: ".concat(invalidToppings.join(", "), ". Only removal is allowed."));
                    }
                }
                return [4 /*yield*/, prisma_1.prisma.order.create({
                        data: {
                            customerId: customerId,
                            menuId: menuIdInt,
                            count: count,
                            toppings: toppings,
                        },
                    })];
            case 7:
                order = _c.sent();
                return [2 /*return*/, order];
            case 8: throw new Error("you are not authorize to do this action");
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _c.sent();
                console.error("Error creating order:", error_1.message);
                throw new Error(error_1.message || "An unknown error occurred while creating the order");
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
