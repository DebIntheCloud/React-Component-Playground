import { useState } from 'react';


function EmojiRating() {
      const[selectedEmoji, setSelectedEmoji] = useState(0);

    const emojiList = [
    { emoji: "😡", label: "Angry" },
    { emoji: "😕", label: "Meh" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🙂", label: "Happy" },
    { emoji: "🤩", label: "Amazing" },
  ];

    //this block before the return connect this page with the backend
    const sendRating = async (label) => {
        console.log("Sending rating:", label);
    try {
      const res = await fetch("http://localhost:3001/api/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label }),
      });

      const data = await res.json();
      console.log("Server response:", data.message);
    } catch (error) {
      console.error("Failed to send rating:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Click an emoji to rate your mood</h1>

    <div>
        {emojiList.map((item, index) => {
            const isSelected = selectedEmoji === item.label;
                return (
                <button
                key={index} 
                onClick={() => {
                    setSelectedEmoji(item.label);
                    sendRating(item.label);
                    }}
                style={{
                        fontSize: "2rem",
                        cursor: "pointer",
                        margin: "0 5px",
                        opacity: isSelected ? 1 : 0.4
                    }}
                >
            {item.emoji}
          </button>
            );
        })}
    </div>

    {selectedEmoji && (
        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
            You selected: <strong>{selectedEmoji}</strong>
        </p>
    )}
    </div>
);
}

export default EmojiRating;
