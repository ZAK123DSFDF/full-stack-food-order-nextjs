"use strict";
"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Signup;
var material_1 = require("@mui/material");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
var getLogin_1 = require("../actions/user/getLogin");
var Progress_1 = require("@/provider/Progress");
var navigation_1 = require("next/navigation");
function Signup() {
    var _a = (0, Progress_1.useNProgress)(), startProgress = _a.startProgress, stopProgress = _a.stopProgress;
    var router = (0, navigation_1.useRouter)();
    var _b = (0, react_1.useState)(""), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(""), password = _c[0], setPassword = _c[1];
    var handleSignup = function () {
        startProgress();
        router.push("/signup");
        stopProgress("/signup");
    };
    var _d = (0, react_query_1.useMutation)({
        mutationFn: getLogin_1.getLogin,
        onSuccess: function (data) {
            console.log(data);
            var _a = data.user, password = _a.password, userData = __rest(_a, ["password"]);
            localStorage.setItem("user", JSON.stringify(userData));
            if (data.user.role === "CUSTOMER") {
                startProgress();
                window.location.href = "/";
                stopProgress("/");
            }
            else if (data.user.role === "SERVANT" || data.user.role === "ADMIN") {
                startProgress();
                window.location.href = "/dashboard/orders";
                stopProgress("/dashboard/orders");
            }
        },
    }), mutate = _d.mutate, isPending = _d.isPending, isError = _d.isError;
    var loginHandle = function (e) {
        e.preventDefault();
        console.log(email, password);
        mutate({ email: email, password: password });
        setEmail("");
        setPassword("");
    };
    return (<material_1.Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "center",
            height: "100vh",
        }}>
      <material_1.Box sx={{
            flex: 1,
            backgroundColor: "#ff9921",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            boxSizing: "border-box",
        }}>
        <material_1.Typography variant="h1" sx={{ color: "white" }}>
          PIZZA
        </material_1.Typography>
      </material_1.Box>
      <material_1.Box sx={{
            flex: 1,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            p: 5,
            boxSizing: "border-box",
            height: "100vh",
            overflow: "auto",
        }}>
        <material_1.Box component="form" sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 5,
            width: "100%",
        }}>
          <material_1.Box sx={{ width: "100%" }}>
            <material_1.Typography variant="h6" sx={{
            alignSelf: "flex-start",
            textAlign: "left",
            fontSize: { xs: "1rem", md: "1.5rem" },
        }}>
              PIZZA
            </material_1.Typography>
            <material_1.Box sx={{
            width: "100%",
            borderBottom: "2px solid #e8e8e8",
            paddingY: 1,
        }}>
              <material_1.Typography variant="h6" sx={{
            alignSelf: "flex-start",
            textAlign: "left",
            fontSize: { xs: "1rem", md: "1.5rem" },
        }}>
                Login
              </material_1.Typography>
            </material_1.Box>
          </material_1.Box>
          <material_1.Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            minWidth: { xs: "280px", sm: "400px" },
        }}>
            <material_1.TextField label="Email" variant="outlined" value={email} onChange={function (e) { return setEmail(e.target.value); }} type="email" fullWidth/>
            <material_1.TextField label="Password" variant="outlined" value={password} onChange={function (e) { return setPassword(e.target.value); }} type="password" fullWidth/>
            <material_1.Button variant="contained" type="submit" sx={{
            backgroundColor: "#ff9921",
            minWidth: { xs: "280px", sm: "400px" },
        }} fullWidth onClick={loginHandle}>
              {isPending ? "submitting" : "submit"}
            </material_1.Button>
            {isError && (<material_1.Typography sx={{ color: "red" }}>
                credentials not correct
              </material_1.Typography>)}
            <material_1.Typography sx={{ alignSelf: "center" }}>
              dont Have an account?{" "}
              <span style={{ color: "blue", cursor: "pointer" }} onClick={handleSignup}>
                Signup
              </span>
            </material_1.Typography>
          </material_1.Box>
        </material_1.Box>
      </material_1.Box>
    </material_1.Box>);
}
