import React from "react";

function Topbar({ setPage }) {

  return (
    <div
      style={{
        background: "#1877f2",
        padding: "12px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}
    >

      <h2
        style={{
          color: "white",
          marginRight: "20px"
        }}
      >
        FaceLook
      </h2>

      <button onClick={() => setPage("home")}>
        Home
      </button>

      <button onClick={() => setPage("profile")}>
        Profile
      </button>

      <button onClick={() => setPage("friends")}>
        Friends
      </button>

      <button onClick={() => setPage("messages")}>
        Messages
      </button>

      <input
        placeholder="Search..."
        style={{
          marginLeft: "20px",
          padding: "6px",
          borderRadius: "6px",
          border: "none"
        }}
      />

    </div>
  );
}

export default Topbar;