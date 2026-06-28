import "./FriendsPage.css";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function FriendsPage() {
  const [newFriend, setNewFriend] = useState("");
  const [friends, setFriends] = useState([]);

  async function loadFriends() {
    const querySnapshot = await getDocs(collection(db, "users"));

    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setFriends(users);
  }

  useEffect(() => {
    loadFriends();
  }, []);

  async function addFriend() {
    if (!newFriend.trim()) return;

    if (
      friends.some(
        (f) =>
          (f.name || "").toLowerCase() ===
          newFriend.toLowerCase()
      )
    ) {
      alert("Friend already exists");
      return;
    }

    await addDoc(collection(db, "users"), {
      name: newFriend,
      online: true,
    });

    setNewFriend("");
    loadFriends();
  }

  async function removeFriend(id) {
    await deleteDoc(doc(db, "users", id));
    loadFriends();
  }

  return (
    <div className="friendsPage">
      <h2>Add Friend</h2>

      <div className="addFriendBox">
        <input
          className="friendInput"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
          placeholder="Friend name"
        />

        <button
          className="addButton"
          onClick={addFriend}
        >
          Add Friend
        </button>
        </div>

         <div className="friendList">

        {friends.map((f) => (
        <div
  key={f.id}
  className="friendRow"
>  
   <div className="friendName">  

             <span className="online">🟢</span>
              {f.name}
            </div>

          <button className="actionBtn">💬</button>

<button className="actionBtn">📞</button>

<button
  className="actionBtn deleteBtn"
  onClick={() => removeFriend(f.id)}
>
  🗑️
</button> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendsPage;