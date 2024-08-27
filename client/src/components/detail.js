import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Detail(){

    const [episode, setEpisode] = useState([]);
    const [details, setDetails] = useState([]);
    const [genres, setGenres] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const apiKey = "bd0c0500c29c";
    const params = useParams();

    useEffect(() => {

        axios.get("https://api.betaseries.com/shows/display", {
            params: {
                id: params.id,
                
            },
            headers: {
                'X-BetaSeries-Key': apiKey,
            },
        })
        .then((res) => {
            console.log(res);
            setGenres(res.data.show.genres)
            setDetails(res.data.show)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {

        axios.get("https://api.betaseries.com/shows/episodes", {
            params: {
                id: params.id,
            },
            headers: {
                'X-BetaSeries-Key': apiKey,
            },
        })
        .then((res) => {
            console.log(res.data.episodes)
            setEpisode(res.data.episodes)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
        <div className="flex py-6 bg-slate-900 fixed w-full text-white">
            <a href="/" className="text-2xl ml-4 font-bold ">Previously On</a >
        </div>

        <div className="flex flex-col items-center overflow-x-hidden">
            {
                details.length !== 0 ? 
                <div>
                    <div className="w-screen overflow-x-hidden flex justify-between items-center bg-slate-800 text-white h-screen p-12">
                        <div className="flex items-center mx-auto">
                            <img className='rounded-md w-80 h-auto duration-0 transition hover:duration-500 hover:opacity-80
                                hover:cursor-pointer'  src={details.images.poster} alt="poster" />
                            <div className="flex flex-col gap-3 mx-4">
                                <div className="flex items-center justify-center flex-col">
                                </div>
                                <div className="flex flex-col gap-6 pb-24  bg-slate-900 rounded-md p-6">
                                    <h1 className="text-4xl ">{details.title}</h1>
                                    <p>{details.description}</p>
                                    <p className="">Nombre de saisons : {details.seasons}</p>
                                    <p className="">Nombre d'épisodes : {details.episodes}</p>
                                    <p className="">Durée d'un épisode : {details.length} min</p>
                                    <p className="">Note : {details.notes.mean.toFixed(1)}</p>
                                    <div className="flex gap-2">
                                        <p className="">Genre :</p>

                                        {
                                        Object.keys(genres).map((item)=> (
                                            <p> {item} | </p>
                                        ))
                                        }
                                    </div>
                                </div>
                        </div>

                        </div>
                    </div>
                </div>
                : null
            }
            
            <div className="w-full flex flex-col items-center p-12 rounded-md bg-slate-800 h-full text-white">
                <div className="flex items-center justify-center flex-col">
                    <h1 className="text-2xl pb-6 mx-auto">Liste des épisodes</h1>
                </div>
                {
                    episode.map((detail) => (
                        <div className="grid grid-cols-3 items-center p-6  bg-slate-900">
                            <div className="flex gap-2">
                                <a href={"/episode/"+ detail.id}> <p className="font-bold text-xl text-blue-300 "> {detail.title} | </p></a>
                                <p className="font-bold text-xl text-blue-300"> {detail.date} : </p>
                            </div>
                            
                            <div className="flex p-4 items-center">
                                <p className="flex items-start text-lg"> {detail.description} </p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
        </>
    )
}

export default Detail