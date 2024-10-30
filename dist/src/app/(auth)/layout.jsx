"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var material_1 = require("@mui/material");
var Sidebar_1 = __importDefault(require("../components/Sidebar"));
function RootLayout(_a) {
    var children = _a.children;
    return (<material_1.Box sx={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
        }}>
      <Sidebar_1.default />
      {children}
    </material_1.Box>);
}
