import React from "react";
import "./verification.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function ContinueCard({ nextpage }) {
  return (
    <Button
      type="submit"
      variant="contained"
      // disabled={loading}
      className="continue"
    >
      <Link
        to={nextpage}
        className="link-css"
        style={{ textDecoration: "none" }}
      >
        Continue
      </Link>
    </Button>
  );
}

export default ContinueCard;
