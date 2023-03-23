import React from "react";
import { Stack } from "@mui/material";
import SugHeader from "../../components/suggestionProfile/Header/SuggestionHeader";
import SugContent from "../../components/suggestionProfile/Content/SuggestionContent";
import "./suggesstionStyle.css";
import { useSelector } from "react-redux";
import Navbar from "../../components/Appbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../components/api/UserRequests";
import { useState } from "react";

export default function SuggessionPage() {
  //const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { id } = useParams()
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getUser(id);
        setProfile(data)
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData()
  }, []);


  return (
    <div className="suggesstionPage">
      <Stack direction="column">
        <Navbar user={user} />
        <SugHeader />
      </Stack>

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
