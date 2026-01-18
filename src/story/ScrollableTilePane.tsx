import { Box, Card, CardContent, Typography } from "@mui/material";

type Tile = {
  id: string | number;
  title: string;
};

type Props = {
  items: Tile[];
};

export default function ScrollableTilePane({ items }: Props) {
  return (
    <Box
      sx={{
        width: 300,
        height: 240,
        overflowY: "auto",
        overflowX: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        p: 1
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1
        }}
      >
        {items.map((item) => (
          <Card
            key={item.id}
            elevation={1}
            sx={{
              height: 64,
              display: "flex",
              alignItems: "center"
            }}
          >
            <CardContent
              sx={{
                p: 1,
                "&:last-child": { pb: 1 }
              }}
            >
              <Typography variant="body2" noWrap>
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
