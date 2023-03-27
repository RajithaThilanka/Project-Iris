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
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getUser(id);
        setProfile(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="suggesstionPage">
      <Stack direction="column">
        <Navbar user={user} />
        <SugHeader
          Verified={profile?.verified}
          imageid={profile?.profilePhoto}
          name={profile?.firstname}
          occupation={profile?.occupation}
        />
      </Stack>

      <Stack
        direction="column"
        sx={{
          alignItems: "center",
        }}
      >
        <SugContent
          profilePhoto={profile?.profilePhoto}
          callName={profile?.callTag}
          Ethnicity={profile?.ethnicity}
          Dob={profile?.dob.substring(0, 10)}
          Education={profile?.educationLevel}
          Language={profile?.languages}
          Income={profile?.monthlyIncome}
          Haschildren={profile?.hasChildren}
          Religion={profile?.religion}
          Height={profile?.height}
          about={profile?.userDescription}
          pdes={profile?.interests.profileDescription}
          movies={profile?.interests.movies}
          music={profile?.interests.music}
          smedia={profile?.interests.socialMedia}
          sport={profile?.interests.sports}
        />
      </Stack>
    </div>
  );
}
