
import './App.css';

import {useState} from "react"
import { useMoviesFetch } from './hooks/useMoviesFetch';
import HomePage from "./pages/HomePage"
import QuizPage from "./pages/QuizPage"
import Loading from './components/Loading';

function App() {

  const [state, loading] = useMoviesFetch();

  const [username, setUsername] = useState("")
  const [start, setStart] = useState(false)
  

  if (state.movies.length === 0 || loading) {
   return <Loading />
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
