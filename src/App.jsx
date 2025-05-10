import React, { useState } from "react";

function App() {
  const[mood, setMood] = useState("");
   const [input, setInput] = useState("");

   const moodToEmoji = { // This is an object literal, also called a dictionary or lookup table.
    happy: "😊",
    sad: "😢",
    tired: "😴",
    stressed: "😰",
    excited: "😄",
    angry: "😡",
    anxious: "😬",
    calm: "😌",
    bored: "🥱"
   };

   const handleSubmit = () => {
    const cleanedInput = input.trim().toLowerCase();
    setMood(input.trim());
    setInput("");
   };

   const emoji = moodToEmoji[mood] || "🤔"; //This line looks up the emoji that matches the current mood:

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh", 
      padding: "2rem" 
    }}>
        <h1>How are you feeling today?</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your mood (e.g., happy, tired)"
          style={{ margin: "1rem", padding: "0.5rem", fontSize: "1rem" }}
          />
          <button 
            onClick={handleSubmit}
            style={{ margin: "1rem", padding: "0.5rem", fontSize: "1rem"}}
          >
            Submit
          </button>

          {mood && (////logical AND (&&) short-circuit to conditionally render something in React.
            <div style={{ marginTop: "2rem", fontSize: "2rem"}}>
              <p> Your mood: <strong>{mood}</strong></p>
              <p>{emoji}</p>
            </div> 
          )}
    </div>
  );
}

export default App;