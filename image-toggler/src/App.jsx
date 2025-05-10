import './App.css';
import {useState} from "react";

function App() {
  const [isFirstImage, setisFirstImage] = useState(true);

//That line above does two powerful things:
// 1️⃣ It creates a piece of state inside the component
// React remembers the value of isFirstImage behind the scenes.

// When the component renders for the first time, isFirstImage is true — because you told it to start that way.
// 2️⃣ It gives you a way to change the value using setIsFirstImage

// Summarizing, React is like:
// “Okay, I see you gave me a switch called isFirstImage,
// and you told me that when it’s true, I should grab the first image from imageList.
// Got it. I’ll follow that every time the state changes.

  const imageList = [
    { image: "https://images.ctfassets.net/cnu0m8re1exe/2aIl8AjAypXbl8q5V12QNm/05678fa1351562b443a02561700be233/axotl.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=pad"},
    { image: "https://images.ctfassets.net/cnu0m8re1exe/3A0IFArZpgjabzjWAm9ZS5/66189d2ff905efc67d724efe3901652b/hedgehog.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=pad"}
  ]

  return ( //Ternary says: If isFirstImage is true, show the first image; otherwise, show the second
    <div> 
      <h1>Click to toggle cuteness 🐾</h1>  
      <img src={isFirstImage ? imageList[0].image : imageList[1].image} alt="Cute animal" /> 
      <button onClick={() => setisFirstImage(!isFirstImage)}>
      Toggle Cuteness
      </button>
    </div>
  );
}

export default App;

{/* <img src={isFirstImage ? imageList[0].image : imageList[1].image} alt="Cute animal" /> This line says "“Hey React, show me an image. The image I want depends on a condition:"

  You’re using a ternary operator, which is a fancy way of writing:

if (isFirstImage is true) {
  use imageList[0].image
} else {
  use imageList[1].image
}

REACT KNOWS WHAT IMAGE IS THE FIRST ONE BECAUSE: Because you gave React an array, and arrays always have order.

<button onClick={() => setisFirstImage(!isFirstImage)}>  This ays: When this button is clicked, run this little function:
Flip the value of isFirstImage to the opposite of what it was before.

 What does !isFirstImage mean?
That’s the “not” operator. It means:

If isFirstImage is true → it becomes false

If isFirstImage is false → it becomes true
*/}