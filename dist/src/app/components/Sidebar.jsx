"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
var material_1 = require("@mui/material");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var getLogout_1 = require("../actions/user/getLogout");
var image_1 = __importDefault(require("next/image"));
var Progress_1 = require("@/provider/Progress");
function Sidebar() {
    var _a = (0, Progress_1.useNProgress)(), startProgress = _a.startProgress, stopProgress = _a.stopProgress;
    var pathName = (0, navigation_1.usePathname)();
    var pathArray = pathName.split("/");
    var _b = (0, react_1.useState)(""), path = _b[0], setPath = _b[1];
    var router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(function () {
        setPath(pathArray[2]);
    }, [pathName]);
    var handleNavigation = function (route) {
        startProgress();
        router.push(route);
        stopProgress(route);
    };
    var mutate = (0, react_query_1.useMutation)({
        mutationFn: getLogout_1.getLogout,
        onSuccess: function () {
            localStorage.removeItem("user");
            window.location.href = "/login";
            stopProgress("/login");
        },
    }).mutate;
    var handleLogOut = function () {
        startProgress();
        mutate();
    };
    return (<material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 280,
            backgroundColor: "#fcfcfc",
            height: "100vh",
            boxShadow: "4px 0px 8px rgba(186, 155, 155, 1)",
        }}>
      <material_1.Box sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            height: "max-content",
            padding: 3,
            backgroundColor: "#fcfcfc",
        }}>
        <material_1.Typography sx={{ fontSize: 20 }}>PIZZA</material_1.Typography>
        <lucide_react_1.Menu />
      </material_1.Box>
      <material_1.Box sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "max-content",
            padding: 4,
            backgroundColor: "#fff8f2",
        }}>
        <image_1.default loader={function (_a) {
            var src = _a.src;
            return src;
        }} loading="lazy" src="/pizzalogo.svg" width={70} height={70} alt="pizza"/>
      </material_1.Box>
      <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingY: 2,
            paddingX: 0.3,
            backgroundColor: "#fcfcfc",
            position: "relative",
            zIndex: 1,
        }}>
        <material_1.Box sx={{
            backgroundColor: "transparent",
            borderBottom: "1px solid lightgray",
            width: "90%",
            height: 50,
            marginBottom: 2,
            alignSelf: "center",
            position: "absolute",
            zIndex: -1,
            bottom: -14,
        }}></material_1.Box>
        <material_1.Box sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            backgroundColor: path === "orders" ? "#ffcd99" : "transparent",
            paddingY: 1,
            borderRadius: 1,
            cursor: "pointer",
        }} onClick={function () { return handleNavigation("/dashboard/orders"); }}>
          <material_1.Box sx={{
            width: "100%",
            height: "100%",
            borderLeft: path === "orders" ? "4px solid #ff8100" : "none",
            display: "flex",
            paddingX: 8,
            gap: 1.5,
        }}>
            {path === "orders" ? (<lucide_react_1.CalendarArrowUp color="#ff8100"/>) : (<lucide_react_1.CalendarArrowUp />)}
            <material_1.Typography sx={{ color: path === "orders" ? "#ff8100" : "black" }}>
              Orders
            </material_1.Typography>
          </material_1.Box>
        </material_1.Box>
        <material_1.Box sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            backgroundColor: path === "addMenu" ? "#ffcd99" : "transparent",
            borderRadius: 1,
            paddingY: 1,
            cursor: "pointer",
        }} onClick={function () { return handleNavigation("/dashboard/addMenu"); }}>
          <material_1.Box sx={{
            width: "100%",
            height: "100%",
            borderLeft: path === "addMenu" ? "4px solid #ff8100" : "none",
            display: "flex",
            paddingX: 8,
            gap: 1.5,
        }}>
            {path === "addMenu" ? <lucide_react_1.Pizza color="#ff8100"/> : <lucide_react_1.Pizza />}
            <material_1.Typography sx={{ color: path === "addMenu" ? "#ff8100" : "black" }}>
              Add menu
            </material_1.Typography>
          </material_1.Box>
        </material_1.Box>
        <material_1.Box sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            backgroundColor: path === "roles" ? "#ffcd99" : "transparent",
            paddingY: 1,
            borderRadius: 1,
            cursor: "pointer",
        }} onClick={function () { return handleNavigation("/dashboard/roles"); }}>
          <material_1.Box sx={{
            width: "100%",
            height: "100%",
            borderLeft: path === "roles" ? "4px solid #ff8100" : "none",
            display: "flex",
            paddingX: 8,
            gap: 1.5,
        }}>
            {path === "roles" ? <lucide_react_1.UsersRound color="#ff8100"/> : <lucide_react_1.UsersRound />}
            <material_1.Typography sx={{ color: path === "roles" ? "#ff8100" : "black" }}>
              Roles
            </material_1.Typography>
          </material_1.Box>
        </material_1.Box>
        <material_1.Box sx={{
            display: "flex",
            borderRadius: 1,
            width: "100%",
            backgroundColor: path === "users" ? "#ffcd99" : "transparent",
            paddingY: 1,
            cursor: "pointer",
        }} onClick={function () { return handleNavigation("/dashboard/users"); }}>
          <material_1.Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            borderLeft: path === "users" ? "4px solid #ff8100" : "none",
            paddingX: 8,
            gap: 1.5,
        }}>
            {path === "users" ? <lucide_react_1.User color="#ff8100"/> : <lucide_react_1.User />}
            <material_1.Typography sx={{ color: path === "users" ? "#ff8100" : "black" }}>
              Users
            </material_1.Typography>
          </material_1.Box>
        </material_1.Box>
      </material_1.Box>
      <material_1.Box sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            width: "100%",
            marginTop: 2,
            cursor: "pointer",
        }} onClick={handleLogOut}>
        <lucide_react_1.LogOut size={30} color="red"/>
        <material_1.Typography sx={{ fontSize: "20px", color: "red" }}>Logout</material_1.Typography>
      </material_1.Box>
    </material_1.Box>);
}
