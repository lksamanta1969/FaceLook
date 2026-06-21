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
  <div
    style={{
      padding: "20px",
      maxWidth: "450px"
    }}
  >
    <h2>Add Friend</h2>

    <div
      style={{
        display: "flex",
        marginBottom: "15px",
        gap: "10px"
      }}
    >
      <input
        value={newFriend}
        onChange={(e) => setNewFriend(e.target.value)}
        placeholder="friend name"
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "5px"
        }}
      />

      <button onClick={addFriend}>
        Add
      </button>
    </div>

    {friends.map((f) => (
      <div
        key={f.id}
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
          gap: "10px"
        }}
      >
        <div
          style={{
            background: "#d46f1a",
            color: "#fff",
            borderRadius: "20px",
            padding: "8px 15px",
            minWidth: "220px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <span style={{ color: "#7CFC00" }}>🟢</span>
          {f.name}
        </div>

        <button>💬</button>
        <button>📞</button>

        <button
          onClick={() => removeFriend(f.id)}
          style={{
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          🗑️
        </button>
      </div>
    ))}
  </div>
); 
}

export default FriendsPage;