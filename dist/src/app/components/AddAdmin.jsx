"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Signup;
var material_1 = require("@mui/material");
var react_query_1 = require("@tanstack/react-query");
var react_hook_form_1 = require("react-hook-form");
var addAdmin_1 = require("../actions/restaurant/addAdmin");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function Signup() {
    var _a, _b, _c, _d, _e, _f;
    var _g = (0, react_hook_form_1.useForm)({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            location: "",
        },
        mode: "onBlur",
    }), register = _g.register, handleSubmit = _g.handleSubmit, errors = _g.formState.errors, watch = _g.watch, reset = _g.reset;
    var _h = (0, react_1.useState)(false), openDialog = _h[0], setOpenDialog = _h[1];
    var password = watch("password");
    var _j = (0, react_query_1.useMutation)({
        mutationFn: addAdmin_1.addAdmin,
        onSuccess: function (data) {
            console.log(data);
            reset();
            setOpenDialog(true);
        },
    }), mutate = _j.mutate, isPending = _j.isPending;
    var onSubmit = function (data) {
        mutate({
            name: data.name,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            location: data.location,
        });
    };
    var handleCloseDialog = function () {
        setOpenDialog(false);
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
            height: "100%",
            overflow: "auto",
        }}>
        <material_1.Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
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
                Add Admin Form
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
            {/* Name Field */}
            <material_1.TextField label="Name" variant="outlined" fullWidth {...register("name", { required: "Name is required" })} error={Boolean(errors.name)} helperText={(_a = errors.name) === null || _a === void 0 ? void 0 : _a.message}/>

            {/* Email Field */}
            <material_1.TextField label="Email" variant="outlined" type="email" fullWidth {...register("email", {
        required: "Email is required",
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid email",
        },
    })} error={Boolean(errors.email)} helperText={(_b = errors.email) === null || _b === void 0 ? void 0 : _b.message}/>

            {/* Password Field */}
            <material_1.TextField label="Password" variant="outlined" type="password" fullWidth {...register("password", {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
        },
    })} error={Boolean(errors.password)} helperText={(_c = errors.password) === null || _c === void 0 ? void 0 : _c.message}/>

            {/* Confirm Password Field */}
            <material_1.TextField label="Confirm Password" variant="outlined" type="password" fullWidth {...register("confirmPassword", {
        required: "Please confirm your password",
        validate: function (value) {
            return value === password || "Passwords do not match";
        },
    })} error={Boolean(errors.confirmPassword)} helperText={(_d = errors.confirmPassword) === null || _d === void 0 ? void 0 : _d.message}/>

            {/* Phone Number Field */}
            <material_1.TextField label="Phone Number" variant="outlined" fullWidth {...register("phoneNumber", {
        required: "Phone number is required",
    })} error={Boolean(errors.phoneNumber)} helperText={(_e = errors.phoneNumber) === null || _e === void 0 ? void 0 : _e.message}/>

            {/* Location Field */}
            <material_1.TextField label="Location" variant="outlined" fullWidth {...register("location", { required: "Location is required" })} error={Boolean(errors.location)} helperText={(_f = errors.location) === null || _f === void 0 ? void 0 : _f.message}/>

            {/* Submit Button */}
            <material_1.Button variant="contained" sx={{
            backgroundColor: "#ff9921",
            minWidth: { xs: "280px", sm: "400px" },
        }} type="submit" fullWidth>
              {isPending ? "submitting" : "submit"}
            </material_1.Button>
          </material_1.Box>
        </material_1.Box>
      </material_1.Box>
      <material_1.Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{
            sx: {
                borderRadius: "20px",
                overflow: "hidden",
            },
        }}>
        <material_1.DialogContent sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            gap: 4,
        }}>
          <material_1.Box sx={{
            width: 200,
            height: 200,
            backgroundColor: "#e6f9e6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <material_1.Box sx={{
            width: 120,
            height: 120,
            backgroundColor: "#05c605",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
              <lucide_react_1.Check color="white" size={100}/>
            </material_1.Box>
          </material_1.Box>
          <material_1.Typography sx={{
            fontSize: 25,
            textAlign: "center",
            color: "#05c605",
            fontWeight: "bold",
        }}>
            You have created the admin successfully!
          </material_1.Typography>
        </material_1.DialogContent>
      </material_1.Dialog>
    </material_1.Box>);
}
