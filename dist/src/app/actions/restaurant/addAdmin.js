"use strict";
"use server";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.addAdmin = void 0;
var prisma_1 = require("../../../lib/prisma");
var zod_1 = require("zod");
var bcrypt = __importStar(require("bcrypt"));
var verifyToken_1 = require("@/utils/verifyToken");
var decodeToken_1 = require("@/utils/decodeToken");
var abilities_1 = require("@/casl/abilities");
var checkAbilities_1 = require("@/casl/checkAbilities");
var enum_1 = require("@/utils/enum");
var All_1 = require("@/classes/All");
var addAdmin = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var token, ability, restaurantId, restaurantExists, UserSchema, parsed, existingUser, hashedPassword, newUser, error_1;
    var name = _b.name, email = _b.email, password = _b.password, phoneNumber = _b.phoneNumber, location = _b.location;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 12, , 13]);
                return [4 /*yield*/, (0, verifyToken_1.verifyToken)()];
            case 1:
                _c.sent();
                return [4 /*yield*/, (0, decodeToken_1.decodedToken)()];
            case 2:
                token = _c.sent();
                return [4 /*yield*/, (0, abilities_1.defineAbilitiesFor)(token)];
            case 3:
                ability = _c.sent();
                return [4 /*yield*/, (0, checkAbilities_1.checkAbilities)(ability, enum_1.AllowedActions.ALL, All_1.All)];
            case 4:
                if (!_c.sent()) return [3 /*break*/, 10];
                restaurantId = token.restaurantId;
                return [4 /*yield*/, prisma_1.prisma.restaurant.findUnique({
                        where: { id: restaurantId },
                    })];
            case 5:
                restaurantExists = _c.sent();
                if (!restaurantExists) {
                    throw new Error("Restaurant with ID ".concat(restaurantId, " not found."));
                }
                UserSchema = zod_1.z.object({
                    name: zod_1.z.string().min(1, "Name is required"),
                    email: zod_1.z
                        .string()
                        .email("Invalid email format")
                        .min(1, "Email is required"),
                    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
                    phoneNumber: zod_1.z.string(),
                    location: zod_1.z.string().optional(),
                });
                parsed = UserSchema.safeParse({
                    name: name,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    location: location,
                });
                if (!parsed.success) {
                    throw new Error(parsed.error.errors
                        .map(function (err) { return "".concat(err.path, ": ").concat(err.message); })
                        .join(", "));
                }
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        where: { email: email },
                    })];
            case 6:
                existingUser = _c.sent();
                if (existingUser) {
                    throw new Error("User already exists");
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 7:
                hashedPassword = _c.sent();
                return [4 /*yield*/, prisma_1.prisma.user.create({
                        data: {
                            name: name,
                            email: email,
                            password: hashedPassword,
                            phoneNumber: phoneNumber,
                            location: location,
                            role: "ADMIN",
                            restaurantId: restaurantId,
                        },
                    })];
            case 8:
                newUser = _c.sent();
                return [4 /*yield*/, prisma_1.prisma.restaurant.update({
                        where: { id: restaurantId },
                        data: {
                            users: {
                                connect: { id: newUser.id },
                            },
                        },
                    })];
            case 9:
                _c.sent();
                return [2 /*return*/, newUser];
            case 10: throw new Error("you are not authorize to do this action");
            case 11: return [3 /*break*/, 13];
            case 12:
                error_1 = _c.sent();
                throw new Error("error in adding Admin");
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.addAdmin = addAdmin;
