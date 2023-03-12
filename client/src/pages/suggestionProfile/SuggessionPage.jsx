import React from "react";
import { Stack } from "@mui/material";
import SugHeader from "../../components/suggestionProfile/Header/SuggestionHeader";
import SugContent from "../../components/suggestionProfile/Content/SuggestionContent";
import "./suggesstionStyle.css";
import { useSelector } from "react-redux";
import Navbar from "../../components/Appbar/Navbar";
export default function SuggessionPage() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="suggesstionPage">
      <Navbar user={user} />
      <SugHeader />
      <Stack
        direction="column"
        sx={{
          alignItems: "center",
        }}
      >
        <SugContent />
      </Stack>
    </div>
  );
}
