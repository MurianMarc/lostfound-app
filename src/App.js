import React, { useState, useRef } from "react";
import pb from "./pocketbase";

function App() {
  const [description, setDescription] = useState("");
  const fileInput = useRef(null);

  const handleUpload = async () => {
    if (!fileInput.current || !fileInput.current.files[0]) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", fileInput.current.files[0]);

    await pb.collection("items").create(formData);
    alert("Item uploaded!");
  };

  return (
    <div>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
      />
      <input type="file" ref={fileInput} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
