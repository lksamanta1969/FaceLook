import React, { useState } from "react";

function HomePage() {

  const [postText, setPostText] = useState("");

  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts") || "[]")
  );

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
    <div style={{ padding: "20px" }}>

      <h1>🏠 Home</h1>

      <textarea
        value={postText}
        onChange={(e) =>
          setPostText(e.target.value)
        }
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

          <button
            onClick={() => likePost(i)}
          >
            👍 {p.likes}
          </button>

          {" "}

          <button
            onClick={() => lovePost(i)}
          >
            ❤️ {p.loves}
          </button>

        </div>

      ))}

    </div>
  );
}

export default HomePage;