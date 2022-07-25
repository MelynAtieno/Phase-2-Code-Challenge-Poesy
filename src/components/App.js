import React, {useState, useEffect} from "react";
import PoemsContainer from "./PoemsContainer";
import NewPoemForm from "./NewPoemForm";

//const apikey = "http://localhost:8004/poems"

function App() {
  const [poems, setPoems] = useState([]);
  const [formVisible, setFormVisible] = useState(true);
  const [VisibleFav, setFavoriteVisible] = useState(true);
  const poemsToDisplay = poems.filter((poem) => VisibleFav || poem.isFavorite);

  useEffect(() => {
    fetch("http://localhost:8004/poems")
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

  function renderPoemView() {
    if (poemsToDisplay.length === 0 && !VisibleFav) {
      return (<h1>You have no favorites added</h1>)
    } else {
      return (
        <PoemsContainer 
          poems={poemsToDisplay} 
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
        {formVisible ? <NewPoemForm AddPoem={AddPoem}/> : null}
        <button onClick={() => setFavoriteVisible(!VisibleFav)} >
          Show/hide Favorite Poems
        </button>
      </div>
      {renderPoemView()}
    </div>
  );
}

export default App;
