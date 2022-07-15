import { useState, useEffect } from "react";
import HeroImage from "./HeroImage";

const Hero = props => {
    const [carousel, setCarousel] = useState(2)
    const [carouselImages, setCarouselImages] = useState([]);
    
    //Fetch trending list when the page loads for the first time and save response's
    // first 5 carouselImages and titles, save them into states and pass them to the image carousel
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/all/day?api_key=6de482bc8c5768aa3648618b9c3cc98a')
        .then(response => response.json())
        .then(responseData => {
            const carouselArray = [];

            for (let i=0; i<5; i++) {
                carouselArray.push({
                    id: responseData.results[i].id,
                    poster: responseData.results[i].backdrop_path,
                    title: responseData.results[i].title ? responseData.results[i].title : responseData.results[i].name
                })
            }
            return carouselArray;
        })
        .then((carouselArray) => setCarouselImages(carouselArray))
    }, [])

    // // Change the image of carousel every 4 seconds
    // useEffect(() => {
    //     let i = 2;
    //     setInterval(() => {
    //         i++
    //         setCarousel(i)
    //         if (i === 4) {
    //             i = -1;
    //         }
    //     }, 4000)
    // }, [])


    return (
        <div className="hero">
            <div className="wrapper">
                <h2 className="title">Trending Today</h2>
            </div>
            <div className="hero__images wrapper">
                {carouselImages.length !== 0 && <HeroImage
                    active = {carousel === 0 && 'active'}
                    posterPath = {carouselImages[0].poster}
                    title = {carouselImages[0].title}
                    id = {carouselImages[0].id}
                    openModal = {props.openModal}
                />}
                {carouselImages.length !== 0 && <HeroImage
                    active = {carousel === 1 && 'active'}
                    posterPath = {carouselImages[1].poster}
                    title = {carouselImages[1].title}
                    id = {carouselImages[1].id}
                    openModal = {props.openModal}
                />}
                {carouselImages.length !== 0 && <HeroImage
                    active = {carousel === 2 && 'active'}
                    posterPath = {carouselImages[2].poster}
                    title = {carouselImages[2].title}
                    id = {carouselImages[2].id}
                    openModal = {props.openModal}
                />}
                {carouselImages.length !== 0 && <HeroImage
                    active = {carousel === 3 && 'active'}
                    posterPath = {carouselImages[3].poster}
                    title = {carouselImages[3].title}
                    id = {carouselImages[3].id}
                    openModal = {props.openModal}
                />}
                {carouselImages.length !== 0 && <HeroImage
                    active = {carousel === 4 && 'active'}
                    posterPath = {carouselImages[4].poster}
                    title = {carouselImages[4].title}
                    id = {carouselImages[4].id}
                    openModal = {props.openModal}
                />}
            </div>
        </div>
    )
}

export default Hero;