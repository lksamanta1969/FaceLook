import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
const peerConnection = new RTCPeerConnection();
function MessagePage() {

  const [friend, setFriend] = useState("");
  const [message, setMessage] = useState("");
 const [messages, setMessages] = useState([]);
 const [incomingCall, setIncomingCall] = useState(null);
 useEffect(() => {

  socket.on("incoming-call", (data) => {
    setIncomingCall(data);
  });

  socket.on("call-answered", () => {
    alert("Call Accepted");
  });

  return () => {
    socket.off("incoming-call");
    socket.off("call-answered");
  };

}, []);

  const [chat, setChat] = useState(
    JSON.parse(localStorage.getItem("chat") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(chat));
  }, [chat]);

  function sendMessage() {

    if (friend.trim() === "") return;
    if (message.trim() === "") return;

    const newMessage = {
      friend,
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString()
    };

    setChat([...chat, newMessage]);
    setMessage("");
  }

  return (
    <div style={{ padding: "20px" }}>
        {incomingCall && (

<div
style={{
position:"fixed",
top:"20px",
right:"20px",
background:"white",
padding:"20px",
border:"1px solid #ddd",
zIndex:999
}}
>

<h3>
Incoming {incomingCall.type} Call
</h3>

<p>
From: {incomingCall.name}
</p>

<button
onClick={()=>{
socket.emit("answer-call");
setIncomingCall(null);
}}
>
Accept
</button>

</div>

)}
{
incomingCall && (

<div
style={{
position:"fixed",
top:"20px",
right:"20px",
background:"white",
padding:"20px",
border:"1px solid #ccc",
borderRadius:"10px",
zIndex:9999
}}
>

<h3>
Incoming {incomingCall.type} Call
</h3>

<p>{incomingCall.name}</p>

<button
onClick={()=>{
socket.emit("answer-call", incomingCall);
setIncomingCall(null);
}}
>
Accept
</button>

<button
onClick={()=>{
setIncomingCall(null);
}}
>
Reject
</button>

</div>

)
}
      <h1>💬 Messages</h1>

      <input
        value={friend}
        onChange={(e) => setFriend(e.target.value)}
        placeholder="Friend Name"
      />

      <br /><br />

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type Message"
        style={{ width: "300px" }}
      />

      <button onClick={sendMessage}>
        Send
      </button>
<button
 onClick={() => {
 navigator.mediaDevices
.getUserMedia({
  audio: true,
  video: false
})
.then(stream => {

  stream.getTracks().forEach(track => {
    peerConnection.addTrack(track, stream);
  });

  socket.emit("call-user", {
    name: friend,
    type: "audio"
  });

}); 
}} 
>
  📞 Call
</button>

<button
 onClick={() => {
 navigator.mediaDevices
.getUserMedia({
  audio: true,
  video: true
})
.then(stream => {

  stream.getTracks().forEach(track => {
    peerConnection.addTrack(track, stream);
  });

  socket.emit("call-user", {
    name: friend,
    type: "video"
  });

}); 
}} 
>
  📹 Video
</button>

      <hr />

      {chat.map((c, i) => (

        <div
          key={i}
          style={{
            background: "#f1f1f1",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "10px"
          }}
        >
          <b>{c.friend}</b>

          <p>{c.text}</p>

          <small>{c.time}</small>
        </div>

      ))}

    </div>
  );
}

export default MessagePage;