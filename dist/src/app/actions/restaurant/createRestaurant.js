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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRestaurant = void 0;
var cloudinary_1 = require("@/lib/cloudinary");
var sharp_1 = __importDefault(require("sharp"));
var zod_1 = require("zod");
var prisma_1 = require("../../../lib/prisma");
var bcrypt = __importStar(require("bcrypt"));
var verifyToken_1 = require("@/utils/verifyToken");
var createRestaurant = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, email, password, location_1, phoneNumber, restaurantName, restaurantLocation, restaurantPic, arrayBuffer, buffer, processedBuffer, cloudinaryResponse, UserSchema, RestaurantSchema, userParsed, restaurantParsed, existingUser, userId, hashedPassword, newUser, restaurant, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                return [4 /*yield*/, (0, verifyToken_1.verifyToken)()];
            case 1:
                _a.sent();
                name_1 = formData.get("name").toString();
                email = formData.get("email").toString();
                password = formData.get("password").toString();
                location_1 = formData.get("location").toString();
                phoneNumber = formData.get("phoneNumber").toString();
                restaurantName = formData.get("restaurantName").toString();
                restaurantLocation = formData.get("restaurantLocation").toString();
                restaurantPic = formData.get("restaurantPic");
                return [4 /*yield*/, restaurantPic.arrayBuffer()];
            case 2:
                arrayBuffer = _a.sent();
                buffer = Buffer.from(arrayBuffer);
                return [4 /*yield*/, (0, sharp_1.default)(buffer)
                        .resize({ width: 800 })
                        .webp({ quality: 80 })
                        .toBuffer()];
            case 3:
                processedBuffer = _a.sent();
                return [4 /*yield*/, (0, cloudinary_1.uploadToCloudinary)(processedBuffer, restaurantPic.name.split(".")[0])];
            case 4:
                cloudinaryResponse = _a.sent();
                UserSchema = zod_1.z.object({
                    name: zod_1.z.string().min(1, "Name is required"),
                    email: zod_1.z
                        .string()
                        .email("Invalid email format")
                        .min(1, "Email is required"),
                    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
                    phoneNumber: zod_1.z.string().min(1, "Phone number is required"),
                    location: zod_1.z.string().min(1, "location is required").optional(),
                });
                RestaurantSchema = zod_1.z.object({
                    restaurantName: zod_1.z.string().min(1, "Name is required"),
                    restaurantLocation: zod_1.z.string().min(1, "Location is required"),
                });
                userParsed = UserSchema.safeParse({
                    name: name_1,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    location: location_1,
                });
                if (!userParsed.success) {
                    throw new Error(userParsed.error.errors
                        .map(function (err) { return "".concat(err.path, ": ").concat(err.message); })
                        .join(", "));
                }
                restaurantParsed = RestaurantSchema.safeParse({
                    restaurantName: restaurantName,
                    restaurantLocation: restaurantLocation,
                });
                if (!restaurantParsed.success) {
                    throw new Error(restaurantParsed.error.errors
                        .map(function (err) { return "".concat(err.path, ": ").concat(err.message); })
                        .join(", "));
                }
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        where: { email: email },
                    })];
            case 5:
                existingUser = _a.sent();
                if (existingUser) {
                    throw new Error("user already exist");
                }
                userId = void 0;
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 6:
                hashedPassword = _a.sent();
                return [4 /*yield*/, prisma_1.prisma.user.create({
                        data: {
                            name: name_1,
                            email: email,
                            password: hashedPassword,
                            phoneNumber: phoneNumber,
                            location: location_1,
                            role: "ADMIN",
                        },
                    })];
            case 7:
                newUser = _a.sent();
                userId = newUser.id;
                return [4 /*yield*/, prisma_1.prisma.restaurant.create({
                        data: {
                            name: restaurantName,
                            location: restaurantLocation,
                            users: {
                                connect: { id: userId },
                            },
                            Picture: cloudinaryResponse.secure_url,
                        },
                    })];
            case 8:
                restaurant = _a.sent();
                return [2 /*return*/, restaurant];
            case 9:
                error_1 = _a.sent();
                throw new Error("error creating restaurant");
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.createRestaurant = createRestaurant;
