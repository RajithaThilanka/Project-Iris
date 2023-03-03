import * as UserApi from "../api/UserRequests";

export const getMatches = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const {
      data: {
        data: { data },
      },
    } = await UserApi.getMatches();

    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const sendConRequest = (id) => async (dispatch) => {
  dispatch({ type: "SEND_CON_REQUEST", data: id });
  try {
    await UserApi.sendConRequest(id);
  } catch (err) {
    console.log("you have already connected with user");
  }
};
