const Hero = ({heroTrending}) => {
    const filteredHeroTrending = heroTrending.filter((item, index) => index < 5);
    const mapHeroTrendingImages = filteredHeroTrending.map(item => {
        return (
        <img className="hero__images__image" key={item.id} src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`} alt={item.title}/>
        )
    })

    const mapHeroTrendingTitles = filteredHeroTrending.map(item => {
        return (
        <h3 className="hero__images__title" key={item.id}>{item.title}</h3>
        )
    })

    return (
        <div className="hero wrapper">
            <div className="hero__navigation-arrow"><i className="fa-solid fa-chevron-left"></i></div>
            <div className="hero__images">
                {heroTrending.length > 0 && mapHeroTrendingImages}
                {heroTrending.length > 0 && mapHeroTrendingTitles}
            </div>
            <div className="hero__navigation-arrow"><i className="fa-solid fa-chevron-right"></i></div>
        </div>
    )
}

export default Hero;