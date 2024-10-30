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
exports.createUser = void 0;
var headers_1 = require("next/headers");
var zod_1 = require("zod");
var bcrypt = __importStar(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var prisma_1 = require("../../../lib/prisma");
var createUser = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var SignupSchema, parsed, errorMessages, existUser, hashedPassword, user, token, error_1;
    var name = _b.name, email = _b.email, password = _b.password, location = _b.location, phoneNumber = _b.phoneNumber;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                SignupSchema = zod_1.z.object({
                    name: zod_1.z.string().min(1, "Name is required").optional(),
                    email: zod_1.z.string().email("Invalid email address"),
                    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
                    location: zod_1.z.string(),
                    phoneNumber: zod_1.z.string(),
                    servantRole: zod_1.z.array(zod_1.z.string()).optional(),
                });
                parsed = SignupSchema.safeParse({
                    name: name,
                    email: email,
                    password: password,
                    location: location,
                    phoneNumber: phoneNumber,
                });
                if (!parsed.success) {
                    errorMessages = parsed.error.errors
                        .map(function (err) { return "".concat(err.path.join("."), " - ").concat(err.message); })
                        .join(", ");
                    throw new Error(errorMessages);
                }
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({ where: { email: email } })];
            case 1:
                existUser = _c.sent();
                if (existUser) {
                    throw new Error("Email already exists");
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 2:
                hashedPassword = _c.sent();
                return [4 /*yield*/, prisma_1.prisma.user.create({
                        data: {
                            name: name,
                            email: email,
                            password: hashedPassword,
                            location: location,
                            phoneNumber: phoneNumber,
                        },
                    })];
            case 3:
                user = _c.sent();
                token = jsonwebtoken_1.default.sign({
                    user: user.id,
                    email: user.email,
                    role: user.role,
                }, process.env.secret);
                (0, headers_1.cookies)().set({
                    name: "token",
                    value: token,
                    httpOnly: true,
                });
                return [2 /*return*/, { user: user, token: token }];
            case 4:
                error_1 = _c.sent();
                console.error(error_1);
                throw new Error("Error signing up");
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
