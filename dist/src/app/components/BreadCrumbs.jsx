"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BreadCrumbs;
var material_1 = require("@mui/material");
var navigation_1 = require("next/navigation");
function BreadCrumbs() {
    var pathName = (0, navigation_1.usePathname)();
    var pathArray = pathName.split("/");
    return (<material_1.Box sx={{
            display: "flex",
            justifyContent: "flex-start",
            padding: 3,
            backgroundColor: "#ffffff",
            height: "max-content",
            width: "100vw",
        }}>
      <material_1.Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
        {pathArray[2]}
      </material_1.Typography>
    </material_1.Box>);
}
