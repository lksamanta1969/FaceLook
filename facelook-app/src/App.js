// FaceLook App
// GitHub test
import React,{useState,useEffect} from "react";
import "./App.css";
import logo from "./logo.png";
import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

function App(){
useEffect(() => {
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    setProfileImage(savedImage);
  }
}, []);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );

const [authPage, setAuthPage] = useState("login");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [page, setPage] = useState("home");

const [name, setName] = useState(
  localStorage.getItem("name") || "Lakshmi"
);
const [bio, setBio] = useState(
  localStorage.getItem("bio") || "Hello I am using FaceLook"
);
const [onlineUsers, setOnlineUsers] = useState([]);
// ✅ Signup Function (must be above JSX)
const handleSignup = async () => {
  const nameInput = name;

  if (!nameInput || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = {
    name: nameInput,
    email,
    password
  };
  await addDoc(collection(db, "users"), user);
  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup Successful");
  setAuthPage("login");
};

const [profileImage, setProfileImage] = useState(
  localStorage.getItem("profileImage")
);

const [postText,setPostText]=useState("");
const [postImages,setPostImages]=useState([]);

const [posts,setPosts]=useState(
JSON.parse(localStorage.getItem("posts") || "[]")
);

const [search,setSearch]=useState("");

const filteredPosts = posts.filter(post =>
(post.text || "").toLowerCase().includes(search.toLowerCase())
);

const [friends,setFriends]=useState(
JSON.parse(localStorage.getItem("friends") || "null") || [
{id:1,name:"Rahul",online:true,img:"https://i.pravatar.cc/40?img=1"},
{id:2,name:"Priya",online:false,img:"https://i.pravatar.cc/40?img=2"}
]
);

const filteredFriends = friends.filter(f =>
(f.name || "").toLowerCase().includes(search.toLowerCase())
);

const [newFriend,setNewFriend]=useState("");
const [activeFriend,setActiveFriend]=useState(null);

const [message,setMessage]=useState("");

const [chat,setChat]=useState(
JSON.parse(localStorage.getItem("chat") || "[]")
);

const [call,setCall]=useState(null);

const [dark,setDark]=useState(
JSON.parse(localStorage.getItem("dark") || "false")
);

useEffect(()=>{
localStorage.setItem("posts",JSON.stringify(posts))
},[posts]);

useEffect(()=>{
localStorage.setItem("friends",JSON.stringify(friends))
},[friends]);

useEffect(()=>{
localStorage.setItem("chat",JSON.stringify(chat))
},[chat]);
// ✅ Bengali users list (OUTSIDE useEffect)
const bengaliUsers = [
  { id: 101, firstName: "Sourav", lastName: "Das" },
  { id: 102, firstName: "Priya", lastName: "Sen" },
  { id: 103, firstName: "Amit", lastName: "Roy" },
  { id: 104, firstName: "Moumita", lastName: "Paul" },
  { id: 105, firstName: "Subhajit", lastName: "Ghosh" }
];

// ✅ First load
useEffect(() => {
  setOnlineUsers(bengaliUsers);
}, []);

// ✅ Search filter
useEffect(() => {
  if (search.trim() === "") {
    setOnlineUsers(bengaliUsers);
    return;
  }

  const filtered = bengaliUsers.filter(u =>
    (u.firstName + " " + u.lastName)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  setOnlineUsers(filtered);
}, [search]);

useEffect(()=>{
localStorage.setItem("dark",JSON.stringify(dark))
},[dark]);
useEffect(() => {
  if (profileImage) {
    localStorage.setItem("profileImage", profileImage);
  }
}, [profileImage]);
// line 75-76 এর পরে

if (!isLoggedIn) {

  if (authPage === "login") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Login</h1>

        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={() => {
          const user = JSON.parse(localStorage.getItem("user") || "null");

          if (!user) {
            alert("No account found. Please sign up.");
            return;
          }

          if (email === user.email && password === user.password) {
            localStorage.setItem("login", "true");
            setIsLoggedIn(true);
          } else {
            alert("Wrong email or password");
          }
        }}>
          Login
        </button>

        <p>
          Don't have account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setAuthPage("signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    );
  }

  if (authPage === "signup") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button onClick={handleSignup}>Sign Up</button>

        <p>
          Already have account?{" "}
          <span 
            onClick={() => setAuthPage("login")} 
            style={{color:"blue", cursor:"pointer"}}
          >
            Login
          </span>
        </p>
      </div>
    );
  }

}


 if (authPage === "signup") {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Sign Up</h2>

      <input
  type="text"
  placeholder="Name"
  onChange={(e) => setName(e.target.value)}
/><br /><br />

<input
  type="email"
  placeholder="Email"
  onChange={(e) => setEmail(e.target.value)}
/><br /><br />

<input
  type="password"
  placeholder="Password"
  onChange={(e) => setPassword(e.target.value)}
/>
      <br /><br />

      <button onClick={handleSignup}>Sign Up</button>

      <p>
        Already have account?{" "}
        <span onClick={() => setAuthPage("login")} style={{color:"blue", cursor:"pointer"}}>
          Login
        </span>
      </p>
    </div>
  );
}


function addPost(){

if(postText==="" && postImages.length===0) return;

const images=postImages.map(f=>URL.createObjectURL(f));

const newPost={
text:postText,
images,
likes:0,
loves:0,
hahas:0,
time:new Date().toLocaleString()
};

setPosts([newPost,...posts]);

setPostText("");
setPostImages([]);

}

function addFriend(){

if(newFriend==="") return;

setFriends([
...friends,
{
id:Date.now(),
name:newFriend
}
]);
setOnlineUsers(onlineUsers.filter(u => 
  (u.firstName + " " + u.lastName) !== newFriend
));
setNewFriend("");

}

function sendMessage(){

if(message==="" || !activeFriend) return;

const newChat = [
  ...chat,
  {
    text: message,
    friend: activeFriend,
    sender: "me",   // ⭐ এইটা main fix
    time: new Date().toLocaleTimeString()
  }
];

setChat(newChat);

setMessage("");

}

function startCall(friend,type){

setCall({
friend,
type
});

}

function endCall(){

setCall(null);

}

return(

<div className={dark?"dark":""}>

{/* TOPBAR */}

<div className="topbar">

<div style={{display:"flex",alignItems:"center",gap:"8px"}}>

<img src={logo} width="32"/>

<b>FaceLook</b>

</div>

<input
placeholder="Search"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button onClick={() => { setPage("home"); setSearch(""); }}>Home</button>

<button onClick={() => { setPage("profile"); setSearch(""); }}>Profile</button>

<button onClick={() => { setPage("friends"); setSearch(""); }}>Friends</button>

<button onClick={() => { setPage("messages"); setSearch(""); }}>Messages</button>

<button style={{
background:"white",
border:"none",
padding:"6px 10px",
borderRadius:"6px"
}}>
🔔 3
</button>

<button onClick={()=>setDark(!dark)}>
{dark?"☀":"🌙"}
</button>

</div>


{/* HOME */}

{page==="home" && (

<div className="layout">

<div className="left">

<h3>{name}</h3>

{profileImage &&
<img src={profileImage} width="80" alt=""/>
}

<p>{bio}</p>

<hr/>

<h4>Friends</h4>



</div>


<div className="center">

<h3>Create Post</h3>

<textarea
placeholder="write post"
value={postText}
onChange={(e)=>setPostText(e.target.value)}
/>

<br/>

<input
type="file"
multiple
onChange={(e)=>{
  const files = e.target.files;

  if(!files || files.length === 0) return;

  setPostImages([...files]);
}}
/>
<button onClick={addPost}>Post</button>

{filteredPosts.map((p,i)=>(

<div key={i} className="post">

<p>{p.text}</p>

{p.images && p.images.map((img,ii)=>(

<img key={ii} src={img} alt=""/>

))}

<button onClick={()=>{
const updated = posts.map((post) =>
  post === p ? { ...post, likes: (post.likes || 0) + 1 } : post
);
setPosts(updated);
}}>
👍 {p.likes}
</button>

<button onClick={()=>{
const updated = posts.map((post) =>
  post === p ? { ...post, loves: (post.loves || 0) + 1 } : post
);
setPosts(updated);

}}>
❤️ {p.loves}
</button>

<button onClick={()=>{
const updated = posts.map((post) =>
  post === p ? { ...post, hahas: (post.hahas || 0) + 1 } : post
);
setPosts(updated);
}}>
😂 {p.hahas}
</button>

</div>

))}

</div>


<div className="right">

<h4>Contacts</h4>

{filteredFriends.map(f=>(

<div key={f.id}>
🟢 {f.name}
</div>

))}

</div> 
</div>
)}

{page==="profile" && (

<div className="profile">

  {/* Cover */}
  <div
    style={{
      height: "220px",
      background: "linear-gradient(135deg,#1e40af,#2563eb)",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        fontSize: "48px",
        fontWeight: "700",
        color: "#ffffff",
        letterSpacing: "2px",
        textShadow: "0 6px 25px rgba(0,0,0,0.45)",
      }}
    >
      FaceLook
    </div>
  </div>

  {/* Profile Image */}
  <div className="profile-img">
    <div className="profile-circle">
      <img src={profileImage || logo} alt="profile" />
    </div>
  </div>

  {/* Upload */}
  <input
    type="file"
   onChange={(e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result); // base64 image
      localStorage.setItem("profileImage", reader.result); // save
    };

    reader.readAsDataURL(file);
  }
}} 
  />

  <h2>{name}</h2>

  <input
    value={name}
    onChange={(e)=>{
      setName(e.target.value);
      localStorage.setItem("name", e.target.value);
    }}
  />

  <br/><br/>

  <textarea
    value={bio}
    onChange={(e)=>{
      setBio(e.target.value);
      localStorage.setItem("bio", e.target.value);
    }}
  />

</div>

)}


{/* FRIENDS */}

{page==="friends" && (

<div className="center">

<h3>Add Friend</h3>
{onlineUsers.length > 0 && (
  <div>
    <h4>Online Results</h4>

    {onlineUsers.map(user => (
      <div key={user.id} style={{ marginBottom: "10px" }}>
        <img 
          src={user.image} 
          width="40" 
          style={{ borderRadius: "50%", marginRight: "8px" }} 
        />
        {user.firstName} {user.lastName}

        <button onClick={() => {
        const fullName = user.firstName + " " + user.lastName;

if (friends.some(f => f.name === fullName)) return;

setFriends([
  ...friends,
  {
    id: Date.now(),
    name: fullName,
    online: true
  }
]);

setOnlineUsers(onlineUsers.filter(u => u.id !== user.id));  
        }}>
          Add
        </button>
      </div>
    ))}
  </div>
)}
<input
value={newFriend}
onChange={(e)=>setNewFriend(e.target.value)}
placeholder="friend name"
/>

<button onClick={addFriend}>
Add
</button>


{filteredFriends.map((f,i)=>(

<div key={i}>

🟢 {f.name}

<button onClick={()=>{
setActiveFriend(f.name);
setPage("messages");
}}>
💬
</button>

<button onClick={()=>startCall(f.name,"audio")}>
📞
</button>

<button onClick={()=>startCall(f.name,"video")}>
📹
</button>

</div>

))}

</div>

)}



{/* MESSAGE */}

{page==="messages" && (

<div className="center">

<h3>
Chat with {activeFriend || "select friend"}</h3>


<div className="chat-box">
  {chat
    .filter(c => c.friend === activeFriend)
    .map((c, i) => (
      <div
        key={i}
        className={`message ${c.sender === "me" ? "sent" : "received"}`}
      >
        {c.text}
      </div>
    ))}
</div>


<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
onKeyDown={(e)=>{
if(e.key==="Enter"){
sendMessage();
}
}}
placeholder="message"
/>

<button onClick={sendMessage}>Send</button>

</div>

)}



{/* CALL POPUP */}

{call && (

<div style={{
position:"fixed",
top:"40%",
left:"40%",
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px rgba(0,0,0,0.3)"
}}>

<h3>
{call.type==="video"?"📹":"📞"}
Calling {call.friend}
</h3>

<button onClick={endCall}>
End Call
</button>

</div>

)}



{/* SOCIAL ICONS */}

<div style={{
position:"fixed",
right:"12px",
top:"30%",
display:"flex",
flexDirection:"column",
gap:"12px"
}}>

<a href="https://wa.me" target="_blank">
<img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" width="42"/>
</a>

<a href="https://facebook.com" target="_blank">
<img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="42"/>
</a>

<a href="https://instagram.com" target="_blank">
<img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="42"/>
</a>

<a href="https://twitter.com" target="_blank">
<img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="42"/>
</a>

<a href="https://linkedin.com" target="_blank">
<img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="42"/>
</a>

<a href="https://t.me" target="_blank">
<img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" width="42"/>
</a>

</div>
</div>
);
}
export default App;