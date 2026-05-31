import React, { useState, useEffect } from "react";

import { db } from "../firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

function FriendsPage() {

  const [newFriend, setNewFriend] = useState("");

  const [friends, setFriends] = useState([]);

  async function loadFriends() {

    const querySnapshot =
      await getDocs(collection(db, "users"));

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setFriends(users);
  }

  useEffect(() => {
    loadFriends();
  }, []);

  async function addFriend() {

    if (newFriend.trim() === "") return;
    if (
  friends.some(
    f =>
      (f.name || "").toLowerCase() ===
      newFriend.toLowerCase()
  )
) {
  alert("Friend already exists");
  return;
}

    await addDoc(collection(db, "users"), {
      name: newFriend,
      online: true
    });

    setNewFriend("");

    loadFriends();
  }
async function removeFriend(id) {

  await deleteDoc(doc(db, "users", id));

  loadFriends();
}
  return (
    <div style={{ padding: "20px" }}>

      <h1>👥 Friends</h1>

      <input
        value={newFriend}
        onChange={(e) =>
          setNewFriend(e.target.value)
        }
        placeholder="Friend Name"
      />

      <button onClick={addFriend}>
        Add Friend
      </button>

      <hr />

    {friends.map((f) => (

  <div
    key={f.id}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "8px"
    }}
  >

    <div>
      🟢 {f.name}
    </div>

    <button
      onClick={() => removeFriend(f.id)}
      style={{
        background: "red",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Remove
    </button>

  </div>

))}  

    </div>
  );
}

export default FriendsPage;