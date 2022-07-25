import React, {useState} from "react";

//const apikey = "http://localhost:8004/poems";

function Poem({poem, RemovePoem, AddToFavorites}) {
  const {title, content, author} = poem;
  const [isRead, setIsRead] = useState(false)

  function onDeleteClick(e) {
    e.preventDefault();
    fetch(`http://localhost:8004/poems/${poem.id}`, {
      method: "DELETE",
    });
    RemovePoem(poem);
    
  }


  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>
        <strong>- By {author}:</strong>
      </p>
      <button onClick={() => setIsRead(!isRead)} >
        Mark as {isRead ? "Unread" : "Read" }
      </button>
      <button onClick={onDeleteClick} >
        Delete Poem
      </button>
      <button onClick={() => AddToFavorites(poem)}>
        {poem.isFavorite ? "Dislike" : "♥ Favorite" }
      </button>
    </div>
  );
}

export default Poem;
