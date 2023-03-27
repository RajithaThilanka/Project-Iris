import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormHelperText, Stack, TextField } from "@mui/material";
import DateTimePicker from "react-datetime-picker";
import Loader from "../Loading/Loading";
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
  const [scheudleErr, setScheduleError] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleScheduledAt = (value) => {
    if (value.getTime() > new Date(dateData.scheduledAt).getTime()) {
      setScheduledAt(value);
      setScheduleError(false);
    } else {
      setScheduleError(true);
    }
  };
  const handlePostponeDate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const {
        data: {
          data: { data },
        },
      } = await postponeDate(otherUser._id, scheduledAt);
      const filteredDates = dates.filter((dt) => dt._id !== dateData._id);
      filteredDates.push(data);
      setDates(filteredDates);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
    }
  };

  // React.useEffect(() => {
  //   return () => {
  //     setSuccess(false);
  //     setLoading(false);
  //   };
  // }, []);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!success ? (
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
                  <p style={{ fontSize: "1.2rem", color: "red" }}>
                    {scheudleErr &&
                      "New date must be greater than the current date"}
                  </p>
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
                    onChange={handleScheduledAt}
                    minDate={new Date()}
                  />
                  {!loading ? (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={scheudleErr}
                    >
                      Postpone
                    </Button>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <Loader />
                    </div>
                  )}
                </form>
              </Stack>
            </div>
          ) : !loading && success ? (
            <div style={{ width: "100%", height: "100%" }}>
              <h3 className="heading-tertiary" style={{ textAlign: "center" }}>
                Success
              </h3>
              <img
                src={serverPublic + "tick.gif"}
                alt="tick"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            ""
          )}
        </Box>
      </Modal>
    </div>
  );
}
