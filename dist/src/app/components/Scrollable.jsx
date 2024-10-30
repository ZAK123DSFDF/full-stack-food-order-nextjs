"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Scrollable;
var material_1 = require("@mui/material");
var lucide_react_1 = require("lucide-react");
var image_1 = __importDefault(require("next/image"));
function Scrollable() {
    return (<material_1.Box sx={{
            height: "max-content",
            backgroundColor: "white",
            display: "flex",
            width: "max-content",
            padding: 2,
            borderRadius: "10px",
            alignItems: "center",
            gap: 2,
            flexShrink: 0,
            marginBottom: 1,
        }}>
      <material_1.Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <material_1.Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
        }} src="/man2.jpg" loading="lazy" fill alt="man" style={{ objectFit: "cover" }}/>
          </material_1.Box>
          <material_1.Typography sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
            Azmera Hotel
          </material_1.Typography>
        </material_1.Box>

        <material_1.Typography sx={{
            maxWidth: 270,
            wordWrap: "break-word",
            color: "gray",
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt
        </material_1.Typography>
      </material_1.Box>
      <material_1.Box sx={{
            display: "flex",
            backgroundColor: "#f2f9f2",
            borderRadius: "10px",
            overflow: "hidden",
            padding: 2,
            width: "max-content",
            height: "max-content",
            gap: 2,
            flexShrink: 0,
        }}>
        <material_1.Box sx={{
            minWidth: 70,
            minHeight: 70,
            backgroundColor: "#f5e1c2",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
          <lucide_react_1.Shield size={50} color="#ff8100"/>
        </material_1.Box>
        <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
          <material_1.Typography sx={{ fontSize: 15, color: "gray" }}>
            Number of Orders
          </material_1.Typography>
          <material_1.Typography sx={{ fontSize: 30, fontWeight: "bold", color: "#ff8100" }}>
            20k+
          </material_1.Typography>
        </material_1.Box>
      </material_1.Box>
    </material_1.Box>);
}
