import "./CreatePost.css";

export default function CreatePost() {
  const profileImage =
    localStorage.getItem("profileImage") ||
    "https://i.pravatar.cc/100";

  const name =
    localStorage.getItem("name") ||
    "Lakshmi Kanta Samanta";

  return (
    <div className="createPost">
      {/* Top */}
      <div className="createPostTop">
        <img
          src={profileImage}
          alt="Profile"
          className="createProfile"
        />

        <div className="postInfo">
          <h4>{name}</h4>

          <input
            type="text"
            placeholder="What's on your mind?"
            className="postInput"
          />
        </div>
      </div>

      <hr className="postDivider" />

      {/* Bottom */}
      <div className="createPostBottom">
        <button className="postOption">
          📷 Photo
        </button>

        <button className="postOption">
          🎥 Video
        </button>

        <button className="postOption">
          😊 Feeling
        </button>

        <button className="postButton">
          Post
        </button>
      </div>
    </div>
  );
}