import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function ProfileModal({ modalOpen, handleCloseModal, user }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              fontSize: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {user.firstname}
          </Typography>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "10rem", height: "10rem", borderRadius: "50%" }}
              src={serverPublic + user.profilePhoto}
              alt={user.callTag}
            />
            <h3>Email: {user.email}</h3>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileModal;
