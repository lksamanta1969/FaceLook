import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import React, { useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [name, setName] = useState(
    localStorage.getItem("name") || "Lakshmi Kanta Samanta"
  );

  const [bio, setBio] = useState(
    localStorage.getItem("bio") ||
      "Senior Civil Engineer | Project Manager"
  );

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const [coverColor, setCoverColor] = useState(
    localStorage.getItem("coverColor") || "#1877f2"
  );

  function saveProfile() {
    localStorage.setItem("name", name);
    localStorage.setItem("bio", bio);
    localStorage.setItem("profileImage", profileImage);
    localStorage.setItem("coverColor", coverColor);

    alert("✅ Profile Updated Successfully");
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
    <div className="profile-page">

      <div
        className="cover-photo"
        style={{ background: coverColor }}
      >
        <input
          type="color"
          value={coverColor}
          onChange={(e) => setCoverColor(e.target.value)}
          className="cover-picker"
          title="Change Cover Color"
        />
      </div>

      <div className="profile-card">

        <div className="profile-image-box">

          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="profile-placeholder">
              👤
            </div>
          )}

        </div>

        <input
          type="file"
          onChange={uploadImage}
        />

        <input
          className="profile-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />

        <textarea
          className="profile-textarea"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
        />

        <button
          className="save-btn"
          onClick={saveProfile}
        >
          💾 Save Profile
        </button>

      </div>

    </div>
  );
}