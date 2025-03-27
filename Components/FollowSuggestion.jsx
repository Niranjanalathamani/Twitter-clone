import React from "react";
import "./FollowSuggestion.css";

function FollowSuggestion({ profileImg, displayName, username, verified }) {
  return (
    <div className="follow_suggestion">
      <img src={profileImg} alt="Profile" className="profile_img" />
      <div className="user_info">
        <div className="name">
          <span>{displayName}</span>
          {verified && <i className="bi bi-patch-check-fill verified_icon"></i>}
        </div>
        <p className="username">{username}</p>
      </div>
      <button className="follow_button">Follow</button>
    </div>
  );
}

export default FollowSuggestion;
