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

export default function SelectID() {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
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
        console.log("NIC back upload and name update success");
      } catch (err) {
        console.log(err);
        console.log("NIC back upload and name update unsuccess");
      }
    } else {
      console.log("Upload Error");
    }
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
        <Stack direction="column" spacing={2}>
          <Typography variant="h5">Upload Image of ID Card</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={ck} name="ck" />}
              label="Government-issued"
            />
            <FormControlLabel
              control={<Checkbox checked={ck2} name="ck2" />}
              label="Original Full-size unedited documents"
            />
            <FormControlLabel
              control={<Checkbox checked={ck3} name="ck3" />}
              label="Readable, Well-it, Coloured images"
            />
          </FormGroup>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack direction="row" spacing={2}></Stack>
            <Button
              variant="contained"
              component="label"
              className="upload-button"
              onChange={""}
            >
              <Stack direction="column" spacing={2}>
                Upload Font Page
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input type="file" onChange={handleFileChange} />
                  <PhotoCamera />
                </IconButton>
              </Stack>
            </Button>

            <Button
              variant="contained"
              component="label"
              className="upload-button"
              onChange={""}
            >
              <Stack direction="column" spacing={1}>
                Upload Back Page
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input type="file" onChange={handleFileChange2} />
                  <PhotoCamera />
                </IconButton>
              </Stack>
            </Button>
          </Stack>
          <Button variant="outlined" onClick={handleUploadAndImageNameUpdate}>
            Upload
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
