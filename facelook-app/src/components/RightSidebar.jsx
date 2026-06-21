import "./RightSidebar.css";

export default function RightSidebar() {
  const friends = [
    "Aparna Samanta",
    "Mainakshi Samanta",
    "Ayeindrila Samanta",
    "Rahul Das",
    "Sourav Roy",
    "Priya Sen",
  ];

  return (
    <div className="rightSidebar">

      <div className="rightCard">

        <h3>Contacts</h3>

        {friends.map((friend, index) => (
          <div className="friendItem" key={index}>
            <img
              src={`https://i.pravatar.cc/100?img=${index + 10}`}
              alt={friend}
            />

            <span>{friend}</span>

            <div className="onlineDot"></div>
          </div>
        ))}

      </div>

      <div className="rightCard">

        <h3>Sponsored</h3>

        <img
          src="https://picsum.photos/300/180"
          alt="Sponsored"
          className="sponsoredImage"
        />

        <p>Build your dream with FaceLook Ads.</p>

      </div>

    </div>
  );
}