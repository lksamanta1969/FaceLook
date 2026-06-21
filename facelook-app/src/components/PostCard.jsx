import "./PostCard.css";

export default function PostCard() {
  return (
    <div className="postCard">

      <div className="postHeader">

        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Profile"
          className="postProfile"
        />

        <div>
          <h3>Lakshmi Kanta</h3>
          <p>Just now</p>
        </div>

      </div>

      <div className="postContent">
        <p>
          Welcome to FaceLook Professional Version 🚀
        </p>

        <img
          src="https://picsum.photos/700/450"
          alt="Post"
          className="postImage"
        />
      </div>

      <div className="postFooter">

        <button>👍 Like</button>

        <button>❤️ Love</button>

        <button>😂 Haha</button>

        <button>💬 Comment</button>

        <button>↗ Share</button>

      </div>

    </div>
  );
}