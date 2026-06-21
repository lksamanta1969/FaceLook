import "./StoryBar.css";

export default function StoryBar() {
  const stories = [
    {
      id: 1,
      name: "Aparna",
      image: "https://i.pravatar.cc/200?img=5",
    },
    {
      id: 2,
      name: "Mainakshi",
      image: "https://i.pravatar.cc/200?img=15",
    },
    {
      id: 3,
      name: "Ayeindrila",
      image: "https://i.pravatar.cc/200?img=25",
    },
    {
      id: 4,
      name: "Rahul",
      image: "https://i.pravatar.cc/200?img=35",
    },
    {
      id: 5,
      name: "Sourav",
      image: "https://i.pravatar.cc/200?img=45",
    },
  ];

  return (
    <div className="storyBar">
      {stories.map((story) => (
        <div className="storyCard" key={story.id}>
          <img src={story.image} alt={story.name} />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
}