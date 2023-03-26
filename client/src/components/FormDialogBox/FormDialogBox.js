import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialogBox({
  children,
  title,
  message,
  setData,
  formData,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleConfirm = () => {
    // console.log(value);
    setData({ ...formData, urls: [...formData.urls, value] });
    setValue("");
    handleClose();
  };

  return (
    <div>
      <span variant="outlined" onClick={handleClickOpen}>
        {children}
      </span>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="url"
            type="url"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
