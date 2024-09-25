import { Outlet } from "react-router-dom";
import { Box, Card, Stack, Typography } from "@mui/material";

export default function AuthLayout() {
  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(135deg, #374b7d 40%, #ff6996)",
      }}
      className="h-screen w-screen flex items-center justify-center"
    >
      <Card
        className="md:mx-4 mx-2 bg-transparent shadow-none md:shadow"
        sx={{ width: 1050, height: "85%" }}
      >
        <Stack className="h-full" direction="row">
          <Box
            className="w-1/2 p-5 select-none hidden md:flex flex-col"
            sx={{
              backgroundImage: "linear-gradient(135deg, #7dc8fc, #3d72fe)",
            }}
          >
            <Typography
              className="flex items-center gap-x-1 font-bold"
              variant="h6"
            >
              My Discounted Labs
            </Typography>
            <Box className="flex-grow flex items-center justify-center">
              <img
                width={300}
                height={300}
                src="/assets/images/industry-heathcare.png"
                alt="Healthcare Industry"
              />
            </Box>
          </Box>
          <Box className="w-full py-10 md:px-5 px-0 md:w-1/2 md:bg-[#f0f5ff] bg-transparent flex items-center justify-center">
            <Outlet />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
