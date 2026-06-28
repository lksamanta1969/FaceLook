import React, { useState } from "react";
import "./HomePage.css";

import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import StoryBar from "../components/StoryBar";

export default function HomePage() {
  const [postText, setPostText] = useState("");

  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts") || "[]")
  );

  const [newComment, setNewComment] = useState({});
  const [showComment, setShowComment] = useState({});

  const profileImage = localStorage.getItem("profileImage");

  function savePosts(updated) {
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  }

  function addPost() {
    if (!postText.trim()) return;

    const newPost = {
      text: postText,
      likes: 0,
      loves: 0,
      shares: 0,
      comments: [],
      time: new Date().toLocaleString(),
    };

    savePosts([newPost, ...posts]);
    setPostText("");
  }

  function likePost(index) {
    const updated = [...posts];
    updated[index].likes++;
    savePosts(updated);
  }

  function lovePost(index) {
    const updated = [...posts];
    updated[index].loves++;
    savePosts(updated);
  }

  function sharePost(index) {
    const updated = [...posts];
    updated[index].shares++;
    savePosts(updated);

    alert("Post Shared Successfully!");
  }

  function addComment(index) {
    if (!newComment[index]?.trim()) return;

    const updated = [...posts];

    if (!updated[index].comments) {
      updated[index].comments = [];
    }

    updated[index].comments.push({
      text: newComment[index],
      time: new Date().toLocaleTimeString(),
    });

    savePosts(updated);

    setNewComment({
      ...newComment,
      [index]: "",
    });
  }

  return (

  <>
  <Navbar />

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "280px 1fr 280px",
      gap: "20px",
      maxWidth: "1600px",
      margin: "20px auto",
      padding: "20px",
      alignItems: "start",
    }}
  >
    <LeftSidebar />

    {/* CENTER */}
    <div
      style={{
        width: "100%",
        minWidth: 0,
      }}
    >
      <StoryBar />

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
          marginBottom: "20px",
        }}
      >
        <h2>Create Post</h2>

        <textarea
          rows={4}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          style={{
            width: "100%",
            minHeight: "120px",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "15px",
          }}
        >
          <button
            onClick={addPost}
            style={{
              background: "#1877f2",
              color: "#fff",
              border: "none",
              padding: "10px 24px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Post
          </button>
        </div>
      </div>

      {posts.map((p, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div style={{ fontSize: "40px" }}>👤</div>
            )}

            <div>
              <strong>
                {localStorage.getItem("name") ||
                  "Lakshmi Kanta Samanta"}
              </strong>

              <br />

              <small>{p.time}</small>
            </div>
          </div>

          <p style={{ marginTop: "15px" }}>{p.text}</p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              borderTop: "1px solid #eee",
              marginTop: "15px",
              paddingTop: "12px",
            }}
          >
            <button onClick={() => likePost(i)}>
              👍 Like ({p.likes})
            </button>

            <button
              onClick={() =>
                setShowComment({
                  ...showComment,
                  [i]: !showComment[i],
                })
              }
            >
              💬 Comment
            </button>

            <button onClick={() => sharePost(i)}>
              ↗ Share ({p.shares})
            </button>

            <button onClick={() => lovePost(i)}>
              ❤️ Love ({p.loves})
            </button>
          </div>

          {showComment[i] && (
            <div style={{ marginTop: "15px" }}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment[i] || ""}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    [i]: e.target.value,
                  })
                }
                style={{
                  width: "80%",
                  padding: "10px",
                  border: "1px solid #1877f2",
                  borderRadius: "8px",
                }}
              />

              <button
                onClick={() => addComment(i)}
                style={{
                  marginLeft: "10px",
                  padding: "10px 18px",
                  background: "#1877f2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>

              {p.comments?.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    background: "#f5f5f5",
                    borderRadius: "6px",
                  }}
                >
                  <strong>
                    {localStorage.getItem("name") || "Lakshmi Kanta Samanta"}
                  </strong>
                  <br />
                  {c.text}
                  <br />
                  <small>{c.time}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    <RightSidebar />
  </div>
</>
  );
}
