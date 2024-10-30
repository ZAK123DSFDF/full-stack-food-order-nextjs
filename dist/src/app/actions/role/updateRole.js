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
exports.updateRole = void 0;
var prisma_1 = require("../../../lib/prisma");
var zod_1 = require("zod");
var verifyToken_1 = require("@/utils/verifyToken");
var decodeToken_1 = require("@/utils/decodeToken");
var abilities_1 = require("@/casl/abilities");
var checkAbilities_1 = require("@/casl/checkAbilities");
var enum_1 = require("@/utils/enum");
var All_1 = require("@/classes/All");
var Role_1 = require("@/classes/Role");
var updateRole = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var token, ability, _c, restaurantId, restaurantExists, idInt, existingRole, updateServantRoleSchema, parsed, newAllowedActions, updatedRole, error_1;
    var name = _b.name, allowedActions = _b.allowedActions, id = _b.id;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 12, , 13]);
                return [4 /*yield*/, (0, verifyToken_1.verifyToken)()];
            case 1:
                _d.sent();
                return [4 /*yield*/, (0, decodeToken_1.decodedToken)()];
            case 2:
                token = _d.sent();
                return [4 /*yield*/, (0, abilities_1.defineAbilitiesFor)(token)];
            case 3:
                ability = _d.sent();
                return [4 /*yield*/, (0, checkAbilities_1.checkAbilities)(ability, enum_1.AllowedActions.ALL, All_1.All)];
            case 4:
                _c = (_d.sent());
                if (_c) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, checkAbilities_1.checkAbilities)(ability, enum_1.AllowedActions.UPDATE_ROLE, Role_1.Role)];
            case 5:
                _c = (_d.sent());
                _d.label = 6;
            case 6:
                if (!_c) return [3 /*break*/, 10];
                restaurantId = token.restaurantId;
                return [4 /*yield*/, prisma_1.prisma.restaurant.findUnique({
                        where: { id: restaurantId },
                    })];
            case 7:
                restaurantExists = _d.sent();
                if (!restaurantExists) {
                    throw new Error("Restaurant with ID ".concat(restaurantId, " not found."));
                }
                idInt = parseInt(id, 10);
                if (isNaN(idInt)) {
                    throw new Error("Invalid servantRoleId format");
                }
                return [4 /*yield*/, prisma_1.prisma.servantRole.findUnique({
                        where: { id: idInt },
                    })];
            case 8:
                existingRole = _d.sent();
                if (!existingRole) {
                    throw new Error("Servant role with ID ".concat(idInt, " not found."));
                }
                if (restaurantId !== existingRole.restaurantId) {
                    throw new Error("you can only edit your own restaurant");
                }
                updateServantRoleSchema = zod_1.z.object({
                    name: zod_1.z.string().min(1).optional(),
                    allowedActions: zod_1.z
                        .array(zod_1.z.enum([
                        "SEE_ORDERS",
                        "UPDATE_ORDERS",
                        "ADD_MENU",
                        "ADD_ROLE",
                        "UPDATE_ROLE",
                        "DELETE_ROLE",
                        "ADD_USER",
                        "UPDATE_USER",
                        "DELETE_USER",
                        "GET_ROLES",
                        "GET_USERS",
                    ]))
                        .optional(),
                });
                parsed = updateServantRoleSchema.safeParse({
                    name: name,
                    allowedActions: allowedActions,
                    id: id,
                });
                if (!parsed.success) {
                    throw new Error(parsed.error.errors
                        .map(function (err) { return "".concat(err.path, ": ").concat(err.message); })
                        .join(", "));
                }
                newAllowedActions = parsed.data.allowedActions
                    ? parsed.data.allowedActions
                    : existingRole.allowedActions;
                return [4 /*yield*/, prisma_1.prisma.servantRole.update({
                        where: { id: idInt },
                        data: {
                            name: parsed.data.name || existingRole.name,
                            allowedActions: newAllowedActions,
                        },
                    })];
            case 9:
                updatedRole = _d.sent();
                return [2 /*return*/, updatedRole];
            case 10: throw new Error("you are not authorize to do this action");
            case 11: return [3 /*break*/, 13];
            case 12:
                error_1 = _d.sent();
                throw new Error("error in updating role");
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.updateRole = updateRole;
