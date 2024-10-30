"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Signup;
var material_1 = require("@mui/material");
var react_hook_form_1 = require("react-hook-form");
var react_query_1 = require("@tanstack/react-query");
var react_dropzone_1 = require("react-dropzone");
var react_1 = require("react");
var createRestaurant_1 = require("../actions/restaurant/createRestaurant");
var lucide_react_1 = require("lucide-react");
function Signup() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var _j = (0, react_hook_form_1.useForm)({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            location: "",
            phoneNumber: "",
            restaurantLocation: "",
            restaurantName: "",
            image: null, // for storing the uploaded file
        },
        mode: "onBlur",
    }), register = _j.register, handleSubmit = _j.handleSubmit, errors = _j.formState.errors, reset = _j.reset, watch = _j.watch, setValue = _j.setValue;
    var password = watch("password");
    var _k = (0, react_1.useState)(false), openDialog = _k[0], setOpenDialog = _k[1];
    var _l = (0, react_query_1.useMutation)({
        mutationFn: createRestaurant_1.createRestaurant,
        onSuccess: function (data) {
            console.log(data);
            resetForm();
            setOpenDialog(true);
        },
    }), mutate = _l.mutate, isPending = _l.isPending, isError = _l.isError, error = _l.error;
    var handleCloseDialog = function () {
        setOpenDialog(false);
    };
    var onSubmit = function (data) {
        var formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("location", data.location);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("restaurantName", data.restaurantName);
        formData.append("restaurantLocation", data.restaurantLocation);
        formData.append("restaurantPic", data === null || data === void 0 ? void 0 : data.image);
        mutate(formData);
    };
    var _m = (0, react_1.useState)(null), file = _m[0], setFile = _m[1];
    var _o = (0, react_1.useState)(false), isClient = _o[0], setIsClient = _o[1]; // To check if client-side rendering has occurred
    // Set `isClient` to true only on the client
    (0, react_1.useEffect)(function () {
        setIsClient(true);
    }, []);
    var onDrop = function (acceptedFiles) {
        if (acceptedFiles.length > 0) {
            var newFile = acceptedFiles[0];
            setFile(Object.assign(newFile, { preview: URL.createObjectURL(newFile) }));
            setValue("image", newFile, { shouldValidate: true });
        }
    };
    var handleDelete = function () {
        if (file === null || file === void 0 ? void 0 : file.preview) {
            URL.revokeObjectURL(file.preview); // Clean up object URL
        }
        setFile(null);
        setValue("image", null, { shouldValidate: true });
    };
    var resetForm = function () {
        // Clean up object URL when resetting form
        if (file === null || file === void 0 ? void 0 : file.preview) {
            URL.revokeObjectURL(file.preview);
        }
        setFile(null);
        reset();
        setValue("image", null);
    };
    var _p = (0, react_dropzone_1.useDropzone)({
        onDrop: onDrop,
        accept: { "image/*": [] },
        multiple: false,
    }), getRootProps = _p.getRootProps, getInputProps = _p.getInputProps, isDragActive = _p.isDragActive;
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
                Register Restaurant
              </material_1.Typography>
            </material_1.Box>
          </material_1.Box>

          {/* Form Fields */}
          <material_1.Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            minWidth: { xs: "280px", sm: "400px" },
        }}>
            <material_1.TextField label="Name" variant="outlined" type="text" fullWidth {...register("name", { required: "Name is required" })} error={Boolean(errors.name)} helperText={(_a = errors.name) === null || _a === void 0 ? void 0 : _a.message}/>
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
            <material_1.TextField label="Location" variant="outlined" type="text" fullWidth {...register("location", { required: "Location is required" })} error={Boolean(errors.location)} helperText={(_f = errors.location) === null || _f === void 0 ? void 0 : _f.message}/>
            <material_1.TextField label="restaurantName" variant="outlined" type="text" fullWidth {...register("restaurantName", {
        required: "Restaurant Name is required",
    })} error={Boolean(errors.restaurantName)} helperText={(_g = errors.restaurantName) === null || _g === void 0 ? void 0 : _g.message}/>
            <material_1.TextField label="restaurantLocation" variant="outlined" type="text" fullWidth {...register("restaurantLocation", {
        required: "Restaurant Location is required",
    })} error={Boolean(errors.restaurantLocation)} helperText={(_h = errors.restaurantLocation) === null || _h === void 0 ? void 0 : _h.message}/>

            {/* Image Upload Section */}
            <material_1.Box {...getRootProps()} sx={{
            border: "2px dashed #e8e8e8",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            marginBottom: "16px",
            backgroundColor: isDragActive ? "#ffcc80" : "transparent",
            transition: "background-color 0.3s ease",
        }}>
              <input {...getInputProps()}/>
              <material_1.Typography variant="body1">
                Drag & drop an image here, or click to select an image
              </material_1.Typography>
            </material_1.Box>

            {/* Preview Image (Client-side only) */}
            {isClient && file && (<material_1.Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <material_1.Box key={file === null || file === void 0 ? void 0 : file.name} sx={{ position: "relative" }}>
                  <img src={file === null || file === void 0 ? void 0 : file.preview} alt={file === null || file === void 0 ? void 0 : file.name} style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
            }}/>
                </material_1.Box>
                <material_1.Button variant="outlined" color="error" onClick={handleDelete}>
                  Delete
                </material_1.Button>
              </material_1.Box>)}
          </material_1.Box>

          <material_1.Button type="submit" variant="contained" sx={{
            backgroundColor: "#ff9921",
            width: "100%",
            height: "50px",
            marginTop: "10px",
            "&:hover": {
                backgroundColor: "#ffcc80",
            },
        }} disabled={isPending}>
            {isPending ? "Loading..." : "Submit"}
          </material_1.Button>

          {isError && <material_1.Typography color="error">{error.message}</material_1.Typography>}
        </material_1.Box>

        <material_1.Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "1rem",
        }}></material_1.Box>
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
            You have created the Restaurant successfully!
          </material_1.Typography>
        </material_1.DialogContent>
      </material_1.Dialog>
    </material_1.Box>);
}
