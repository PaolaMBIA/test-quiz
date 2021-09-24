import React, { useState } from 'react'


function GameOverPage(props) {
    const [allScore, setAllScore] = useState(false)
    const highScores = JSON.parse(localStorage.getItem("highScores")) || []

    const handleSaveScore = () => {
        const resultScore = {
            score: props.score,
            username: props.username
        }

        highScores.push(resultScore)
        highScores.sort((a, b) => b.score - a.score);

        localStorage.setItem('highScores', JSON.stringify(highScores))
    }

    
    return (
        <div>
            {
                allScore ?
                    <div>
                        {
                            highScores.map(highScore => (
                                <span>{ highScore.username} {highScore.score }</span>
                            ))
                        }
                    </div>  

                :
                    <>
                        <div>Ton score est de {props.score} sur {props.movieLength}</div>
                        <div>
                            <button onClick={() => handleSaveScore()} >Sauvegarder</button>
                            <button onClick={() => props.restart(false)} >Rejouer</button>        
                            <button onClick={() => setAllScore(true)} >Regarder les scores</button>
                        </div>
                    </>
     
                }
            </div>
    )
}

export default GameOverPage;