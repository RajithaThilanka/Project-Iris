import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../actions/UploadAction";
import "./idstyle.css";

export default function SelectID(props) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [frontImageName, setFrontImageName] = useState("");
  const [backImageName, setBackImageName] = useState("");
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

  //Upload image and rename and new name upload
  const handleUploadAndImageNameUpdate = async (e) => {
    if (image) {
      const data = new FormData();
      const newImageName = Date.now() + image.name;
      setFrontImageName(newImageName);
      data.append("name", newImageName);
      data.append("file", image);

      try {
        await dispatch(uploadImage(data));
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
      setBackImageName(newImageName2);
      data2.append("name", newImageName2);
      data2.append("file", image2);

      try {
        await dispatch(uploadImage(data2));
        console.log("NIC back upload and name update success");
      } catch (err) {
        console.log(err);
        console.log("NIC back upload and name update unsuccess");
      }
    } else {
      console.log("Upload Error");
    }

    props.onSelectImage(frontImageName, backImageName);
  };

  const [state, setState] = React.useState({
    ck: true,
    ck2: true,
    ck3: true,
  });
  const { ck } = state;
  const { ck2 } = state;
  const { ck3 } = state;
  return (
    <div>
      <Box>
        <Stack
          direction="column"
          alignItems={"center"}
          padding={"10px"}
          spacing={1}
        >
          <Typography className="title">Upload Image of ID Card</Typography>

          <FormGroup className="form-group">
            <FormControlLabel
              control={<Checkbox checked={ck} name="ck" className="checkbox" />}
              label="Government-issued"
              className="checkbox-label"
            />

            <FormControlLabel
              control={
                <Checkbox checked={ck2} name="ck2" className="checkbox" />
              }
              label="Original Full-size unedited documents"
              className="checkbox-label"
            />

            <FormControlLabel
              control={
                <Checkbox checked={ck3} name="ck3" className="checkbox" />
              }
              label="Readable, Well-it, Coloured images"
              className="checkbox-label"
            />
          </FormGroup>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            spacing={2}
          >
            <Button
              variant="contained"
              component="label"
              className="button"
              onChange={""}
              sx={{
                width: {
                  xl: "200px",
                  lg: "200px",
                  md: "200px",
                  sm: "150px",
                  // xs: "100px",
                },
                height: {
                  xl: "80px",
                  lg: "100px",
                  md: "100px",
                  sm: "80px",
                  // xs: "50px",
                },
              }}
            >
              <input type="file" onChange={handleFileChange} />
              <Stack direction="column" spacing={2}>
                <Typography className="button-text">
                  Upload Front Page
                </Typography>
              </Stack>
            </Button>
            <Button
              variant="contained"
              component="label"
              className="button"
              onChange={""}
              sx={{
                width: {
                  xl: "200px",
                  lg: "200px",
                  md: "200px",
                  sm: "150px",
                  // xs: "100px",
                },
                height: {
                  xl: "80px",
                  lg: "100px",
                  md: "100px",
                  sm: "80px",
                  // xs: "50px",
                },
              }}
            >
              <input type="file" onChange={handleFileChange2} />
              <Stack direction="column" spacing={0}>
                <Typography className="button-text">
                  Upload Back Page
                </Typography>
              </Stack>
            </Button>
          </Stack>
          <Button
            className="uploadbutton"
            variant="outlined"
            onClick={handleUploadAndImageNameUpdate}
          >
            Upload
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
