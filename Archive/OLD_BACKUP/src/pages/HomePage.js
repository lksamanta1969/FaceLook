import React, { useState } from "react";

function HomePage() {
  const [postText, setPostText] = useState("");

  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts") || "[]")
  );
const profileImage = localStorage.getItem("profileImage");
  function addPost() {
    if (postText.trim() === "") return;

    const newPost = {
      text: postText,
      likes: 0,
      loves: 0,
      time: new Date().toLocaleString()
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

    updated[index].likes += 1;

    setPosts(updated);

    localStorage.setItem(
      "posts",
      JSON.stringify(updated)
    );
  }

  function lovePost(index) {
    const updated = [...posts];

    updated[index].loves += 1;

    setPosts(updated);

    localStorage.setItem(
      "posts",
      JSON.stringify(updated)
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 180px 1fr",
        gap: "20px",
        padding: "20px"
      }}
    >
      {/* LEFT MENU */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "10px",
          background: "#fff"
        }}
      >
      <div style={{textAlign:"center",marginBottom:"20px"}}>

{profileImage ? (
  <img
    src={profileImage}
    alt="Profile"
    style={{
      width:"120px",
      height:"120px",
      borderRadius:"50%",
      objectFit:"cover",
      border:"4px solid #1877f2",
      display:"block",
      margin:"auto"
    }}
  />
) : (
  <div
    style={{
      width:"120px",
      height:"120px",
      borderRadius:"50%",
      border:"4px solid #1877f2",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      fontSize:"60px",
      margin:"auto"
    }}
  >
    👤
  </div>
)}

<h3>Lakshmi Kanta</h3>

</div>
        <h3>Menu</h3>
        <p>👤 Profile</p>
        <p>👥 Friends</p>
        <p>👨‍👩‍👧 Groups</p>
        <p>📄 Pages</p>
        <p>🔖 Saved</p>
        <p>⚙️ Settings</p>
      </div>

      {/* SOCIAL */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "10px",
          background: "#fff"
        }}
      >
        <h3>Social</h3>
        <p>📘 Facebook</p>
        <p>📷 Instagram</p>
        <p>💬 WhatsApp</p>
        <p>💼 LinkedIn</p>
        <p>▶️ YouTube</p>
       
        <p>❌ X</p>
        <hr />

<h3>Messages</h3>

<p>💬 Rahul</p>
<p>💬 Amit</p>
<p>💬 Priya</p>
<p>💬 Suman</p>
      </div>

      {/* POSTS */}
      <div>
        <h1>🏠 Home</h1>

        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          cols="50"
        />

        <br />
        <br />

        <button onClick={addPost}>
          Post
        </button>

        <hr />

        {posts.map((p, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px"
            }}
          >
            <p>{p.text}</p>

            <small>{p.time}</small>

            <br />
            <br />

            <button onClick={() => likePost(i)}>
              👍 {p.likes}
            </button>

            {" "}

            <button onClick={() => lovePost(i)}>
              ❤️ {p.loves}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;