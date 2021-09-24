import React from 'react'
import lottie from "lottie-web";


function Loading() {

    React.useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#loading"),
        });
    }, []);
    
    return (
        <div id="loading" >load</div>
    )
}

export default Loading;