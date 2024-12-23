"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleMenu } from "../actions/menu/getSingleMenu";
import { createOrder } from "../actions/order/createOrder";

export default function MenuDetail({ data: data2 }: any) {
  const params = useParams();
  const [count, setCount] = useState(1);
  const { data } = useQuery({
    queryKey: ["singleMenu"],
    queryFn: () => getSingleMenu(params.id),
  });

  const [selectedImage, setSelectedImage] = useState("");
  const [checkedToppings, setCheckedToppings] = useState<boolean[]>([]);
  useEffect(() => {
    if (data) {
      setSelectedImage(data.Picture[0]);
      const initialChecked = data.toppings?.map(() => false) || [];
      setCheckedToppings(initialChecked);
    }
  }, [data]);
  const handleImageSelect = (img: string) => {
    setSelectedImage(img);
  };
  const handleToppingChange = (index: number) => {
    const updatedCheckedToppings = [...checkedToppings];
    updatedCheckedToppings[index] = !updatedCheckedToppings[index];
    setCheckedToppings(updatedCheckedToppings);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log(data);
      handleClickOpen();
    },
  });
  const handleOrder = () => {
    const selectedToppings = data?.toppings?.filter(
      (_: any, index: any) => checkedToppings[index]
    );
    mutate({ menuId: params.id, count, toppings: selectedToppings });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100vw",
        height: "100vh",
        overflow: "scroll",
        backgroundColor: "#fff8f1",
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
          gap: 2,
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "center", lg: "center" },
          justifyContent: { xs: "center", lg: "flex-start" },
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
          paddingY: 5,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Large Image Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            marginTop: { xs: 20, md: 20, lg: 0 },
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Main Image Box */}
          <Box
            sx={{
              minWidth: { xs: "250px", sm: "300px", md: "500px" },
              minHeight: { xs: "250px", sm: "300px", md: "500px" },
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
              border: "2px solid #ddd",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: { md: 4 },
            }}
          >
            <Image
              loader={({ src }) => {
                return src;
              }}
              src={selectedImage}
              loading="lazy"
              alt="Selected"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>

          {/* Thumbnails Box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column", md: "column" },
              gap: 2,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              overflowX: "hidden",
              overflowY: { xs: "auto", sm: "auto", md: "auto" },
              height: { xs: "auto", sm: "300px", md: "500px" },
              maxWidth: { xs: "100%", md: "200px" },
              marginTop: { md: 4 },
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
            {data?.Picture.map((img: any, index: any) => (
              <Box
                key={index}
                sx={{
                  minWidth: { xs: "100px", sm: "120px", md: "150px" },
                  minHeight: { xs: "100px", sm: "120px", md: "150px" },
                  maxHeight: { xs: "100px", sm: "120px", md: "150px" },
                  maxWidth: { xs: "100px", sm: "120px", md: "150px" },
                  cursor: "pointer",
                  border:
                    selectedImage === img ? "2px solid blue" : "2px solid #ddd",
                  borderRadius: "5px",
                  overflow: "hidden",
                  transition: "border 0.3s ease",
                }}
                onClick={() => handleImageSelect(img)}
              >
                <Image
                  src={img}
                  loader={({ src }) => {
                    return src;
                  }}
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                  width={80}
                  height={80}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Toppings & Order Actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 50 }}>
            {data?.name}
          </Typography>

          {/* Toppings Selection */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
            }}
          >
            {data?.toppings?.map((topping: any, index: any) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkedToppings[index] || false}
                    onChange={() => handleToppingChange(index)}
                    size="medium"
                    sx={{
                      color: "#e57b0f",
                      "&.Mui-checked": {
                        color: "#e57b0f",
                      },
                      "&.Mui-checked:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "1.2rem" }}>
                    {" "}
                    {/* Adjust fontSize as needed */}
                    {topping}
                  </Typography>
                }
              />
            ))}
          </Box>

          {/* Quantity and Price */}
          <Box sx={{ display: "flex", gap: 4, alignItems: "baseline" }}>
            <Box
              sx={{
                minWidth: 60,
                minHeight: 60,
                backgroundColor: "white",
                borderRadius: "5px",
                display: "flex",
                border: "2px solid #e57b0f",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => count > 1 && setCount((prev) => prev - 1)}
            >
              <Minus />
            </Box>
            <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
              {count}
            </Typography>
            <Box
              sx={{
                minWidth: 60,
                minHeight: 60,
                backgroundColor: "white",
                borderRadius: "5px",
                display: "flex",
                border: "2px solid #e57b0f",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setCount((prev) => prev + 1)}
            >
              <Plus />
            </Box>
            <Typography
              sx={{ fontWeight: "bold", color: "#e57b0f", fontSize: "3rem" }}
            >
              {data?.price}
              <Typography
                component="span"
                sx={{
                  fontSize: "1rem",
                  marginLeft: "4px",
                  color: "black",
                }}
              >
                birr
              </Typography>
            </Typography>
          </Box>

          <Button
            sx={{
              alignSelf: "flex-start",
              backgroundColor: isPending ? "gray" : "#e57b0f",
              color: isPending ? "rgba(255, 255, 255, 0.5)" : "white",
              fontWeight: "bold",
              width: "100%",
              fontSize: 30,
              "&:hover": {
                backgroundColor: isPending ? "gray" : "#d96b0f",
              },
            }}
            onClick={handleOrder}
            disabled={isPending}
          >
            {isPending ? "ordering..." : "order"}
          </Button>
        </Box>
      </Box>

      {/* Related Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: { xs: 20, sm: 30, md: 30, lg: 0 },
          gap: 2,
          backgroundColor: "#fff8f1",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
        }}
      >
        <Typography
          sx={{ fontSize: 40, fontWeight: "regular", color: "#7f7c78" }}
        >
          Related
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            justifyContent: "flex-start",
            overflow: "auto",
            marginBottom: 4,
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
          <Card mode="menuDetails" id={params.id} data2={data2} />
        </Box>
      </Box>

      {/* Success Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
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
            Your Order has been successfully completed!
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
