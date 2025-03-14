"use client";
import { Box, Button, Typography } from "@mui/material";
import Card from "./Card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useNProgress } from "@/provider/Progress";

export default function OrderHistory() {
  const router = useRouter();
  const { startProgress, stopProgress } = useNProgress();
  const handleHome = () => {
    startProgress();
    router.push("/");
    stopProgress("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#fff8f1",
        width: "100vw",
        height: "100vh",
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingX: 5,
        }}
        onClick={handleHome}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Image
            loader={({ src }) => {
              return src;
            }}
            src="/pizzalogo.svg"
            loading="lazy"
            width={30}
            height={30}
            alt="pizza"
          />
          <Typography
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 30,
              color: "#af5901",
            }}
          >
            Pizza
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 5,
            margin: "0 auto",
          }}
        >
          <Typography
            sx={{
              cursor: "pointer",
              fontSize: 25,
              fontWeight: "regular",
            }}
            onClick={handleHome}
          >
            Home
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              fontSize: 25,
              display: { xs: "none", lg: "flex" },
              fontWeight: "bold",
              color: "#ff8609",
            }}
          >
            Orders
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              fontSize: 25,
              display: { xs: "none", lg: "flex" },
              fontWeight: "regular",
            }}
          >
            Who we are
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 10 }}
      >
        <Typography
          sx={{ fontSize: 40, fontWeight: "regular", color: "#7f7c78" }}
        >
          Order History
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Card mode="orderHistory" />
        </Box>
      </Box>
    </Box>
  );
}
