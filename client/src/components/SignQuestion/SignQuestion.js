import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loading/Loading";
import "./SignQuestion.css";
import { addAnswer, getSignUpQuestions } from "../../api/UserRequests";
function SignQuestion() {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const resetForm = () => {
    setQuestions(
      questions.filter((ques) => ques._id !== questions[currentQuestion]?._id)
    );

    setCurrentQuestion(0);
    setSelectedOption(false);
    const opElements = document.querySelectorAll(".option-tag-item");
    opElements.forEach((el) => el.classList.remove("option-tag-item--active"));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await addAnswer(questions[currentQuestion]?._id, selectedOption);
      resetForm();
      setErr(null);
      setLoading(false);
      //   navigate(`/auth/signup/user-info`, {
      //     replace: true,
      //     state: {
      //       id: data._id,
      //     },
      //   });
    } catch (error) {
      console.log(error);
      setErr(error);

      setLoading(false);
    }
  };

  const handleClick = (e) => {
    setSelectedOption(e.target.id);
    const opElements = document.querySelectorAll(".option-tag-item");
    opElements.forEach((el) => el.classList.remove("option-tag-item--active"));
    e.target.classList.add("option-tag-item--active");
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getSignUpQuestions();
        setQuestions(data?.questions);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestions();
  }, []);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="signup-container">
      {questions && (
        <form
          onSubmit={handleSubmit}
          className="account-info-form question-form"
          method="post"
        >
          <Grid container spacing={3} px={3} margin={2}>
            <Grid sm={12} xs={12}>
              <div style={{ textAlign: "center" }}>
                <img
                  style={{
                    borderRadius: "50%",
                    width: "4rem",
                    height: "4rem",
                    cursor: "pointer",
                  }}
                  src={serverPublic + "irislogo.png"}
                  alt="logo"
                  onClick={() => navigate("/home", { replace: true })}
                />
              </div>
            </Grid>
            <Grid sm={12} xs={12}>
              <h3 className="heading-tertiary question-heading">
                {questions[currentQuestion]?.question}
              </h3>
            </Grid>
            <Grid sm={12} xs={12}>
              <div className="option-tag-container">
                {questions[currentQuestion]?.optionTags.map((tag, index) => (
                  <div
                    className={"option-tag-item"}
                    key={index}
                    id={index}
                    onClick={handleClick}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </Grid>

            <Grid sm={12} xs={1}></Grid>
            <Grid sm={12} xs={1}></Grid>
            <Grid sm={4} xs={1}></Grid>
            <Grid sm={4} xs={6}>
              {loading && !err ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loader />
                </div>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={!selectedOption}
                >
                  Next
                </Button>
              )}
            </Grid>
          </Grid>
          <div className="skip-container">
            {questions.length > 10 && (
              <div>
                You should answer at least 10 questions to view suggestions
              </div>
            )}
            <div className="skip-btn-container">
              <Button
                variant="contained"
                onClick={() => navigate("/me", { replace: true })}
                disabled={questions.length > 10}
                className="skip-btn"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignQuestion;
