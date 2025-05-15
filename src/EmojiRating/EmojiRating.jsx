import { useState, useEffect } from 'react';


function EmojiRating() {
      const [selectedEmoji, setSelectedEmoji] = useState(0);
      const [history, setHistory] = useState([]);
      // The line above: CREATES A STATE VARIABLE NAMED HISTORY, GIVES A FUNCTION CALLED SETHISTORY TO UPDATED IT LATER, REACTIVELY TRIGGERS A RE-RENDER WHEN SETHISTORY() IS CALLED

  useEffect(() => {
    fetch("http://localhost:3001/api/ratings") //“Dear backend, I (the browser) am requesting data from the route /api/ratings. Please respond with something.”
      .then((res) => res.json()) //“Convert the response into an actual JS object or array I can use.”
      .then((data) => {  //Takes data and 
        setHistory(data); //and saves it into your component’s state using setHistory
      })
      .catch((err) => {
        console.error("Failed to fetch rating history:", err);
      });
  }, []);     

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

    const resetHistory = () => { //I’m creating a new function called resetHistory. I’ll run this when the user clicks the Reset button
      fetch("http://localhost:3001/api/ratings", { //Hey browser, please send a request to my backend, at the /api/ratings route.
        method: "DELETE", //This request is a DELETE request — I’m not asking for data, I’m telling the backend to delete something.
      }) //Closing the fetch options. 
      .then ((res) => res.json()) //Once the server responds, take that response and convert it from a raw HTTP response into a JavaScript object
      .then(() => { //“After converting the response, now run this code:
          setHistory([]);// Clear the history on the frontend (in React state). Just make it an empty array
          setSelectedEmoji(0); //Reset the selected emoji to zero — which means: 'none is selected now.
      })
      .catch((err) => console.error("Failed to reset history:", err));
    }

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

    {/* ✅ Reset Button goes here */}
    <button
      onClick={resetHistory}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        cursor: "pointer",
        backgroundColor: "#e74c3c", // red
        color: "white",
        border: "none",
        borderRadius: "5px",
        marginBottom: "2rem"
      }}
    >
      Reset History
    </button>

    {history.length > 0 && ( //Conditional rendering: && means: If the left side is true, then show/render the right side => Only render this block of JSX if there’s at least one history entry.””
        <div style={{ marginTop: "2rem" }}>
          <h2>Past Mood Ratings:</h2>
          <ul>
            {history.map((entry, idx) => ( //You’re looping through the history array using .map(). entry is the current object (like { label: "Happy", idx is the index (0, 1, 2, etc.) — used as a React key)
              <li key={idx}> //
                {entry.label} – {new Date(entry.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
    )}
      </div>
);
}

export default EmojiRating;

//                {entry.label} – {new Date(entry.timestamp).toLocaleString()} 
//                This line creates one list item (<li>) for each mood rating, showing:
//                *the mood label (e.g., "Happy")
//                *and the time it was submitted, formatted nicely using toLocaleString().
//                The key={idx} helps React keep track of list items efficiently.