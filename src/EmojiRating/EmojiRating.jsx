import { useState } from 'react';
import EmojiRating from './EmojiRating/EmojiRating';

function EmojiRating() {
      const[rating, setRating] = useState(0);

      const emoji = ["😡", "🙁", "😐", "😊", "😄"];

  return (
    <div>
      <h1>Click an emoji to rate your mood</h1>
      <EmojiRating />
    </div>
  );
}

export default App;
