import { useState, useEffect } from "react";
import HeroImage from "./HeroImage";

const Hero = ({openModal}) => {
    const [trendingToday, setTrendingToday] = useState([])

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/all/day?api_key=6de482bc8c5768aa3648618b9c3cc98a')
        .then(response => response.json())
        .then(responseData => {
            const trendingFilter = responseData.results.filter((result, index) => index < 5)
            setTrendingToday(trendingFilter)
        })
    }, [])

    const trendings = trendingToday.map((item, index) => {
        return (
            <HeroImage
                key = {item.id}
                id = {item.id}
                index = {index}
                posterPath = {item.backdrop_path}
                title = {item.title ? item.title : item.name}
                openModal = {openModal}
            />
        )
    })


    return (
        <div className="hero">
            <div className="wrapper">
                <h2 className="title">Explore the most popular Movies & Tv Shows</h2>
            </div>
            <div className="hero__images wrapper">
                {trendings}
            </div>
        </div>
    )
}

export default Hero;