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
var react_hook_form_1 = require("react-hook-form");
var createUser_1 = require("../actions/user/createUser");
var react_query_1 = require("@tanstack/react-query");
var Progress_1 = require("@/provider/Progress");
var navigation_1 = require("next/navigation");
function Signup() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f;
    var router = (0, navigation_1.useRouter)();
    var _g = (0, Progress_1.useNProgress)(), startProgress = _g.startProgress, stopProgress = _g.stopProgress;
    var handleLogin = function () {
        startProgress();
        router.push("/login");
        stopProgress("/login");
    };
    var _h = (0, react_hook_form_1.useForm)({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            location: "",
            phoneNumber: "",
        },
        mode: "onBlur",
    }), register = _h.register, handleSubmit = _h.handleSubmit, errors = _h.formState.errors, reset = _h.reset, watch = _h.watch;
    var password = watch("password");
    var confirmPassword = watch("confirmPassword");
    var _j = (0, react_query_1.useMutation)({
        mutationFn: createUser_1.createUser,
        onSuccess: function (data) {
            console.log(data);
            var _a = data.user, password = _a.password, userData = __rest(_a, ["password"]);
            localStorage.setItem("user", JSON.stringify(userData));
            startProgress();
            window.location.href = "/";
            stopProgress("/");
        },
    }), mutate = _j.mutate, isPending = _j.isPending, isError = _j.isError, error = _j.error;
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                mutate(data);
                reset();
            }
            catch (err) {
                console.error("Signup failed:", err);
            }
            return [2 /*return*/];
        });
    }); };
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
        <material_1.Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
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
                Signup Form
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
            <material_1.TextField label="name" variant="outlined" type="text" fullWidth {...register("name", { required: "Name is required" })} error={Boolean(errors.name)} helperText={(_a = errors.name) === null || _a === void 0 ? void 0 : _a.message}/>
            <material_1.TextField label="Email" variant="outlined" type="email" fullWidth {...register("email", { required: "Email is required" })} error={Boolean(errors.email)} helperText={(_b = errors.email) === null || _b === void 0 ? void 0 : _b.message}/>
            <material_1.TextField label="Password" variant="outlined" type="password" fullWidth {...register("password", {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
        },
    })} error={Boolean(errors.password)} helperText={(_c = errors.password) === null || _c === void 0 ? void 0 : _c.message}/>
            <material_1.TextField label="Confirm Password" variant="outlined" type="password" fullWidth {...register("confirmPassword", {
        required: "Confirm Password is required",
        validate: function (value) {
            return value === password || "Passwords do not match";
        },
    })} error={Boolean(errors.confirmPassword)} helperText={(_d = errors.confirmPassword) === null || _d === void 0 ? void 0 : _d.message}/>
            <material_1.TextField label="Phone Number" variant="outlined" type="text" fullWidth {...register("phoneNumber", {
        required: "Phone number is required",
    })} error={Boolean(errors.phoneNumber)} helperText={(_e = errors.phoneNumber) === null || _e === void 0 ? void 0 : _e.message}/>
            <material_1.TextField label="location" variant="outlined" type="text" fullWidth {...register("location", { required: "Location is required" })} error={Boolean(errors.location)} helperText={(_f = errors.location) === null || _f === void 0 ? void 0 : _f.message}/>
            <material_1.Button variant="contained" sx={{
            backgroundColor: "#ff9921",
            minWidth: { xs: "280px", sm: "400px" },
        }} type="submit" fullWidth>
              {isPending ? "submitting" : "submit"}
            </material_1.Button>
            <material_1.Typography sx={{ alignSelf: "center" }}>
              Have an account?{" "}
              <span style={{ color: "blue", cursor: "pointer" }} onClick={handleLogin}>
                Login
              </span>
            </material_1.Typography>
          </material_1.Box>
        </material_1.Box>
      </material_1.Box>
    </material_1.Box>);
}
