// FaceLook App
// GitHub test
import React,{useState,useEffect} from "react";
import "./App.css";
import logo from "./logo.png";
import { auth, db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
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
try {
  await createUserWithEmailAndPassword(auth, email, password);
} catch (error) {
  alert(error.message);
  return;
}

  const user = {
    name: nameInput,
    email,
    password,
  };
  await addDoc(collection(db, "users"), user);
  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup Successful");
  setAuthPage("login");
};
const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("login", "true");
    setIsLoggedIn(true);

    alert("Login Successful");
  } catch (error) {
    alert(error.message);
  }
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

const [friends,setFriends]=useState([])

useEffect(() => {
  const loadUsers = async () => {

    const querySnapshot = await getDocs(collection(db,"users"));

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(users);
    setFriends(users);
  };

  loadUsers();
}, []);

useEffect(() => {
  const online = friends.filter(f => f.online);
  setOnlineUsers(online);
}, [friends]);

const filteredFriends = friends.filter(f =>
(f.name || "").toLowerCase().includes(search.toLowerCase())
);
console.log(friends);
const [newFriend,setNewFriend]=useState("");
const [activeFriend,setActiveFriend]=useState(null);

const [message,setMessage]=useState("");

const [chat,setChat]=useState(
JSON.parse(localStorage.getItem("chat") || "[]")
);

const [call,setCall]=useState(null);
function startCall(friendName,type){

setCall({
name:friendName,
type:type
});

alert(
(type==="video" ? "📹 Video Call to " : "📞 Calling ")
+ friendName
);

}
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

        <button onClick={handleLogin}>
 
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


async function addPost() {

  if(postText === "" && postImages.length === 0) return;
  
  const imagePromises = postImages.map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        resolve(reader.result);
      };
  
      reader.readAsDataURL(file);
    });
  });
  
  const images = await Promise.all(imagePromises);
  
  const newPost = {
    text: postText,
    images,
    likes: 0,
    loves: 0,
    hahas: 0,
    time: new Date().toLocaleString()
  };
  
  const updatedPosts = [newPost, ...posts];
  
  setPosts(updatedPosts);
  
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  
  setPostText("");
  setPostImages([]);
  
  }

function addFriend(){

if(newFriend==="") return;

setFriends([
...friends,
{
id:Date.now(),
name:newFriend,
online:true
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

<img src={logo} width="32" alt=""/>

<b>FaceLook</b>

</div>

<input
placeholder="Search"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
background:"green",
color:"white",
border:"1px solid #0f0",
padding:"8px",
borderRadius:"8px"
}}
/>

{search !== "" && (

<div style={{
position:"fixed",
top:"60px",
left:"120px",
background:"#1f1f1f",
padding:"10px",
borderRadius:"10px",
marginTop:"5px",
width:"220px",
zIndex:"999",
display:"block"
}}>

{filteredFriends.map((f,i)=>(

<div
key={i}
onClick={()=>{
setName(f.name);
setSearch("");
}}
style={{
display:"flex",
alignItems:"center",
gap:"10px",
padding:"6px"
}}
>

<img
src={f.img || logo}
width="35"
height="35"
style={{borderRadius:"50%"}}
alt=""
/>

<span style={{color:"white"}}>
  {f.name}
</span>

<button
onClick={()=>startCall(f.name,"audio")}
style={{
marginLeft:"10px",
background:"#1877f2",
border:"none",
color:"white",
padding:"5px 8px",
borderRadius:"6px",
cursor:"pointer"
}}
>
📞
</button>

<button
onClick={()=>startCall(f.name,"video")}
style={{
marginLeft:"5px",
background:"#1877f2",
border:"none",
color:"white",
padding:"5px 8px",
borderRadius:"6px",
cursor:"pointer"
}}
>
📹
</button>


</div>

))}

</div>

)}


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

<div style={{
display:"flex",
flexDirection:"column",
gap:"14px",
alignItems:"center"
}}>

<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:"4px"
}}>
<button style={{
background:"#1877f2",
color:"white",
border:"none",
padding:"14px",
borderRadius:"12px",
fontSize:"20px",
width:"55px",
height:"55px",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}>
f
</button>

<span style={{
color:"white",
fontSize:"12px"
}}>
Facebook
</span>
</div>


<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:"4px"
}}>
<button style={{
background:"#E1306C",
color:"white",
border:"none",
padding:"14px",
borderRadius:"12px",
fontSize:"20px",
width:"55px",
height:"55px",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}>
📷
</button>

<span style={{
color:"white",
fontSize:"12px"
}}>
Instagram
</span>
</div>


<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:"4px"
}}>
<button style={{
background:"#25D366",
color:"white",
border:"none",
padding:"14px",
borderRadius:"12px",
fontSize:"20px",
width:"55px",
height:"55px",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}>
💬
</button>

<span style={{
color:"white",
fontSize:"12px"
}}>
WhatsApp
</span>
</div>


<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:"4px"
}}>
<button style={{
background:"#0A66C2",
color:"white",
border:"none",
padding:"14px",
borderRadius:"12px",
fontSize:"20px",
width:"55px",
height:"55px",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}>
in
</button>

<span style={{
color:"white",
fontSize:"12px"
}}>
LinkedIn
</span>
</div>


<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:"4px"
}}>
<button
onClick={()=>window.open("https://youtube.com")}
style={{
background:"red",
color:"white",
border:"none",
padding:"14px",
borderRadius:"12px",
fontSize:"20px",
width:"55px",
height:"55px",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}
>
▶
</button>

<span style={{
color:"white",
fontSize:"12px"
}}>
YouTube
</span>
</div>


<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:"4px"
}}>
<button style={{
background:"black",
color:"white",
border:"none",
padding:"14px",
borderRadius:"12px",
fontSize:"20px",
width:"55px",
height:"55px",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}>
𝕏
</button>

<span style={{
color:"white",
fontSize:"12px"
}}>
X
</span>
</div>

</div>

</div>

{filteredFriends.map((f,i)=>(

<div
key={i}
style={{
display:"flex",
alignItems:"center",
gap:"10px",
marginBottom:"10px"
}}
>

<img
src={f.img}
width="40"
height="40"
style={{borderRadius:"50%"}}
alt=""
/>

<div
style={{
background:"chocolate",
padding:"6px 12px",
borderRadius:"20px",
color:"white",
fontWeight:"500"
}}
>
🟢 {f.name || "Friend"}
</div>


<div
key={i}
style={{
display:"flex",
alignItems:"center",
gap:"10px",
marginBottom:"10px"
}}
>

<img
src={f.img}
width="40"
height="40"
style={{borderRadius:"50%"}}
alt=""
/>


<button
onClick={()=>{
setActiveFriend(f.name);
setPage("messages");
}}
>
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

))}

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
  
<div style={{
position:"fixed",
right:"20px",
bottom:"120px",
background:"#1f1f1f",
padding:"15px",
borderRadius:"12px",
zIndex:"999",
width:"320px"
}}>


    <h4>Online Results</h4>

 {onlineUsers.map((f, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px"
    }}
  >
    <img
      src={f.img}
      width="40"
      height="40"
      style={{ borderRadius: "50%" }}
      alt=""
    />

    <div>
      🟢 {f.name}
    </div>

    <button
      onClick={() => {
        setActiveFriend(f.name);
        setPage("messages");
      }}
    >
      💬
    </button>

    <button onClick={() => startCall(f.name, "audio")}>
      📞
    </button>

    <button onClick={() => startCall(f.name, "video")}>
      📹
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

<div
key={i}
style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
gap:"10px",
marginBottom:"10px",
width:"100%"
}}
>

<div style={{
display:"flex",
alignItems:"center",
gap:"8px"
}}>
  🟢 {f.name}
</div>

<div style={{
display:"flex",
gap:"5px"
}}>
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

</div>

);
}

export default App;