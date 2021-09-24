import React, { useState } from "react"
import GameOverPage from "./GameOverPage"
import MainContainerOfQuiz from "../components/MainContainerOfQuiz"
import Loading from "../components/Loading"

function QuizPage(props) {

    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)

    if (props.allMovies.length === 0) {
        return <Loading />
    }

    return (
  
        <>
            {
                showScore ?
                    <GameOverPage
                        restart={props.setStart}
                        movieLength={props.allMovies.length}
                        score={score}
                        username={props.username}
                    />   
                    :
                    <>
                        <MainContainerOfQuiz
                            movies={props.allMovies}
                            setShowScore={setShowScore}
                            setScore={setScore}
                            score={score}
                        />
                    </>
            }


        </>
    )
}

export default QuizPage;