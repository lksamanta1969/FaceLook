import React, { useState } from "react";

function ProfilePage() {

  const [name, setName] = useState(
    localStorage.getItem("name") || "Lakshmi"
  );

  const [bio, setBio] = useState(
    localStorage.getItem("bio") || "Hello I am using FaceLook"
  );

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  function saveProfile() {

    localStorage.setItem("name", name);
    localStorage.setItem("bio", bio);
    localStorage.setItem("profileImage", profileImage);

    alert("Profile Saved");
  }

  function uploadImage(e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>👤 Profile</h1>

      {profileImage && (
        <img
          src={profileImage}
          alt=""
          width="120"
          height="120"
          style={{
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
      )}

      <br />
      <br />

      <input
        type="file"
        onChange={uploadImage}
      />

      <br />
      <br />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <br />
      <br />

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        rows="4"
        cols="40"
      />

      <br />
      <br />

      <button onClick={saveProfile}>
        Save Profile
      </button>

    </div>
  );
}

export default ProfilePage;