import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormHelperText, Stack, TextField } from "@mui/material";
import DateTimePicker from "react-datetime-picker";
import "./PostponeDate.css";
import { postponeDate } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
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

export default function PostponeDate({ open, setOpen, otherUser, dateData }) {
  const [scheduledAt, setScheduledAt] = React.useState(
    new Date(Date.parse(dateData.scheduledAt))
  );
  const { dates, setDates } = React.useContext(MatchesContext);
  const handlePostponeDate = async (e) => {
    e.preventDefault();
    try {
      const {
        data: {
          data: { data },
        },
      } = await postponeDate(otherUser._id, scheduledAt);
      const filteredDates = dates.filter((dt) => dt._id !== dateData._id);
      filteredDates.push(data);
      setDates(filteredDates);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="date-invite-container">
            <h2>Postpone {otherUser.firstname} date</h2>

            <Stack spacing={2} direction="column">
              <form
                onSubmit={handlePostponeDate}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <FormHelperText>Postpone your date</FormHelperText>
                {/* <TextField
                  id="date"
                  name="scheduledAt"
                  type="datetime-local"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dateInfo.scheduledAt}
                  onChange={handleDateData}
                /> */}
                <DateTimePicker
                  value={scheduledAt}
                  onChange={setScheduledAt}
                  minDate={
                    new Date(
                      new Date(Date.parse(dateData.scheduledAt)).getTime()
                    )
                  }
                />
                <Button variant="contained" type="submit">
                  Postpone
                </Button>
              </form>
            </Stack>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
