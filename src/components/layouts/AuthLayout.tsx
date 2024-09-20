import { Outlet } from "react-router-dom";
import { Box, Card, Stack, Typography } from "@mui/material";

export default function AuthLayout() {
  return (
    <Box
      style={{
        backgroundImage: "linear-gradient(135deg, #374b7d 40%, #ff6996)",
      }}
      className="h-screen w-screen flex items-center justify-center"
    >
      <Card
        className="mx-16"
        style={{
          width: 1050,
          height: "85%",
        }}
      >
        <Stack className="h-full" direction={"row"}>
          <Box
            className="w-1/2 p-5 select-none hidden md:flex flex-col"
            style={{
              backgroundImage: "linear-gradient(135deg, #7dc8fc, #3d72fe)",
            }}
          >
            <Typography
              className="flex items-center gap-x-1 font-bold"
              variant="h6"
            >
              <span>My Discounted Labs</span>
            </Typography>
            <Box className="flex-grow flex items-center justify-center">
              <img
                width={300}
                height={300}
                src="/assets/images/industry-heathcare.png"
              />
            </Box>
          </Box>
          <Box className="w-full py-10 px-5 md:w-1/2 bg-[#f0f5ff] flex items-center justify-center">
            <Outlet />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
