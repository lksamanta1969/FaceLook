import "./CreatePost.css";

export default function CreatePost() {
  return (
    <div className="createPost">
      <div className="createPostTop">
        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="createProfile"
        />

        <input
          type="text"
          placeholder="What's on your mind?"
          className="postInput"
        />
      </div>

      <div className="createPostBottom">
        <button>📷 Photo</button>
        <button>🎥 Video</button>
        <button>😊 Feeling</button>
      </div>
    </div>
  );
}