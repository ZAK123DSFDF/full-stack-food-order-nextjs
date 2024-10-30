"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddMenu;
var material_1 = require("@mui/material");
var react_1 = require("react");
var BreadCrumbs_1 = __importDefault(require("./BreadCrumbs"));
var react_dropzone_1 = require("react-dropzone");
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var AddPhotoAlternate_1 = __importDefault(require("@mui/icons-material/AddPhotoAlternate"));
var react_query_1 = require("@tanstack/react-query");
var createMenu_1 = require("../actions/menu/createMenu");
var useLocalStorage_1 = __importDefault(require("@/utils/useLocalStorage"));
var image_1 = __importDefault(require("next/image"));
var lucide_react_1 = require("lucide-react");
function AddMenu() {
    var initialToppings = [
        { name: "Tomato", selected: true },
        { name: "Mozzarella", selected: true },
        { name: "Basil", selected: true },
        { name: "Pepperoni", selected: true },
        { name: "Bell Peppers", selected: true },
        { name: "Onions", selected: true },
        { name: "Olives", selected: true },
    ];
    var _a = (0, react_1.useState)(initialToppings), toppings = _a[0], setToppings = _a[1];
    var _b = (0, react_1.useState)(""), newTopping = _b[0], setNewTopping = _b[1];
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(""), menuName = _e[0], setMenuName = _e[1];
    var _f = (0, react_1.useState)(""), price = _f[0], setPrice = _f[1];
    var _g = (0, react_1.useState)(false), openToppingDialog = _g[0], setOpenToppingDialog = _g[1];
    var _h = (0, react_1.useState)([]), uploadedImages = _h[0], setUploadedImages = _h[1];
    var hasPermissionToAddMenu = (0, useLocalStorage_1.default)().hasPermissionToAddMenu;
    var handleClose = function () {
        setOpen(false);
    };
    var handleToggleTopping = function (index) {
        var updatedToppings = toppings.map(function (topping, i) {
            return i === index ? __assign(__assign({}, topping), { selected: !topping.selected }) : topping;
        });
        setToppings(updatedToppings);
    };
    (0, react_1.useEffect)(function () {
        setTimeout(function () {
            setLoading(false);
        }, 500);
    });
    var handleAddTopping = function () {
        setToppings(__spreadArray(__spreadArray([], toppings, true), [{ name: newTopping, selected: false }], false));
        setNewTopping("");
        setOpenToppingDialog(false);
    };
    var _j = (0, react_dropzone_1.useDropzone)({
        //@ts-ignore
        accept: "image/*",
        onDrop: function (acceptedFiles) {
            var filesWithPreview = acceptedFiles.map(function (file) {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file),
                });
            });
            //@ts-ignore
            setUploadedImages(__spreadArray(__spreadArray([], uploadedImages, true), filesWithPreview, true));
        },
    }), getRootProps = _j.getRootProps, getInputProps = _j.getInputProps;
    var _k = (0, react_query_1.useMutation)({
        mutationFn: createMenu_1.createMenu,
        onSuccess: function (data) {
            setMenuName("");
            setPrice("");
            setUploadedImages([]);
            setToppings(initialToppings);
            setOpen(true);
        },
    }), mutate = _k.mutate, isPending = _k.isPending;
    var handleUpload = function (e) {
        e.preventDefault();
        var filteredToppings = toppings
            .filter(function (topping) { return topping.selected !== false; })
            .map(function (top) { return top.name; });
        var formData = new FormData();
        if (menuName.trim() === "") {
            console.log("name required");
            return;
        }
        if (price.trim() === "") {
            console.log("price required");
            return;
        }
        if (filteredToppings.length === 0) {
            console.log("need to select something");
            return;
        }
        formData.append("name", menuName);
        formData.append("price", price.toString());
        filteredToppings.forEach(function (topping) {
            formData.append("toppings", topping);
        });
        uploadedImages.forEach(function (file) {
            formData.append("menuPic", file);
        });
        mutate(formData);
    };
    var handleDeleteImage = function (index) {
        setUploadedImages(uploadedImages.filter(function (_, i) { return i !== index; }));
    };
    return (<>
      <material_1.Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <BreadCrumbs_1.default />
        <material_1.Box sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#f7f7f7",
            height: "calc(100% - 48px)",
            width: "100%",
            padding: 2,
            overflow: "auto",
            boxSizing: "border-box",
        }}>
          {/* Red Container */}
          <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            width: "100%",
            overflow: "auto",
            height: "100%",
            padding: "20px",
            boxSizing: "border-box",
            borderRadius: 2,
        }}>
            {hasPermissionToAddMenu && !loading ? (<>
                <material_1.Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
                  Add Menu Item
                </material_1.Typography>

                {/* Menu Form */}
                <material_1.Box component="form" onSubmit={handleUpload} sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                  <material_1.TextField label="Menu Name" value={menuName} onChange={function (e) { return setMenuName(e.target.value); }} variant="outlined" fullWidth sx={{ mb: 2, maxWidth: "500px" }}/>

                  {/* Toppings Section */}
                  <material_1.Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
                    Toppings
                  </material_1.Typography>
                  <material_1.Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                mb: 2,
                maxWidth: 600,
            }}>
                    {toppings.map(function (topping, index) { return (<material_1.FormControlLabel key={topping.name} control={<material_1.Checkbox checked={topping.selected} onChange={function () { return handleToggleTopping(index); }} sx={{
                        color: "#e57b0f",
                        "&.Mui-checked": {
                            color: "#e57b0f",
                        },
                        "&.Mui-checked:hover": {
                            backgroundColor: "transparent",
                        },
                    }}/>} label={topping.name} sx={{ mx: 1 }}/>); })}
                  </material_1.Box>

                  <material_1.Button variant="outlined" onClick={function () { return setOpenToppingDialog(true); }} sx={{
                mb: 2,
                maxWidth: "500px",
                borderColor: "#e57b0f",
                color: "#e57b0f",
            }}>
                    Add New Topping
                  </material_1.Button>

                  {/* Price Input */}
                  <material_1.TextField label="Price" variant="outlined" value={price} onChange={function (e) { return setPrice(e.target.value); }} fullWidth type="number" sx={{ mb: 2, maxWidth: "500px" }}/>

                  {/* Image Upload Section */}
                  <material_1.Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
                    Upload Images
                  </material_1.Typography>
                  <material_1.Box {...getRootProps()} sx={{
                border: "2px dashed #ccc",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
                cursor: "pointer",
                mb: 2,
                backgroundColor: "#f9f9f9",
                position: "relative",
                maxWidth: "400px",
                margin: "0 auto",
                width: "100%",
            }}>
                    <input {...getInputProps()}/>
                    <AddPhotoAlternate_1.default fontSize="large" color="action"/>
                    <material_1.Typography variant="body2">
                      Drag and drop images here, or click to upload
                    </material_1.Typography>
                  </material_1.Box>

                  {/* Display Uploaded Images */}
                  <material_1.Box sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                maxWidth: 600,
                marginTop: 2,
            }}>
                    {uploadedImages.map(function (file, index) { return (<material_1.Box key={index} sx={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    backgroundImage: "url(".concat(file.preview, ")"),
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}>
                        <material_1.IconButton onClick={function () { return handleDeleteImage(index); }} sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                }}>
                          <Delete_1.default />
                        </material_1.IconButton>
                      </material_1.Box>); })}
                  </material_1.Box>

                  {/* Add Menu Button */}
                  <material_1.Button variant="contained" type="submit" sx={{
                mt: 2,
                alignSelf: "center",
                backgroundColor: "#e57b0f",
                color: "white",
            }} disabled={isPending}>
                    {isPending ? "creatingMenu" : "Add menu"}
                  </material_1.Button>
                </material_1.Box>
                <material_1.Dialog open={openToppingDialog} onClose={function () { return setOpenToppingDialog(false); }} fullWidth maxWidth="sm">
                  <material_1.DialogTitle>Add New Topping</material_1.DialogTitle>
                  <material_1.DialogContent>
                    <material_1.TextField label="Topping Name" variant="outlined" fullWidth value={newTopping} onChange={function (e) { return setNewTopping(e.target.value); }} sx={{ mt: 2 }}/>
                  </material_1.DialogContent>
                  <material_1.DialogActions>
                    <material_1.Button onClick={function () { return setOpenToppingDialog(false); }} sx={{ color: "#e57b0f" }}>
                      Cancel
                    </material_1.Button>
                    <material_1.Button onClick={handleAddTopping} variant="contained" color="primary" sx={{ backgroundColor: "#e57b0f", color: "white" }}>
                      Add Topping
                    </material_1.Button>
                  </material_1.DialogActions>
                </material_1.Dialog>
              </>) : loading ? (<material_1.Box sx={{
                width: "100%",
                height: "100vh", // Full viewport height
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
            }}>
                <image_1.default loader={function (_a) {
                var src = _a.src;
                return src;
            }} width={30} loading="lazy" height={30} alt="loading" src="/spinner.svg"/>
              </material_1.Box>) : (<material_1.Box sx={{
                width: "100%",
                height: "100vh", // Full viewport height
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
            }}>
                <material_1.Typography>You don't have permission to see this</material_1.Typography>
              </material_1.Box>)}
          </material_1.Box>
        </material_1.Box>
      </material_1.Box>
      <material_1.Dialog open={open} onClose={handleClose} PaperProps={{
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
            You have uploaded the pizza successfully!
          </material_1.Typography>
        </material_1.DialogContent>
      </material_1.Dialog>
    </>);
}
