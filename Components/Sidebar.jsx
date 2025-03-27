import React, { useState } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar({ onPostClick, user,setCommunityMode,setSearchMode }) {
  const [activeTab, setActiveTab] = useState("Home"); 

  const handleTabClick = (tab) => {
    setActiveTab(tab); 
  if(tab==="Communities"){
    setCommunityMode(true);
    setSearchMode(false);
  }else if (tab === "Explore"){
    setCommunityMode(false);
    setSearchMode(true);
  }else{
    setCommunityMode(false);
    setSearchMode(false);
  }
}

  return (
    <>
    
    <div className="sidebar-container">
      <p className="active-text">{activeTab || "Home"} / X</p>

      <div className="sidebar">
        <SidebarOption
          text=""
          icon={<i className="bi bi-twitter-x custom-icon"></i>}
        />
        <SidebarOption
          text="Home"
          icon={
            <i className={`bi bi-house${activeTab === "Home" ? "-fill" : ""} custom-icon`}></i>
          }
          active={activeTab === "Home"}
          onClick={() => handleTabClick("Home")}
        />
        <SidebarOption
          text="Explore"
          icon={
            <i className={`bi bi-search${activeTab === "Explore" ? "-heart-fill" : ""} custom-icon`}></i>
            
          }
          
          
          active={activeTab === "Explore"}
          onClick={() => handleTabClick("Explore")}
        />
        <SidebarOption
          text="Notifications"
          icon={
            <i className={`bi bi-chat-left${activeTab === "Notifications" ? "-fill" : ""} custom-icon`}></i>
          }
          active={activeTab === "Notifications"}
          onClick={() => handleTabClick("Notifications")}
        />
        <SidebarOption
          text="Messages"
          icon={
            <i className={`bi bi-envelope${activeTab === "Messages" ? "-fill" : ""} custom-icon`}></i>
          }
          active={activeTab === "Messages"}
          onClick={() => handleTabClick("Messages")}
        />
        <SidebarOption
          text="Bookmarks"
          icon={
            <i className={`bi bi-bookmark${activeTab === "Bookmarks" ? "-fill" : ""} custom-icon`}></i>
          }
          active={activeTab === "Bookmarks"}
          onClick={() => handleTabClick("Bookmarks")}
        />
        <SidebarOption
          text="Communities"
          icon={
            <i className={`bi bi-people${activeTab === "Communities" ? "-fill" : ""} custom-icon`}></i>
          }

          active={activeTab === "Communities"}
          onClick={() => handleTabClick("Communities")}
        />
        <SidebarOption
          text="Premium"
          icon={<i className="bi bi-patch-check custom-icon"></i>}
          active={activeTab === "Premium"}
          onClick={() => handleTabClick("Premium")}
        />
        <SidebarOption
          text="Verified Orgs"
          icon={
            <i className={`bi bi-lightning${activeTab === "Verified Orgs" ? "-fill" : ""} custom-icon`}></i>
          }
          active={activeTab === "Verified Orgs"}
          onClick={() => handleTabClick("Verified Orgs")}
        />
        <SidebarOption
          text="Profile"
          icon={
            <i className={`bi bi-person${activeTab === "Profile" ? "-fill" : ""} custom-icon`}></i>
          }
          active={activeTab === "Profile"}
          onClick={() => handleTabClick("Profile")}
        />
        <SidebarOption
          text="More"
          icon={
            <i className={`bi bi-dash-circle${activeTab === "More" ? "-fill" : ""} custom-icon`}></i>
          }
          active={activeTab === "More"}
          onClick={() => handleTabClick("More")}
        />

        
        <button type="button" className="btn" onClick={onPostClick}>
          Post
        </button>

        
        {user && (
          <div className="sidebar-profile">
            <img src="ko.jpg" alt="Profile" className="profile-pic" />
            <div className="profile-details">
              <p className="profile-name">{user.displayName}</p>
              <p className="profile-username">@{user.username}</p>
            </div>
            <i className="bi bi-three-dots"></i>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Sidebar;
