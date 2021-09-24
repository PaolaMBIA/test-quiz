import React, { useState } from 'react'
import { toast, ToastContainer, Zoom } from "react-toastify"

import {EmailShareButton} from "react-share"

function GameOverPage(props) {
    const [allScore, setAllScore] = useState(false)
    const sortAllScore = JSON.parse(localStorage.getItem("sortAllScore")) || []

    //this function stock user's score and username in the local storage by showing higher score at first
    const handleSaveScore = () => {
        const resultScore = {
            score: props.score,
            username: props.username
        }

        sortAllScore.push(resultScore)
        sortAllScore.sort((a, b) => b.score - a.score);

        localStorage.setItem('sortAllScore', JSON.stringify(sortAllScore))

        toast.info(`Score Sauvegardé!! `, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Zoom,
        });
    }

    const handleRestartGame = () => props.restart(false)
    const handleShowAllScore = () => setAllScore(true)
    const handleHideAllScore = () => setAllScore(false)

    
    return (
        <>
            <ToastContainer />
            <div className="endPageContainer" >
                {
                    allScore ?
                            <div className="allScoreInformations">
                                <img
                                    src="https://img.icons8.com/ios-filled/50/000000/circled-left-2.png"
                                    alt="back arrow"
                                    onClick={()=>handleHideAllScore()}
                                />
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Scores</th>
                                            <th>Nom</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sortAllScore.map((scoreInfo, index) => (
                                                <tr key={index} >
                                                    <td>{scoreInfo.score }</td>
                                                    <td>{ scoreInfo.username}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                        </div>  

                    :
                        <div className="scoreInformations">
                            <p>Ton score est de <span>{props.score}/{props.movieLength}</span> </p>
                            <div className="buttonsAction">
                                <button  className="myButton" onClick={() => handleSaveScore()} >Sauvegarder</button>
                                <button className="myButton" onClick={() => handleRestartGame()} >Rejouer</button>        
                                <button className="myButton" onClick={() => handleShowAllScore()} >Regarder les scores</button>

                                <EmailShareButton
                                    url=""
                                    subject="Résultat quiz"
                                    body= {`ton score est de ${props.score}/${props.movieLength}`}
                                >

                                    <button className="myShareButton">
                                        Partager
                                        <img src="https://img.icons8.com/metro/26/000000/share.png" alt="share button" />
                                    </button>
                                </EmailShareButton>                               
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default GameOverPage;