"use client"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getLogin } from "../actions/user/getLogin"
import { useNProgress } from "@/provider/Progress"
import { useRouter } from "next/navigation"

export default function Signup() {
  const { startProgress, stopProgress } = useNProgress()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = () => {
    startProgress()
    router.push("/signup")
    stopProgress("/signup")
  }
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: getLogin,
    onSuccess: (data: any) => {
      const { password, ...userData } = data.user
      localStorage.setItem("user", JSON.stringify(userData))
      if (data.user.role === "CUSTOMER") {
        startProgress()
        window.location.href = "/"
        stopProgress("/")
      } else if (data.user.role === "SERVANT" || data.user.role === "ADMIN") {
        startProgress()
        window.location.href = "/dashboard/orders"
        stopProgress("/dashboard/orders")
      }
    },
  })

  console.log("this is the error", isError, error)
  const loginHandle = (e: any) => {
    e.preventDefault()
    console.log(email, password)
    mutate({ email, password })
    setEmail("")
    setPassword("")
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
          alignItems: "center",
          justifyContent: "center",
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
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box
          component="form"
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
                Login
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
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
            />
            <Button
              id="login"
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#ff9921",
                minWidth: { xs: "280px", sm: "400px" },
              }}
              fullWidth
              onClick={loginHandle}
            >
              {isPending ? "submitting" : "submit"}
            </Button>
            {isError && (
              <Typography sx={{ color: "red" }}>
                {error.message as any}
              </Typography>
            )}
            <Typography sx={{ alignSelf: "center" }}>
              dont Have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={handleSignup}
              >
                Signup
              </span>
            </Typography>
          </Box>
        </Box>
          <Box>
              <Typography>
                  use this to login
              </Typography>
              <Typography>
                  for the customer use qwe@gmail.com with password 123456
              </Typography>
              for the admin use zak2@gmail.com with password 123456
              <Typography>
                  for the servant use sdf@gmail.com with password 123456
              </Typography>
          </Box>
      </Box>
    </Box>
  )
}
