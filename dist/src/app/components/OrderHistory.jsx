"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrderHistory;
var material_1 = require("@mui/material");
var Card_1 = __importDefault(require("./Card"));
var navigation_1 = require("next/navigation");
var image_1 = __importDefault(require("next/image"));
var Progress_1 = require("@/provider/Progress");
function OrderHistory() {
    var router = (0, navigation_1.useRouter)();
    var _a = (0, Progress_1.useNProgress)(), startProgress = _a.startProgress, stopProgress = _a.stopProgress;
    var handleHome = function () {
        startProgress();
        router.push("/");
        stopProgress("/");
    };
    return (<material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#fff8f1",
            width: "100vw",
            height: "100vh",
            overflow: "auto",
        }}>
      <material_1.Box sx={{
            display: "flex",
            alignItems: "center",
            paddingX: 5,
        }} onClick={handleHome}>
        <material_1.Box sx={{ display: "flex", gap: 1 }}>
          <image_1.default loader={function (_a) {
            var src = _a.src;
            return src;
        }} src="/pizzalogo.svg" loading="lazy" width={30} height={30} alt="pizza"/>
          <material_1.Typography sx={{
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 30,
            color: "#af5901",
        }}>
            Pizza
          </material_1.Typography>
        </material_1.Box>
        <material_1.Box sx={{
            display: "flex",
            gap: 5,
            margin: "0 auto",
        }}>
          <material_1.Typography sx={{
            cursor: "pointer",
            fontSize: 25,
            fontWeight: "regular",
        }} onClick={handleHome}>
            Home
          </material_1.Typography>
          <material_1.Typography sx={{
            cursor: "pointer",
            fontSize: 25,
            display: { xs: "none", lg: "flex" },
            fontWeight: "bold",
            color: "#ff8609",
        }}>
            Orders
          </material_1.Typography>
          <material_1.Typography sx={{
            cursor: "pointer",
            fontSize: 25,
            display: { xs: "none", lg: "flex" },
            fontWeight: "regular",
        }}>
            Who we are
          </material_1.Typography>
        </material_1.Box>
      </material_1.Box>
      <material_1.Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 10 }}>
        <material_1.Typography sx={{ fontSize: 40, fontWeight: "regular", color: "#7f7c78" }}>
          Order History
        </material_1.Typography>
        <material_1.Box sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexWrap: "wrap",
        }}>
          <Card_1.default mode="orderHistory"/>
        </material_1.Box>
      </material_1.Box>
    </material_1.Box>);
}
