import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequests";

function Conversation({ data, currentUserId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getUser(userId);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <div className="follower conversation">
      <div>
        <div className="online-dot"></div>
        <img src={userData?.profilePicture} alt="" />
      </div>
    </div>
  );
}

export default Conversation;
