import React from "react";
import "./TrendingSection.css";

function TrendingSection() {
  const trendingTopics = [
    { category: "Cricket", title: "Virat Century", posts: "2,345", image: "ko.jpg" },
    { category: "Cricket", title: "Moeen Ali", posts: "1,106" },
    { category: "Entertainment", title: "#rc16", posts: "132K" },
    { category: "Trending in India", title: "#mamithabaiju" }
  ];

  return (
    <div className="trendingSection">
      <h2>What's happening</h2>
      {trendingTopics.map((topic, index) => (
        <div className="Happening_header" key={index}>
          {topic.image && <img src={topic.image} alt={topic.title} className="Happening_image" />}
          <div className="Happening_details">
            <p className="Happening_category">{topic.category} · Trending</p>
            <strong className="Happening_title">{topic.title}</strong>
            {topic.posts && <p className="Happening_posts">{topic.posts} posts</p>}
          </div>
          <i className="bi bi-three-dots"></i>
        </div>
      ))}
      <a href="#" className="trendingSection__showMore">Show more</a>
    </div>
  );
}

export default TrendingSection;
