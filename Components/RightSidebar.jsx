import React, { useState } from 'react';
import './RightSidebar.css';
import TrendingSection from './TrendingSection';
import FollowSuggestion from './FollowSuggestion';

function RightSidebar({ setSearchMode, setSearchTerm }) {
  const [localSearchTerm, setLocalSearchTerm] = useState("");

 
  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(localSearchTerm.trim());
      setSearchMode(localSearchTerm.trim().length > 0);
    }
  };

  return (
    <div className='widgets'>
      
      <div className="widgets_input">
         <i className="bi bi-search"></i>
         <input
           placeholder='Search'
           type='text'
           value={localSearchTerm}
           onChange={handleInputChange}
           onKeyDown={handleKeyDown} 
         />
      </div>

      
      <div className="widgets_container">
          <h3>Subscribe to Premium</h3>
          <p>Subscribe to unlock new features and if eligible, receive a share of revenue</p>
           <button className='button'>Subscribe</button>
      </div>

      <TrendingSection />

      <div className="widgets_container follow_section">
        <h3>Who to follow</h3>
        <FollowSuggestion profileImg="suriya.jpg" displayName="Suriya" username="@actorsuriya" verified={true} />
        <FollowSuggestion profileImg="priyanka.jpg" displayName="Priyanka" username="@Priyanka" verified={true} />
        <FollowSuggestion profileImg="bcci.jpg" displayName="BCCI" username="@BCCI" verified={true} />
        <p className="showMore">Show more</p>
      </div>
    </div>
  );
}

export default RightSidebar;
