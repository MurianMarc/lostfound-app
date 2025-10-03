import React, { useState } from "react";
import pb from "./pocketbase";
import "./App.css"; // we’ll add some CSS here

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // Sign up
  const handleSignup = async () => {
    try {
      await pb.collection("users").create({
        email: email,
        password: password,
        passwordConfirm: password,
        name: email.split("@")[0],
      });
      alert("✅ Account created! Please log in.");
    } catch (err) {
      alert("❌ Error signing up: " + err.message);
    }
  };

  // Login
  const handleLogin = async () => {
    try {
      await pb.collection("users").authWithPassword(email, password);
      setLoggedIn(true);
    } catch (err) {
      alert("❌ Login failed: " + err.message);
    }
  };

  // Upload item
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", "found");
    formData.append("photo", file);
    formData.append("owner", pb.authStore.model.id);

    try {
      await pb.collection("items").create(formData);
      alert("✅ Item uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      alert("❌ Error uploading item: " + err.message);
    }
  };

  // Search items
  const handleSearch = async () => {
    try {
      const res = await pb.collection("items").getList(1, 20, {
        filter: `title ~ "${search}" || description ~ "${search}"`,
      });
      setResults(res.items);
    } catch (err) {
      alert("❌ Error searching: " + err.message);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🔎 School Lost & Found</h1>
      </header>

      {!loggedIn ? (
        <div className="card">
          <h2>Welcome</h2>
          <p>Please sign up or log in to continue</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <div className="btn-group">
            <button onClick={handleSignup} className="btn">Sign Up</button>
            <button onClick={handleLogin} className="btn primary">Login</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="card">
            <h2>Upload Found Item</h2>
            <input
              type="text"
              placeholder="Item title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /><br />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /><br />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            /><br />
            <button onClick={handleUpload} className="btn primary">Upload</button>
          </div>

          <div className="card">
            <h2>Search Items</h2>
            <input
              type="text"
              placeholder="Search keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            /><br />
            <button onClick={handleSearch} className="btn">Search</button>

            <ul className="results">
              {results.map((item) => (
                <li key={item.id} className="result-card">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  {item.photo && (
                    <img
                      src={`${pb.baseUrl}/api/files/items/${item.id}/${item.photo}`}
                      alt="item"
                      className="item-img"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
