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
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getMe } from "../../api/UserRequests";
import { uploadImage } from "../../actions/UploadAction";
import { updateMe } from "../../components/api/UserRequests";

function UploadDrivigImage() {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  //get my details
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getMe();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const [formData, setData] = useState({
    nicFront: "",
  });

  const [formData2, setData2] = useState({
    nicBack: "",
  });

  const dispatch = useDispatch();

  //set image
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      console.log(img);
    }
  };

  const handleFileChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img2 = event.target.files[0];
      setImage2(img2);
      console.log(img2);
    }
  };

  const [fileName, SetImageNewName] = useState("");
  //Upload image and rename and new name upload
  const handleUploadAndImageNameUpdate = async (e) => {
    if (image) {
      const data = new FormData();
      const newImageName = Date.now() + image.name;
      data.append("name", newImageName);
      data.append("file", image);

      try {
        await dispatch(uploadImage(data));
        // setData({ ...formData, profilePhoto: newImageName });
        // await updateMe({ profilePhoto: newImageName });
        console.log("NIC font upload and name update success");
      } catch (err) {
        console.log(err);
        console.log("NIC font upload and name update unsuccess");
      }
    } else {
      console.log("Upload Error");
    }

    if (image2) {
      const data2 = new FormData();
      const newImageName2 = Date.now() + image2.name;
      data2.append("name", newImageName2);
      data2.append("file", image2);

      try {
        await dispatch(uploadImage(data2));
        // setData({ ...formData, profilePhoto: newImageName });
        // await updateMe({ profilePhoto: newImageName });
        console.log("NIC back upload and name update success");
      } catch (err) {
        console.log(err);
        console.log("NIC back upload and name update unsuccess");
      }
    } else {
      console.log("Upload Error");
    }
  };

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
          <Button
            variant="contained"
            component="label"
            className="upload-button"
            onChange={""}
          >
            Upload Font Page
            {/* <input
              hidden
              accept="image/*"
              multiple={true}
              type="file"
              //onChange={handleFileChange}
            /> */}
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input type="file" onChange={handleFileChange} />
              <PhotoCamera />
            </IconButton>
          </Button>

          <Button
            variant="contained"
            component="label"
            className="upload-button"
            onChange={""}
          >
            Upload Back Page
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input type="file" onChange={handleFileChange2} />
              <PhotoCamera />
            </IconButton>
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button onClick={handleUploadAndImageNameUpdate} variant="contained">
            Upload
          </Button>
          <ContinueCard nextpage={"/selfiPhoto"} />
        </Stack>
        <Typography
          sx={{ fontSize: 22, fontFamily: "Poppins, sans-serif", color: "red" }}
        >
          Iris
        </Typography>
      </VerificationCard>
    </div>
  );
}

export default UploadDrivigImage;
