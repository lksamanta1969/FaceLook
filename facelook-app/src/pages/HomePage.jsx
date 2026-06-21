import LeftSidebar from "../components/LeftSidebar";
import React, { useState } from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import StoryBar from "../components/StoryBar";

export default function HomePage() {
const [postText, setPostText] = useState("");

const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts") || "[]")
  );
const [newComment, setNewComment] = useState({});
const [showComment, setShowComment] = useState({});
const profileImage = localStorage.getItem("profileImage");
const [isFriend, setIsFriend] = useState(false);

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

    const updatedPosts = [newPost, ...posts];

    setPosts(updatedPosts);

    localStorage.setItem(
      "posts",
      JSON.stringify(updatedPosts)
    );

    setPostText("");
  }

  function likePost(index) {
    const updated = [...posts];
    updated[index].likes++;
    setPosts(updated);

    localStorage.setItem(
      "posts",
      JSON.stringify(updated)
    );
  }

  function lovePost(index) {
    const updated = [...posts];
    updated[index].loves++;
    setPosts(updated);

    localStorage.setItem(
      "posts",
      JSON.stringify(updated)
    );
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

  setPosts(updated);
  localStorage.setItem("posts", JSON.stringify(updated));

  setNewComment({
    ...newComment,
    [index]: "",
  });
}
function sharePost(index) {
  const updated = [...posts];

  updated[index].shares = (updated[index].shares || 0) + 1;

  setPosts(updated);

  localStorage.setItem(
    "posts",
    JSON.stringify(updated)
  );

  alert("Post Shared Successfully!");
}

const openFacebook = () => {
  window.open("https://www.facebook.com", "_blank");
};


const openInstagram = () => {
  window.open("https://www.instagram.com", "_blank");
};

const openWhatsApp = () => {
  window.open("https://web.whatsapp.com", "_blank");
};

const openLinkedIn = () => {
  window.open("https://www.linkedin.com", "_blank");
};

const openYouTube = () => {
  window.open("https://www.youtube.com", "_blank");
};

<p onClick={openFacebook}>📘 Facebook</p>

const openX = () => {
  window.open("https://x.com", "_blank");
};

  return (
  <>
    <Navbar />

    <div

      style={{
        display: "grid",
       gridTemplateColumns: "260px minmax(600px, 1fr) 280px",
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
  <h2 style={{ marginTop: 0 }}>Create Post</h2>

  <textarea
    rows="4"
    style={{
  width: "100%",
  minHeight: "120px",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  resize: "vertical",
  boxSizing: "border-box",
  fontSize: "16px",
  fontFamily: "Arial",
  outline: "none",
}}
    value={postText}
    onChange={(e) => setPostText(e.target.value)}
    placeholder="What's on your mind?"
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
  fontWeight: "bold",
  transition: "0.3s",
  boxShadow: "0 2px 8px rgba(24,119,242,.3)",
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
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "15px",
  marginBottom: "15px",
}}  
          >
           <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
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
    <div style={{ fontWeight: "bold" }}>
      {localStorage.getItem("name") || "Lakshmi Kanta Samanta"}
    </div>

    <small style={{ color: "#777" }}>
      {p.time}
    </small>
  </div>
</div> 
            <p>{p.text}</p>


            <br />
            <br />

          <div
  style={{
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid #eee",
    paddingTop: "12px",
    marginTop: "15px",
  }}
>
  <button
    onClick={() => likePost(i)}
    style={{
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "600",
      color: "#555",
    }}
  >
    👍 Like ({p.likes})
  </button>

 <button
  onClick={() =>
    setShowComment({
      ...showComment,
      [i]: !showComment[i],
    })
  }
  style={{
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    color: "#555",
  }}
>
  💬 Comment
</button> 

<button
  onClick={() => sharePost(i)}
  style={{
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    color: "#555",
  }}
>
  ↗ Share
</button>  

  <button
    onClick={() => lovePost(i)}
    style={{
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "600",
      color: "#e91e63",
    }}
  >
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
  background: "#e7f3ff",
  color: "#000",
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
  </div>
)}
          </div>
        ))}
      </div>

      {/* RIGHT SIDEBAR */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          background: "#fff",
        }}
      >
        <h3>Social</h3>

        <p
  onClick={openFacebook}
  style={{ cursor: "pointer" }}
>
  📘 Facebook
</p>
        <p
  onClick={openInstagram}
  style={{ cursor: "pointer" }}
>
  📷 Instagram
</p>
        <p
  onClick={openWhatsApp}
  style={{ cursor: "pointer" }}
>
  💬 WhatsApp
</p>
        <p
  onClick={openLinkedIn}
  style={{ cursor: "pointer" }}
>
  💼 LinkedIn
</p>
        <p
  onClick={openYouTube}
  style={{ cursor: "pointer" }}
>
  ▶️ YouTube
</p>
        <p
  onClick={openX}
  style={{ cursor: "pointer" }}
>
  ❌ X
</p>

        <hr />

        <h3>Online Friends</h3>

        <p>🟢 Rahul</p>
        <p>🟢 Amit</p>
        <p>🟢 Priya</p>
        <p>🟢 Suman</p>
      </div>
    </div>

</>

);
}