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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMenu = void 0;
var prisma_1 = require("../../../lib/prisma");
var sharp_1 = __importDefault(require("sharp"));
var cloudinary_1 = require("../../../lib/cloudinary");
var zod_1 = require("zod");
var verifyToken_1 = require("@/utils/verifyToken");
var decodeToken_1 = require("@/utils/decodeToken");
var abilities_1 = require("@/casl/abilities");
var checkAbilities_1 = require("@/casl/checkAbilities");
var enum_1 = require("@/utils/enum");
var All_1 = require("@/classes/All");
var Menu_1 = require("@/classes/Menu");
var createMenu = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
    var token, ability, _a, restaurantId, restaurantExists, name_1, price, toppings, files, MenuSchema, parsed, menuPics, _i, files_1, file, arrayBuffer, buffer, processedBuffer, cloudinaryResponse, menu, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 17, , 18]);
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
                _a = (_d.sent());
                if (_a) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, checkAbilities_1.checkAbilities)(ability, enum_1.AllowedActions.ADD_MENU, Menu_1.Menu)];
            case 5:
                _a = (_d.sent());
                _d.label = 6;
            case 6:
                if (!_a) return [3 /*break*/, 15];
                restaurantId = token.restaurantId;
                return [4 /*yield*/, prisma_1.prisma.restaurant.findUnique({
                        where: { id: restaurantId },
                    })];
            case 7:
                restaurantExists = _d.sent();
                if (!restaurantExists) {
                    throw new Error("Restaurant with ID ".concat(restaurantId, " not found."));
                }
                name_1 = (_b = formData.get("name")) === null || _b === void 0 ? void 0 : _b.toString();
                price = (_c = formData.get("price")) === null || _c === void 0 ? void 0 : _c.toString();
                toppings = formData.getAll("toppings").map(function (top) { return top.toString(); });
                files = formData.getAll("menuPic");
                MenuSchema = zod_1.z.object({
                    name: zod_1.z.string().min(1, "Name is required"),
                    price: zod_1.z.preprocess(function (val) { return parseFloat(val); }, zod_1.z.number().positive()),
                    toppings: zod_1.z.array(zod_1.z.string()).optional(),
                });
                parsed = MenuSchema.safeParse({ name: name_1, price: price, toppings: toppings });
                if (!parsed.success) {
                    throw new Error(parsed.error.errors
                        .map(function (err) { return "".concat(err.path, ": ").concat(err.message); })
                        .join(", "));
                }
                menuPics = [];
                _i = 0, files_1 = files;
                _d.label = 8;
            case 8:
                if (!(_i < files_1.length)) return [3 /*break*/, 13];
                file = files_1[_i];
                return [4 /*yield*/, file.arrayBuffer()];
            case 9:
                arrayBuffer = _d.sent();
                buffer = Buffer.from(arrayBuffer);
                return [4 /*yield*/, (0, sharp_1.default)(buffer)
                        .resize({ width: 800 })
                        .webp({ quality: 80 })
                        .toBuffer()];
            case 10:
                processedBuffer = _d.sent();
                return [4 /*yield*/, (0, cloudinary_1.uploadToCloudinary)(processedBuffer, file.name.split(".")[0])];
            case 11:
                cloudinaryResponse = _d.sent();
                menuPics.push(cloudinaryResponse.secure_url);
                _d.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 8];
            case 13: return [4 /*yield*/, prisma_1.prisma.menu.create({
                    data: {
                        restaurantId: restaurantId,
                        name: parsed.data.name,
                        price: parsed.data.price,
                        toppings: parsed.data.toppings || [],
                        Picture: menuPics,
                    },
                })];
            case 14:
                menu = _d.sent();
                return [2 /*return*/, menu];
            case 15: throw new Error("you are not authorize to do this action");
            case 16: return [3 /*break*/, 18];
            case 17:
                error_1 = _d.sent();
                console.error("Error creating menu:", error_1);
                throw new Error("An error occurred while creating the menu");
            case 18: return [2 /*return*/];
        }
    });
}); };
exports.createMenu = createMenu;
