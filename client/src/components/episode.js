import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

function Episode(){

    const [detail, setDetail] = useState([]);
    const [seen, setSeen] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const apiKey = "bd0c0500c29c";
    const jeton = cookies['token'];
    const params = useParams();

    useEffect(() => {
        axios.get("https://api.betaseries.com/episodes/display", {
            params: {
                id: params.id
            },
            headers: {
                'X-BetaSeries-Key': apiKey,
            },
        })
        .then((res) => {
            setDetail(res.data.episode)
        })

        axios.get('https://api.betaseries.com/episodes/display', {
            params: {
                id: params.id,
                token: cookies["token"]
            },
            headers: {
                'X-BetaSeries-Key': apiKey,
            },
        })
        .then((res) => {
            setSeen(res.data.episode.user.seen)
        })
    }, [detail]);

    function markAsSeen(){
        axios.post(`https://api.betaseries.com/episodes/watched?key=${apiKey}&id=${params.id}&token=${jeton}`)
    }

    function deleteSeen(){
        axios.delete("https://api.betaseries.com/episodes/watched", {
            params: {
                id: params.id,
                token: cookies["token"]
            },
            headers: {
                'X-BetaSeries-Key': apiKey,
            },
        })
    }

    return (
        <div>
            <h1>Détail de l'épisode</h1>
            <div className="p-2">
                <p className="font-semibold"> {detail.title} </p>
                <p> {detail.date} </p>
                <p> {detail.description} </p>
            </div>
            {
                seen ? (
                    <button className="p-2 bg-green-600 hover:bg-green-500 rounded-lg text-white" onClick={deleteSeen}>Supprimer des vus</button>
                ):(
                    <button className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white" onClick={markAsSeen}>Marquer comme vu</button>
                )
            }
        </div>
    )
}

export default Episode