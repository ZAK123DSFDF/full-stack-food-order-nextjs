"use strict";
"use client";
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
exports.default = Card;
var material_1 = require("@mui/material");
var react_query_1 = require("@tanstack/react-query");
var image_1 = __importDefault(require("next/image"));
var getAllMenus_1 = require("../actions/menu/getAllMenus");
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var getAllMenusExcluding_1 = require("../actions/menu/getAllMenusExcluding");
var getOrderHistory_1 = require("../actions/order/getOrderHistory");
var Progress_1 = require("@/provider/Progress");
function Card(_a) {
    var _this = this;
    var id = _a.id, mode = _a.mode, data1 = _a.data, data2 = _a.data2;
    var _b = (0, Progress_1.useNProgress)(), startProgress = _b.startProgress, stopProgress = _b.stopProgress;
    var queryFn = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (mode === "allData") {
                return [2 /*return*/, (0, getAllMenus_1.getAllMenus)()];
            }
            else if (mode === "menuDetails") {
                return [2 /*return*/, (0, getAllMenusExcluding_1.getAllMenusExcluding)(id)];
            }
            else if (mode === "orderHistory") {
                return [2 /*return*/, (0, getOrderHistory_1.getOrderHistory)()];
            }
            return [2 /*return*/, []];
        });
    }); };
    var _c = (0, react_query_1.useQuery)({
        queryKey: ["menus", mode],
        queryFn: queryFn,
    }), data = _c.data, isLoading = _c.isLoading;
    console.log(data);
    var router = (0, navigation_1.useRouter)();
    var handleNavigation = function (id) {
        if (mode === "orderHistory") {
            return;
        }
        else if (mode !== "orderHistory") {
            if (data1 === null || data1 === void 0 ? void 0 : data1.isAuthenticated) {
                startProgress();
                router.push("menuDetail/".concat(id));
                stopProgress("menuDetail/".concat(id));
            }
            else if (data2 === null || data2 === void 0 ? void 0 : data2.isAuthenticated) {
                startProgress();
                router.push("".concat(id));
                stopProgress("".concat(id));
            }
            else {
                startProgress();
                router.push("/login");
                stopProgress("/login");
            }
        }
    };
    (0, react_1.useEffect)(function () {
        console.log(data);
    }, [data]);
    if (isLoading) {
        return (<material_1.Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <material_1.CircularProgress />
      </material_1.Box>);
    }
    return (<>
      {mode === "orderHistory" && (!data || data.length === 0) ? (<material_1.Typography variant="h6" align="center" sx={{ marginY: 3 }}>
          No orders found
        </material_1.Typography>) : (data === null || data === void 0 ? void 0 : data.map(function (menu, index) {
            var _a, _b, _c, _d, _e, _f, _g;
            return (<material_1.Box key={index} sx={{
                    width: "max-content",
                    height: "max-content",
                    minWidth: "300px",
                    maxWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    padding: 3,
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    marginBottom: 1,
                }}>
              <>
                <image_1.default src={mode === "orderHistory"
                    ? (_a = menu === null || menu === void 0 ? void 0 : menu.menu) === null || _a === void 0 ? void 0 : _a.Picture[0]
                    : menu === null || menu === void 0 ? void 0 : menu.Picture[0]} width={300} loader={function (_a) {
                    var src = _a.src;
                    return src;
                }} loading="lazy" height={300} alt="card" style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    alignSelf: "center",
                }}/>
                <material_1.Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
                  {mode === "orderHistory" ? (_b = menu === null || menu === void 0 ? void 0 : menu.menu) === null || _b === void 0 ? void 0 : _b.name : menu === null || menu === void 0 ? void 0 : menu.name}
                </material_1.Typography>
                <material_1.Typography sx={{
                    fontWeight: "thin",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    maxHeight: "50px",
                    overflowY: "auto",
                }}>
                  {mode === "orderHistory"
                    ? (_c = menu === null || menu === void 0 ? void 0 : menu.menu) === null || _c === void 0 ? void 0 : _c.toppings.join(", ")
                    : menu === null || menu === void 0 ? void 0 : menu.toppings.join(",")}
                </material_1.Typography>
                <material_1.Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingY: 1,
                    borderBottom: "1px solid #cccccc",
                }}>
                  <material_1.Typography sx={{
                    fontWeight: "bold",
                    color: "#01c550",
                    fontSize: 30,
                }}>
                    {mode === "orderHistory" ? (_d = menu === null || menu === void 0 ? void 0 : menu.menu) === null || _d === void 0 ? void 0 : _d.price : menu === null || menu === void 0 ? void 0 : menu.price}
                    <material_1.Typography component="span" sx={{
                    fontSize: "0.5em",
                    marginLeft: "4px",
                    color: "black",
                }}>
                      birr
                    </material_1.Typography>
                  </material_1.Typography>
                  <material_1.Button onClick={function () { return handleNavigation(menu.id); }} sx={{
                    backgroundColor: mode === "orderHistory" ? "transparent" : "#e57b0f",
                    color: mode === "orderHistory"
                        ? menu.orderStatus !== "DELIVERED"
                            ? "#ffa500"
                            : "#008000"
                        : "white",
                    padding: 1,
                    fontSize: "1.2rem",
                    borderRadius: "5px",
                }}>
                    {mode === "orderHistory" ? ((menu === null || menu === void 0 ? void 0 : menu.orderStatus) === "DELIVERED" ? (<material_1.Typography sx={{ fontWeight: "bold", textTransform: "none" }}>
                          Ordered
                        </material_1.Typography>) : (<material_1.Typography sx={{ fontWeight: "bold", textTransform: "none" }}>
                          Received
                        </material_1.Typography>)) : ("Order")}
                  </material_1.Button>
                </material_1.Box>
                <material_1.Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingY: 1,
                }}>
                  <material_1.Box sx={{
                    minWidth: 50,
                    minHeight: 50,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "50%",
                }}>
                    <image_1.default loader={function (_a) {
                    var src = _a.src;
                    return src;
                }} loading="lazy" src="/man2.jpg" fill alt="man" style={{ objectFit: "cover" }}/>
                  </material_1.Box>
                  <material_1.Typography sx={{ fontWeight: "bold" }}>
                    {mode === "orderHistory"
                    ? (_f = (_e = menu === null || menu === void 0 ? void 0 : menu.menu) === null || _e === void 0 ? void 0 : _e.restaurant) === null || _f === void 0 ? void 0 : _f.name
                    : (_g = menu === null || menu === void 0 ? void 0 : menu.restaurant) === null || _g === void 0 ? void 0 : _g.name}
                  </material_1.Typography>
                </material_1.Box>
              </>
            </material_1.Box>);
        }))}
    </>);
}
