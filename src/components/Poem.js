import React, {useState} from "react";

let api = "http://localhost:8004/poems"

function Poem({poem, RemovePoem, AddToFavorites}) {
  //const {title, content, author} = Poem;
  const [isRead, setIsRead] = useState(false)

  function onDeleteClick(e) {
    e.preventDefault();
    fetch(`${api}/${poem.id}`, {
      method: "DELETE",
    });
    RemovePoem(Poem);
  }


  return (
    <div>
      <h3>Title</h3>
      <p>Content</p>
      <p>
        <strong>- By Author</strong>
      </p>
      <button onClick={() => setIsRead(!isRead)} >
        Mark as {isRead ? "unread" : "read" }
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
