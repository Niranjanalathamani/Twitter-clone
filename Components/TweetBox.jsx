import React, { useState, useRef } from "react";
import "./TweetBox.css";
import db from "./Firebase";
import "firebase/compat/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "./Firebase"; 


function TweetBox() {
  const [text, setText] = useState("");
  const textRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const sendTweet = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; 
  
    try {
      const db = getFirestore(app); 
      await addDoc(collection(db, "posts"), {
        displayName: "Niranjana",
        username: "niranjana",
        verified: false,
        text: text,
        image: "", 
        avatar: "ko.jpg",
        timestamp: serverTimestamp(),
      });
  
      console.log("Tweet posted successfully!");
      setText("");
      if (textRef.current) textRef.current.style.height = "auto";
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };
  

  return (
    <div className="tweetBox">
      <img
        src="ko.jpg"
        alt="Avatar"
        className="custom-rounded"
        width="50"
        height="50"
      />
      <form 
        onSubmit={sendTweet} 
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <div className="tweetBox__input">
          <textarea
            ref={textRef}
            type="text"
            placeholder="What's happening?"
            value={text}
            onChange={handleChange}
            rows={1}
          />
        </div>
        <div className="footer">
          <div className="image">
            <i className="bi bi-image"></i>
            <i className="bi bi-filetype-gif"></i>
            <i className="bi bi-slash-circle-fill"></i>
            <i className="bi bi-bar-chart-line"></i>
            <i className="bi bi-emoji-smile"></i>
            <i className="bi bi-calendar-event"></i>
            <i className="bi bi-geo-alt-fill"></i>
          </div>
          <button 
            type="button" 
            className="btn-tweet" 
            onClick={sendTweet} 
          >
            Post
          </button> 
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
