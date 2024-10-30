"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var image_1 = __importDefault(require("next/image"));
var nprogress_1 = __importDefault(require("nprogress"));
require("nprogress/nprogress.css");
var lucide_react_1 = require("lucide-react");
var Scrollable_1 = __importDefault(require("./Scrollable"));
var Card_1 = __importDefault(require("./Card"));
var navigation_1 = require("next/navigation");
var Swiper_1 = __importDefault(require("./Swiper"));
var Progress_1 = require("@/provider/Progress");
function Home(_a) {
    var data = _a.data;
    var _b = (0, Progress_1.useNProgress)(), startProgress = _b.startProgress, stopProgress = _b.stopProgress;
    nprogress_1.default.configure({ showSpinner: false });
    var router = (0, navigation_1.useRouter)();
    var handleNavigation = function () {
        if (data.isAuthenticated) {
            startProgress();
            router.push("/orderHistory");
            stopProgress("/orderHistory");
        }
        else {
            startProgress();
            router.push("/login");
            stopProgress("/login");
        }
    };
    var handleSignup = function () {
        startProgress();
        router.push("/signup");
        stopProgress("/signup");
    };
    var items = Array.from({ length: 10 }, function (_, index) { return (<Scrollable_1.default key={index}/>); });
    return (<>
      <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            zIndex: -9999,
            background: "linear-gradient(to bottom, transparent 10%, rgba(229, 123, 15, 0.6) 50%, transparent 90%)",
            gap: 1,
            "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
                backgroundColor: "transparent",
            },
        }}>
        <material_1.Box sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX: 5,
            paddingY: 2,
        }}>
          <material_1.Box sx={{ display: "flex", gap: 1 }}>
            <image_1.default loader={function (_a) {
            var src = _a.src;
            return src;
        }} src="/pizzalogo.svg" width={30} height={30} alt="pizza"/>
            <material_1.Typography sx={{
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 30,
            color: "#af5901",
        }}>
              Pizza
            </material_1.Typography>
          </material_1.Box>

          <material_1.Box sx={{ display: "flex", gap: 10 }}>
            <material_1.Typography sx={{
            cursor: "pointer",
            fontSize: 25,
            display: { xs: "none", lg: "flex" },
            fontWeight: "bold",
            color: "#ff8609",
        }}>
              Home
            </material_1.Typography>
            <material_1.Typography sx={{
            cursor: "pointer",
            fontSize: 25,
            fontWeight: "regular",
        }} onClick={handleNavigation}>
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
          <material_1.Button onClick={handleSignup} sx={{
            cursor: "pointer",
            backgroundColor: "#ff890f",
            color: "white",
            fontWeight: "bold",
            fontSize: { xs: 10, md: 25 },
            display: { xs: "none", lg: "flex" },
            padding: "10px 20px",
            borderRadius: "5px",
            "&:hover": {
                backgroundColor: "#e57b0f",
            },
        }}>
            Register
          </material_1.Button>
        </material_1.Box>
        <material_1.Box sx={{
            display: "flex",
            overflow: "hidden",
        }}>
          <material_1.Box sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: { xs: 2, sm: 4, md: 6, lg: 10 },
        }}>
            <material_1.Box sx={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "max-content",
            height: "max-content",
            marginTop: { xs: 3, sm: 5, md: 10 },
        }}>
              <material_1.Typography variant="h1" sx={{
            fontSize: {
                xs: "3.5rem",
                sm: "6rem",
                md: "8rem",
                lg: "12rem",
                xl: "12rem",
            },
            fontWeight: 800,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            background: "linear-gradient(to right, #e57b0f, #ffb74d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        }}>
                Order Us
              </material_1.Typography>
              <material_1.Typography sx={{
            fontSize: {
                xs: "1rem",
                sm: "1.3rem",
                md: "1.6rem",
                lg: "2rem",
                xl: "2rem",
            },
            maxWidth: {
                xs: "250px",
                sm: "400px",
                md: "500px",
                xl: "800px",
                lg: "800px",
            },
            marginTop: 2,
            color: "#1e1b18",
        }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum rutrum, risus vel tempus lobortis, augue quam
                condimentum eros, ac congue.
              </material_1.Typography>
              <material_1.Box sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: 150, sm: 250, md: 300, lg: 300 },
            backgroundColor: "white",
            borderRadius: "25px",
            padding: "5px 10px",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
        }}>
                <material_1.InputBase sx={{
            ml: 1,
            flex: 1,
            fontSize: "1rem",
        }} placeholder="Search..." inputProps={{ "aria-label": "search" }}/>
                <material_1.IconButton type="submit" sx={{
            padding: "10px",
            backgroundColor: "#ff8609",
            borderRadius: "50%",
            color: "white",
            "&:hover": {
                backgroundColor: "#e57b0f",
            },
        }} aria-label="search">
                  <lucide_react_1.SearchIcon />
                </material_1.IconButton>
              </material_1.Box>
            </material_1.Box>
          </material_1.Box>
          <image_1.default loader={function (_a) {
            var src = _a.src;
            return src;
        }} src="/pizza.svg" loading="lazy" alt="pizza" width={900} height={900} className="size" style={{
            zIndex: 1,
        }}/>
        </material_1.Box>
      </material_1.Box>
      <material_1.Box sx={{
            width: "100vw",
            paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
            overflow: "hidden",
        }}>
        <material_1.Typography sx={{ fontSize: 40, fontWeight: "regular", color: "#7f7c78" }}>
          Featured Pizza
        </material_1.Typography>
        <Swiper_1.default />
      </material_1.Box>
      <material_1.Box sx={{
            width: "100vw",
            background: "linear-gradient(to bottom, transparent 0%, rgba(229, 123, 15, 0.3) 60%, #fff8f1 80%, transparent 100%)",
            paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
            paddingY: 4,
        }}>
        <material_1.Typography sx={{
            fontSize: 40,
            fontWeight: "regular",
            color: "#7f7c78",
        }}>
          Top Restaurant
        </material_1.Typography>
        <material_1.Box sx={{
            display: "flex",
            overflow: "auto",
            gap: 5,
            "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
                backgroundColor: "transparent",
            },
        }}>
          {items}
        </material_1.Box>
      </material_1.Box>
      <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#fff8f1",
            paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
        }}>
        <material_1.Typography sx={{
            fontSize: 40,
            fontWeight: "regular",
            color: "#7f7c78",
        }}>
          Popular Pizza
        </material_1.Typography>
        <material_1.Box sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexWrap: "wrap",
            justifyContent: { xs: "center", lg: "flex-start" },
        }}>
          <Card_1.default data={data} mode="allData"/>
        </material_1.Box>
      </material_1.Box>
      <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#fff8f1",
            paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
        }}>
        <material_1.Typography sx={{
            fontSize: 40,
            fontWeight: "regular",
            color: "#7f7c78",
        }}>
          Fasting
        </material_1.Typography>
        <material_1.Box sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            justifyContent: "flex-start",
            overflow: "auto",
            "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
                backgroundColor: "transparent",
            },
        }}>
          <Card_1.default data={data} mode="allData"/>
        </material_1.Box>
      </material_1.Box>
      <material_1.Box sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#ccb691",
            paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
            paddingY: 10,
            alignItems: "center",
        }}>
        <material_1.Box sx={{
            display: "flex",
            gap: { lg: 4 },
            flexDirection: { xs: "column", md: "row" },
            whiteSpace: "nowrap",
            fontWeight: "bold",
            fontSize: 20,
        }}>
          <material_1.Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            Home
          </material_1.Typography>
          <material_1.Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            Order
          </material_1.Typography>
          <material_1.Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            About Us
          </material_1.Typography>
        </material_1.Box>
        <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
        }}>
          <image_1.default loader={function (_a) {
            var src = _a.src;
            return src;
        }} src="/pizzalogo.svg" loading="lazy" width={40} height={40} alt="pizza"/>
          <material_1.Box sx={{
            width: 300,
            height: 40,
            backgroundColor: "white",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingX: 2,
        }}>
            <lucide_react_1.Send color="orange"/>
          </material_1.Box>
        </material_1.Box>
      </material_1.Box>
      <material_1.Box sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "black",
            paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
            paddingY: 5,
            alignItems: "center",
        }}>
        <material_1.Box sx={{
            display: "flex",
            gap: { lg: 2 },
            flexDirection: { xs: "column", lg: "row" },
            flexWrap: "wrap",
        }}>
          <material_1.Typography sx={{ color: "white" }}>
            @2024 Pizza All Rights Reserved
          </material_1.Typography>
          <material_1.Typography sx={{ color: "white" }}>Terms of conditions</material_1.Typography>
        </material_1.Box>
        <material_1.Box sx={{
            flexDirection: "row",
            display: "flex",
            gap: { xs: 2, md: 5 },
            justifyContent: "center",
            alignItems: "center",
        }}>
          <lucide_react_1.Facebook color="white"/>
          <lucide_react_1.Linkedin color="white"/>
          <lucide_react_1.Twitter color="white"/>
          <lucide_react_1.Youtube color="white"/>
        </material_1.Box>
      </material_1.Box>
    </>);
}
