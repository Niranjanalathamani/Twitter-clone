import React, { useRef, useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import RightSidebar from "./Components/RightSidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  const mainContentRef = useRef(null);
  const feedRef = useRef(null);
  const rightSidebarRef = useRef(null);
  
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTweetBoxOpen, setTweetBoxOpen] = useState(false);
  const [communityMode, setCommunityMode] = useState(false);  

  const handlePostClick = () => {
    setTweetBoxOpen(true);
  };

  const user = {
    displayName: "Niranjana Lathamani",
    username: "thaentharagai",
    avatar: "https://example.com/profile-pic.jpg", 
  };

  useEffect(() => {
    const handleSidebarScroll = () => {
      if (rightSidebarRef.current && feedRef.current) {
        feedRef.current.scrollTop = rightSidebarRef.current.scrollTop;
      }
    };

    if (rightSidebarRef.current) {
      rightSidebarRef.current.addEventListener("scroll", handleSidebarScroll);
    }

    return () => {
      if (rightSidebarRef.current) {
        rightSidebarRef.current.removeEventListener("scroll", handleSidebarScroll);
      }
    };
  }, []);

  return (
    <div className="app">
      <Sidebar 
        onPostClick={handlePostClick} 
        user={user} 
        setCommunityMode={setCommunityMode} 
        setSearchMode={setSearchMode}
      />
      <div className="main-content" ref={mainContentRef}>
        <div className="feed" ref={feedRef}>
          <Feed 
            searchMode={searchMode} 
            searchTerm={searchTerm} 
            setSearchMode={setSearchMode} 
            isTweetBoxOpen={isTweetBoxOpen} 
            setTweetBoxOpen={setTweetBoxOpen} 
            communityMode={communityMode} 
            setCommunityMode={setCommunityMode}
          />
        </div>
        <div className="right-sidebar" ref={rightSidebarRef}>
          <RightSidebar setSearchMode={setSearchMode} setSearchTerm={setSearchTerm} />
        </div>
      </div>
    </div>
  );
}

export default App;
