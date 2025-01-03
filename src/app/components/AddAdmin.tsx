"use client"
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { addAdmin } from "../actions/restaurant/addAdmin"
import { useState } from "react"
import { Check } from "lucide-react"

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      location: "",
    },
    mode: "onBlur",
  })
  const [openDialog, setOpenDialog] = useState(false)
  const password = watch("password")
  const { mutate, isPending } = useMutation({
    mutationFn: addAdmin,
    onSuccess: (data) => {
      console.log(data)
      reset()
      setOpenDialog(true)
    },
  })
  const onSubmit = (data: any) => {
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      location: data.location,
    })
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#ff9921",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h1" sx={{ color: "white" }}>
          PIZZA
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 5,
          boxSizing: "border-box",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 5,
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              sx={{
                alignSelf: "flex-start",
                textAlign: "left",
                fontSize: { xs: "1rem", md: "1.5rem" },
              }}
            >
              PIZZA
            </Typography>
            <Box
              sx={{
                width: "100%",
                borderBottom: "2px solid #e8e8e8",
                paddingY: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  alignSelf: "flex-start",
                  textAlign: "left",
                  fontSize: { xs: "1rem", md: "1.5rem" },
                }}
              >
                Add Admin Form
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minWidth: { xs: "280px", sm: "400px" },
            }}
          >
            {/* Name Field */}
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />

            {/* Email Field */}
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
            />

            {/* Phone Number Field */}
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message}
            />

            {/* Location Field */}
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              {...register("location", { required: "Location is required" })}
              error={Boolean(errors.location)}
              helperText={errors.location?.message}
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff9921",
                minWidth: { xs: "280px", sm: "400px" },
              }}
              type="submit"
              fullWidth
            >
              {isPending ? "submitting" : "submit"}
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              backgroundColor: "#e6f9e6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                backgroundColor: "#05c605",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check color="white" size={100} />
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: 25,
              textAlign: "center",
              color: "#05c605",
              fontWeight: "bold",
            }}
          >
            You have created the admin successfully!
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
