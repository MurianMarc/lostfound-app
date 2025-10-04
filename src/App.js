import React, { useState, useRef } from "react";
import pb from "./pocketbase"; // your PocketBase connection

function App() {
  // State for text description
  const [description, setDescription] = useState("");

  // ✅ Step 2: Create the ref
  const fileInput = useRef(null);

  // ✅ Step 4: Use the ref to upload
  const handleUpload = async () => {
    if (!fileInput.current || !fileInput.current.files[0]) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", fileInput.current.files[0]);

    try {
      await pb.collection("items").create(formData);
      alert("Item uploaded!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "#1e3a8a" }}>Lost & Found</h1>

      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "250px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      {/* ✅ Step 3: Attach the ref */}
      <input type="file" ref={fileInput} style={{ marginBottom: "10px" }} />

      <button
        onClick={handleUpload}
        style={{
          backgroundColor: "#1e3a8a",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
    </div>
  );
}

export default App;
