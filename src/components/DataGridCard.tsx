import { Grid2 as Grid, Card, Typography, useTheme } from "@mui/material";

export default function DataGridCard() {
  const items = [1, 2, 3, 4];

  return (
    <Grid container spacing={{ xs: 1, sm: 2, lg: 3 }}>
      {items.map((item) => (
        <Grid key={item} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card className="p-3">
            <Typography variant="h6">Card 1</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
