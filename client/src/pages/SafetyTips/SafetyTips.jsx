import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../../components/Appbar/Navbar";
const StyledContainer = styled(Container)({
  marginTop: "3rem",
  marginBottom: "3rem",
  color: "#fff",
  height: "100%",
});

const StyledHeader = styled(Typography)({
  marginBottom: "1rem",
  color: "#fff",
});

const StyledListItem = styled(ListItem)({
  marginBottom: "0.5rem",
  color: "#fff",
});

function SafetyTips() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  const tips = [
    "1. Our matching system is designed to help you find compatible matches based on your interests and preferences.",

    "2. We use advanced algorithms to analyze user profiles and provide personalized matches.",

    "3. We prioritize user safety and have implemented measures to detect and prevent potentially harmful behavior on our platform.",

    "4. We encourage users to take their time getting to know their matches and to communicate through our messaging system before meeting in person.",

    "5. We have a reporting system in place for users to report any suspicious or inappropriate behavior.",

    "6. We never share your personal information with anyone without your consent.",

    "7. We regularly monitor our platform to ensure that it is safe and secure for all users.",

    "8. By displaying these safety tips, you can help users feel more confident and comfortable using your dating site, and demonstrate your commitment to their safety and privacy.",
  ];

  return (
    <div style={{ background: "var(--color-primary)", minHeight: "100vh" }}>
      <Grid
        container
        spacing={{ xs: 7, sm: 8, md: 8, lg: 8 }}
        sx={{ backgroundColor: "white" }}
      >
        <Grid item xs={12}>
          <Navbar user={user} />
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>

      <StyledContainer maxWidth="md">
        <StyledHeader variant="h3">Safety Tips</StyledHeader>
        <Typography variant="body1" variant="h5" sx={{ mb: 4 }}>
          Here are some safety tips.
        </Typography>
        <List>
          {tips.map((tip, index) => (
            <StyledListItem key={index}>
              <ListItemText primary={tip} />
            </StyledListItem>
          ))}
        </List>
        <Typography variant="body2" sx={{ mt: 4 }}>
          Please note that while our platform can help identify and prevent
          potentially unsafe behavior, it's still important to use common sense
          and take appropriate precautions when meeting someone new.
        </Typography>
      </StyledContainer>
    </div>
  );
}

export default SafetyTips;
