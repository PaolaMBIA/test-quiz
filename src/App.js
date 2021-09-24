
import './App.css';

import {useState} from "react"
import { useMoviesFetch } from './hooks/useMoviesFetch';
import HomePage from "./pages/HomePage"
import QuizPage from "./pages/QuizPage"

function App() {

  const [state] = useMoviesFetch();

  const [username, setUsername] = useState("")
  const [start, setStart] = useState(false)
  

  if (state.movies.length === 0) {
   return <div>load</div>
  }
  
  return (
    <>
      {
        start ?
          <QuizPage allMovies={state.movies} username={username} setStart={setStart} />
          :
          <HomePage username={username} setUsername={setUsername} setStart={ setStart}/>
      }
       
    </>
  );
}

export default App;
