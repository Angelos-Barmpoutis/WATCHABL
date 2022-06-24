import { useState, useEffect } from "react";
import HeroImage from "./HeroImage";

const Hero = () => {
    const [trendingTitles, setTrendingTitles] = useState([]);
    const [trendingPosters, setTrendingPosters] = useState([])
    const [carousel, setCarousel] = useState(2)
    
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/all/week?api_key=6de482bc8c5768aa3648618b9c3cc98a')
        .then(response => response.json())
        .then(responseData => {
            setTrendingPosters([])
            setTrendingTitles([])
            for (let i=0; i<5; i++) {
                setTrendingPosters(prevState => (
                    [
                        ...prevState,
                        [responseData.results[i].poster_path]
                    ]
                ))

                setTrendingTitles(prevState => (
                    [
                        ...prevState,
                        [responseData.results[i].title ? responseData.results[i].title : responseData.results[i].name]
                    ]
                ))
            }
        })
    }, [])


    useEffect(() => {
        let i = 2;
        setInterval(() => {
            i++
            setCarousel(i)
            if (i === 4) {
                i = -1;
            }
        }, 4000)
    }, [])


    return (
        <div className="hero">
            <div className="wrapper">
                <h2 className="title">Trending this week</h2>
            </div>
            <div className="hero__images wrapper">
                <HeroImage
                    active = {carousel === 0 && 'active'}
                    title = {trendingTitles[0]}
                    posterPath = {trendingPosters[0]}
                />
                <HeroImage
                    active = {carousel === 1 && 'active'}
                    posterPath = {trendingPosters[1]}
                    title = {trendingTitles[1]}
                />
                <HeroImage
                    active = {carousel === 2 && 'active'}
                    posterPath = {trendingPosters[2]}
                    title = {trendingTitles[2]}
                />
                <HeroImage
                    active = {carousel === 3 && 'active'}
                    posterPath = {trendingPosters[3]}
                    title = {trendingTitles[3]}
                />
                <HeroImage
                    active = {carousel === 4 && 'active'}
                    posterPath = {trendingPosters[4]}
                    title = {trendingTitles[4]}
                />
            </div>
        </div>
    )
}

export default Hero;