import React, { useEffect, useRef, useState } from "react";
import "./Advertise.css";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../api/UploadRequest";
function Advertise() {
  const imageRef = useRef();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [formData, setData] = useState({
    profilePhoto: "",
    userDescription: "",
    photos: [],
    urls: [],
  });
  const [preview, setPreview] = useState();
  const [uploaded, setUploaded] = useState(false);
  const onImageChange = (event) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    // if there is an image with post

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);

      // newPost.image = fileName;
      setData({ ...formData, profilePhoto: fileName });
      try {
        dispatch(uploadImage(data));
        setUploaded(true);
      } catch (err) {
        console.log(err);
        setUploaded(false);
      }
    } else {
      console.log("Error occured");
      return;
    }
  };
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  return (
    <section className="section-book section-publish">
      <div className="row">
        <div className="book book-container">
          <div className="book__form">
            <form action="#" className="form">
              <div className="u-margin-bottom-medium">
                <h2 className="heading-secondary">Publish your Ad</h2>
              </div>

              <div className="form__group">
                <input
                  type="text"
                  className="form__input"
                  placeholder="Full name"
                  id="name"
                  required
                />
                <label for="name" className="form__label">
                  Full name
                </label>
              </div>

              <div className="form__group">
                <input
                  type="email"
                  className="form__input"
                  placeholder="Email address"
                  id="email"
                  required
                />
                <label for="email" className="form__label">
                  Email address
                </label>
              </div>

              <div className="form__group u-margin-bottom-medium">
                <h4 className="heading-tertiary" sx={{ marginLeft: "0.7rem" }}>
                  Upload your advertisement
                </h4>
                <div className="upload-ad-container">
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    ref={imageRef}
                    onChange={onImageChange}
                  />
                  <label for="file">{<CloudUploadIcon />}</label>
                  <Button
                    variant="contained"
                    onClick={handleUpload}
                    sx={{ fontSize: "1rem" }}
                    disabled={uploaded || !image}
                  >
                    Upload
                  </Button>
                </div>
              </div>

              <div className="form__group publish-btn-container">
                <button className="btn btn--green btn-publish">Publish</button>
              </div>
            </form>
          </div>
          <div className="image-preview-container">
            {image && <img src={preview} alt="profile" />}
            {image && !uploaded && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "rgba(0,0,0,0.6)",
                  borderRadius: 0,
                  color: "#fff",
                  "&:hover": {
                    background: "rgba(0,0,0,0.6)",
                  },
                }}
                onClick={() => {
                  setImage(undefined);
                }}
              >
                <CancelIcon />
              </IconButton>
            )}

            {uploaded && image && (
              <h3 className="image-uploaded-logo">Image Uploaded</h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Advertise;
