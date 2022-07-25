import React, {useState, useEffect} from "react";
import PoemsContainer from "./PoemsContainer";
import NewPoemForm from "./NewPoemForm";

let api = "http://localhost:8004/poems"

function App() {
  const [poems, setPoems] = useState([]);
  const [formVisible, setFormVisible] = useState(true);
  const [VisibleFav, setFavoriteVisible] = useState(true);
  const PoemsToDisplay = poems.filter((poem) => VisibleFav || poem.isFavorite);

  useEffect(() => {
    fetch(api)
      .then(res => res.json())
      .then(data => setPoems(data))
  }, []);

  function AddPoem(NewPoem) {
    setPoems([...poems, NewPoem]);
  }

  function RemovePoem(PoemToRemove) {
    setPoems(poems.filter(poem => poem.id !== PoemToRemove.id))
  }

  function AddToFavorites(FavoritePoem) {
    setPoems(poems.map(poem => {
      return poem.id === FavoritePoem.id ? {...FavoritePoem, isFavorite: !FavoritePoem.isFavorite} : poem
      }  
    ))
  }

  function PoemView() {
    if (PoemsToDisplay.length === 0 && !VisibleFav) {
      return (<h1>You have no favorites added</h1>)
    } else {
      return (
        <PoemsContainer 
          poems={PoemsToDisplay} 
          RemovePoem={RemovePoem} 
          AddToFavorites={AddToFavorites}
        />
      )
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
        <button onClick={() => setFormVisible(!formVisible)}>Show/hide new poem form</button>
        {true ? <NewPoemForm AddPoem={AddPoem}/> : null}
        <button onClick={() => setFavoriteVisible(!VisibleFav)} >
          Show/hide Favorite Poems
        </button>
      </div>
      {PoemView()}
    </div>
  );
}

export default App;
