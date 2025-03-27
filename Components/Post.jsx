import React from 'react'
import './Post.css'

import { useState,useEffect } from 'react';
import moment from "moment"


function Post({
    displayName,
    username,
    verified,
    timestamp,
    text,
    image,
    avatar,
    allowRetweet=true    
})
{
    const[likes,setLikes]=useState(0);
    const[liked,setLiked]=useState(false);
    const formattedTime = timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : "Just now";
    const [retweetCount, setRetweetCount] = useState(0);
    const[isRetweeted,setIsRetweeted]=useState(false);
    const [showCount, setShowCount] = useState(true); 
    const handleLike=()=>
    {
        setLikes(prevLikes => (liked ? prevLikes - 1 : prevLikes + 1));
        setLiked(prevLiked => !prevLiked);
    };
    const handleRetweet=()=>{
        if (!allowRetweet) return; 
        
            setShowCount(false);
            setTimeout(()=>{
                setRetweetCount((prevCount) => prevCount + 1);
            setShowCount(true); 
            setIsRetweeted(true);
        }, 300);
        
        
    }

    useEffect(() => {
        if (!allowRetweet) return; 

        const delay = Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000; 
        const timer = setTimeout(() => {
            setRetweetCount(prevCount => prevCount + 1);
        }, delay);

        return () => clearTimeout(timer);
    }, []);
    
    
   
  return (
    <div className='post' >
        <div className='post_avatar'>
             <img src={avatar } alt="Avatar" className="custom-rounded" width="50" height="50"/>
        </div>
       <div className="post_body">
        <div className="post_header">
            <div className="post__headerText">
                <h3>{displayName}{" "}<span className='post_headerSpecial'>{verified && <i className="bi bi-patch-check custom"></i>}</span>
                <span className="post__username">@{username}</span>
                <span className="post__timestamp">.{formattedTime}</span>
                </h3>
                
            </div>
            <div className="post__headerDescription">
                <p>{text}
                 </p>
            </div>
            {image && (
            <div>
               <img className='post_image' src={image} alt="Post content" />
            </div>
            )}
            
             <div className="post_footer">
                 <i class="bi bi-chat"></i>
                 
                 {allowRetweet!=false&& (<div className={`retweet-button ${isRetweeted ? "retweeted" : ""}`} onClick={handleRetweet}>
                 <i className={`bi bi-arrow-down-up retweet-icon ${isRetweeted ? "retweeted-icon" : ""}`}></i>
                 <span className={`retweet-count ${isRetweeted ? "retweeted" : ""} ${showCount ? "fade-in" : "fade-out"}`}>
                   {retweetCount}
                </span>
            </div>)}

                 <div className={`like-button ${liked? "liked": ""}`}onClick={handleLike}>
                 <i className={liked ? "bi bi-heart-fill like-icon" : "bi bi-heart like-icon"}></i>
                   
                    
                    
                    <span className={`like-count ${liked ? "liked-text" : ""}`}>{likes}</span>
                </div>                 
                 <i class="bi bi-reception-3"></i>
                 <div className="post__footer2">
                    <i class="bi bi-bookmark"></i>
                    <i class="bi bi-arrow-bar-up"></i>
                   
                 </div>
             </div>

        </div>
       </div>

    </div>
  )
}

export default Post
