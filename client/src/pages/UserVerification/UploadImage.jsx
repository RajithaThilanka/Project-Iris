import VerificationCard from "./VerificationCard";
import { Stack, Typography, FormLabel } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AssignmentTurnedInTwoToneIcon from "@mui/icons-material/AssignmentTurnedInTwoTone";
import ContinueCard from "./ContinueCard";
import { useState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";
import { useEffect } from "react";

function UploadImage() {
  useEffect(() => {
    console.log("hello");
  }, []);

  // const [galleryImages, setGalleryImages] = useState([]);

  // const handleGalleryImages = (e) => {
  //   setGalleryImages(e.target.files);
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   const headers = {
  //     "Content-Type": "multipart/form-data",
  //   };

  //   const formData = new FormData();

  //   for (const file of galleryImages) {
  //     formData.append("tour_gallery", file);
  //   }

  //   console.log({ formData });
  // };

  // const [file, setFile] = useState(null);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files);
  //   console.log(file);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData();
  //   for (var x = 0; x < file.length; x++) {
  //     data.append("file", file[x]);
  //   }
  //   axios.post("http://localhost:3000/upload", data).then((res) => {
  //     console.log(res.statusText);
  //   });
  // };

  return (
    <div>
      <VerificationCard title={"Upload Image of ID Card"}>
        <Stack spacing={2}>
          <FormLabel>
            <AssignmentTurnedInTwoToneIcon />
            Government-issued
          </FormLabel>
          <FormLabel>
            <AssignmentTurnedInTwoToneIcon />
            Original Full-size unedited documents
          </FormLabel>
          <FormLabel>
            <AssignmentTurnedInTwoToneIcon />
            Readable, Well-it, Coloured images
          </FormLabel>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Form onSubmit={onSubmit}> */}
          <Form>
            {/* <Button
              variant="contained"
              component="label"
              className="upload-button"
            >
              Upload Font Page
              <input
                hidden
                accept="image/*"
                multiple={true}
                type="file"
                // onChange={handleGalleryImages}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </Button> */}

            {/* <Button
              variant="contained"
              component="label"
              className="upload-button"
            >
              Upload Back Page
              <input hidden accept="image/*" multiple type="file" />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </Button> */}
          </Form>
        </Stack>

        <ContinueCard nextpage={"/selfiPhoto"} />
        <Typography
          sx={{ fontSize: 22, fontFamily: "Poppins, sans-serif", color: "red" }}
        >
          Iris
        </Typography>
      </VerificationCard>
    </div>
  );
}

export default UploadImage;
