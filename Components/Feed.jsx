
import React, { useState, useEffect } from 'react';
import './Feed.css';
import TweetBox from './TweetBox';
import Post from './Post';
import db from './Firebase';

import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

function Feed({ searchMode, searchTerm, setSearchMode, isTweetBoxOpen, setTweetBoxOpen, communityMode, setCommunityMode }) {
    const [activeTab, setActiveTab] = useState('foryou'); 
    const [activeCategory, setActiveCategory] = useState('top'); 
    const [posts, setPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [index, setIndex] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCommunity, setSelectedCommunity] = useState('All');

    // Fetch posts from Firebase
    useEffect(() => {
        const postRef = collection(db, "posts");
        const q = query(postRef, orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    // Live post rendering effect
    useEffect(() => {
        if (posts.length === 0 || searchMode || communityMode) return;

        const interval = setInterval(() => {
            setDisplayedPosts((prevDisplayedPosts) => {
                if (index < posts.length) {
                    return [...prevDisplayedPosts, posts[index]];
                }
                return prevDisplayedPosts;
            });
            setIndex((prevIndex) => (prevIndex + 1) % posts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [posts, index, searchMode, communityMode]);

    // Handle search mode filtering
    useEffect(() => {
        if (searchMode && searchTerm) {
            setSearchResults(posts.filter(post =>
                post.text.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    }, [searchMode, searchTerm, posts]);

    // Handle community filtering
    useEffect(() => {
        if (!communityMode) return;
        if (selectedCommunity === "All") {
            setDisplayedPosts(posts);
        } else {
            setDisplayedPosts(posts.filter(post => post.category === selectedCommunity));
        }
    }, [selectedCommunity, communityMode, posts]);

    // Handle new post submission
    const handlePost = async (tweetText, tweetImage) => {
        if (!tweetText.trim()) return;

        await addDoc(collection(db, "posts"), {
            displayName: "Your Name",
            username: "@yourUsername",
            verified: true,
            text: tweetText,
            image: tweetImage || "",
            avatar: "default-avatar.png",
            timestamp: serverTimestamp(),
            category: selectedCommunity !== "All" ? selectedCommunity : "General"
        });
    };

    return (
        <div className="feed">
            {isTweetBoxOpen && (<TweetBox onClose={() => setTweetBoxOpen(false)} />)}

            {/*  Search Mode */}
            {searchMode ? (
                <div className="search-container">
                    <div className="search-header">
                        <FiArrowLeft className="back-arrow" onClick={() => setSearchMode(false)} />
                        <input type="text" value={searchTerm} readOnly className="search-header-input" />
                    </div>
                    <div className="search-categories">
                        {["Top", "Latest", "People", "Media", "Lists"].map(category => (
                            <span key={category}
                                className={`category ${activeCategory === category.toLowerCase() ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.toLowerCase())}>
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
            ) : communityMode ? (
                
                <>
                    <div className="community-header">
                        <FiArrowLeft className="back-arrow" onClick={() => setCommunityMode(false)} />
                        <h2 className="community-title">Communities</h2>
                        <FiSearch className="community-search-icon" />
                    </div>

                    <div className="community-border"></div>

                    <div className="community-categories">
                        {["All", "Sports", "Technology", "Art", "Entertainment", "Gaming", "Politics"].map(category => (
                            <button key={category}
                                className={`category-btn ${selectedCommunity === category ? 'active' : ''}`}
                                onClick={() => setSelectedCommunity(category)}>
                                {category}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                // Default Home Tabs
                <div className="feed__header">
                    <p className={`feed__header__p1 ${activeTab === 'foryou' ? 'active' : ''}`}
                        onClick={() => setActiveTab('foryou')}>For You</p>
                    <p className={`feed__header__p2 ${activeTab === 'following' ? 'active' : ''}`}
                        onClick={() => setActiveTab('following')}>Following</p>
                </div>
            )}

            {/*  Render Posts */}
            {searchMode ? (
                searchResults.length === 0 ? (
                    <div className="no-results">
                        <h3>No results for "{searchTerm}"</h3>
                        <p>Try searching for something else.</p>
                    </div>
                ) : (
                    searchResults.map(post => (
                        <Post key={post.id} {...post} />
                    ))
                )
            ) : (
                <>
                    {!communityMode && <TweetBox onPost={handlePost} />}
                    {displayedPosts.length === 0 ? (
                        <div className="no-results">
                            <h3>No posts available</h3>
                        </div>
                    ) : (
                        displayedPosts.map(post => (
                            <Post key={post.id} {...post} />
                        ))
                    )}
                </>
            )}
        </div>
    );
}

export default Feed;

