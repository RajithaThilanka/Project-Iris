import * as AuthApi from "../api/AuthRequests";
export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/me", { replace: true });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    // const { data } = await AuthApi.signUp(formData);
    // dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/confirm-email", { replace: true });
  } catch (error) {
    navigate(`/error/${error.response.data.message}`);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const confirmMail = (userId, token, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.verifyMail(userId, token);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/email-confirm/success", { replace: true });
  } catch (error) {
    navigate(`/error/${error.response.data.message}`);
    dispatch({ type: "AUTH_FAIL" });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};

export const resetPassword =
  (formData, token, navigate) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.resetPassword(formData, token);
      dispatch({ type: "AUTH_SUCCESS", data: data });
      navigate("/password-reset/success", { replace: true });
    } catch (error) {
      navigate(`/error/${error.response.data.message}`);
      dispatch({ type: "AUTH_FAIL" });
    }
  };

export const adminLogIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.adminLogin(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/admin", { replace: true });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
  }
};
