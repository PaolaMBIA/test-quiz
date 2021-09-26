import './App.css'
import { useState } from "react"
import { useMoviesFetch } from './hooks/useMoviesFetch'
import HomePage from "./pages/HomePage"
import QuizPage from "./pages/QuizPage"
import Loading from './components/Loading'
import { useActorsFetch } from './hooks/useActorsFetch'
import Error from './components/Error'

function App() {

  const [state, loading] = useMoviesFetch();
  const [actors, setActors] = useState([]);
  const [allActorsInMovie, setAllActorsInMovie] = useState([]);
  const [error] = useActorsFetch(state.movies, setActors, setAllActorsInMovie);

  const [username, setUsername] = useState("")
  const [start, setStart] = useState(false)

  if (state.movies.length === 0 || loading ) {
   return <Loading />
  }

  if (error) {
    return <Error />
  }
  
  return (
    <>
      {
        start ?
          <QuizPage
            allMovies={state.movies}
            username={username}
            setStart={setStart}
            actors={actors}
            allActorsInMovie={allActorsInMovie}
          />
          :
          <HomePage
            username={username}
            setUsername={setUsername}
            setStart={setStart}
          />
      }
       
    </>
  );
}

export default App;
