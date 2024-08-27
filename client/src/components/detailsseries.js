// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function Detail(){

//     const [display, setDisplay] = useState([]);

//     const apiKey = "bd0c0500c29c";
//     const params = useParams();



//     useEffect(() => {

//         axios.get("https://api.betaseries.com/shows/display", {
//             params: {
//                 id: params.id,
//                 token : "cdae0c386241",
//             },
//             headers: {
//                 'X-BetaSeries-Key': apiKey,
//             },
//         })
//         .then((res) => {
//             console.log(res.data.display)
//             setDisplay(res.data.display)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     }, [])

//     return (
        
//         <div>
//             <div className="">
    
//             </div>

//             <h1>Détails de la série</h1>
//             {
//                 display.map((detail) => (
//                     <div>
//                         <p> {detail.title} </p>
//                         <img src={detail.images.poster}></img>
//                         <p> {detail.season} </p>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default Detail