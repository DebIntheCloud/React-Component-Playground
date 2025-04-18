import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojiList = [
    { emoji: "😡", label: "Angry" },
    { emoji: "😕", label: "Meh" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🙂", label: "Happy" },
    { emoji: "🤩", label: "Amazing" },
  ];

  return (
      <div>
        <h1>How are you feeling today?</h1>
      <div> 
        {emojiList.map((item, index) => { //this is a super common React pattern. map loops through emojis and render a button for each one. Memorize it
          const isSelected = selectedEmoji === item.label; // This creates a boolean (true or false) value. It checks: “Is the emoji I just clicked (selectedEmoji) the same as this button’s emoji (item.label)?”
        return (
          <button
           key={index} 
           onClick={() => setSelectedEmoji(item.label)}
           style={{
              backgroundColor: isSelected ? "#a0e7e5" : "white", //You’re looking at the ternary operator, aka the fancy if-else in one line
              fontWeight: isSelected ? "bold" : "normal" //ternary operator: condition ? valueIfTrue : valueIfFalse
            }}
          >
            {item.emoji}
          </button> //key={index}keeps track of each element (important when rendering lists). {item.emoji} pulls the emoji from object and puts it inside button
        );
      })}
      </div>
        {selectedEmoji && ( //This part says "Hey React, only show this part if the user clicked an emoji!"
          <div>
            {`You are feeling ${selectedEmoji} today!`}
          </div>
        )}
    </div>
  );
}




export default App
