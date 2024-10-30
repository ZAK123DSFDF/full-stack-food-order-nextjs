"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScrollableData;
var material_1 = require("@mui/material");
var image_1 = __importDefault(require("next/image"));
function ScrollableData(_a) {
    var color = _a.color;
    return (<>
      <material_1.Box sx={{
            width: "100%",
            height: 400,
            backgroundColor: color,
            borderRadius: "30px",
            display: "flex",
            justifyContent: "space-between",
            overflow: "hidden",
            paddingX: { xs: 2, sm: 4, md: 6 },
        }}>
        <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingY: 5,
            gap: 3,
            minWidth: { xs: 200, sm: 400, md: 450, lg: 600, xl: 500 },
        }}>
          <material_1.Typography sx={{
            fontSize: {
                xs: "1.5rem",
                sm: "2.5rem",
                md: "3rem",
                lg: "3.5rem",
                xl: "4rem",
            },
            maxWidth: "800px",
            lineHeight: {
                xs: "1.2",
                sm: "1.2",
                md: "1.1",
                lg: "1.1",
                xl: "1",
            },
            color: "white",
            fontWeight: "bold",
        }}>
            make you first order and get{" "}
            <span style={{ color: "#e57b0f", fontWeight: "bold" }}>
              50% off
            </span>
          </material_1.Typography>
          <material_1.Typography sx={{
            color: "white",
            opacity: 0.8,
            lineHeight: 1.5,
        }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            accumsan, dolor ac lacinia viverra, lacus justo laoreet libero
          </material_1.Typography>
          <material_1.Button sx={{
            fontWeight: "bold",
            backgroundColor: "#e57b0f",
            color: "white",
            fontSize: "1.2rem",
            padding: "12px 24px",
            borderRadius: "5px",
            "&:hover": {
                backgroundColor: "#d95c0f",
            },
        }}>
            Order Now
          </material_1.Button>
        </material_1.Box>
        <image_1.default loader={function (_a) {
            var src = _a.src;
            return src;
        }} loading="lazy" width={300} height={300} alt="this is feature" src="/pizza.svg" className="size1"/>
      </material_1.Box>
    </>);
}
