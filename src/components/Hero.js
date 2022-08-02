import { useState } from "react";

const Hero = ({heroTrending, openModal}) => {

    const [circles, setCircles ] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50;

    const nextImage = () => {
        setCircles(circles + 1)
        if (circles === 4) {
            setCircles(0)
        }
    }

    const previousImage = () => {
        setCircles(circles - 1)
        if (circles === 0) {
            setCircles(4)
        }
    }
    
    const onTouchStart = (e) => {
      setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
      setTouchStart(e.targetTouches[0].clientX)
    }
    
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
    
    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) {
        return
      }

      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > minSwipeDistance
      const isRightSwipe = distance < -minSwipeDistance
      if (isLeftSwipe) {
        nextImage()
      }
      if (isRightSwipe) {
        previousImage()
      }
    }

    return (
        <div className="hero wrapper">
            <button className="hero__navigation-arrow left-arrow" onClick={previousImage}><i className="fa-solid fa-chevron-left fa-2x"></i></button>
            <div className="hero__images">
                {heroTrending.length > 0 && <img className={circles === 0 ? "hero__images__image active" : "hero__images__image"} src={`https://image.tmdb.org/t/p/w780${heroTrending[0].backdrop_path}`} alt={heroTrending[0].title} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[0].id, 'movie')}/>}
                {heroTrending.length > 0 && <img className={circles === 1 ? "hero__images__image active" : "hero__images__image"} src={`https://image.tmdb.org/t/p/w780${heroTrending[1].backdrop_path}`} alt={heroTrending[1].title} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[1].id, 'movie')}/>}
                {heroTrending.length > 0 && <img className={circles === 2 ? "hero__images__image active" : "hero__images__image"} src={`https://image.tmdb.org/t/p/w780${heroTrending[2].backdrop_path}`} alt={heroTrending[2].title} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[2].id, 'movie')}/>}
                {heroTrending.length > 0 && <img className={circles === 3 ? "hero__images__image active" : "hero__images__image"} src={`https://image.tmdb.org/t/p/w780${heroTrending[3].backdrop_path}`} alt={heroTrending[3].title} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[3].id, 'movie')}/>}
                {heroTrending.length > 0 && <img className={circles === 4 ? "hero__images__image active" : "hero__images__image"} src={`https://image.tmdb.org/t/p/w780${heroTrending[4].backdrop_path}`} alt={heroTrending[4].title} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[4].id, 'movie')}/>}

                {heroTrending.length > 0 && <h3 className={circles === 0 ? "hero__images__title active" : 'hero__images__title'} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}  onClick={() => openModal(heroTrending[0].id, 'movie')}>{heroTrending[0].title}</h3>}
                {heroTrending.length > 0 && <h3 className={circles === 1 ? "hero__images__title active" : 'hero__images__title'} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[1].id, 'movie')}>{heroTrending[1].title}</h3>}
                {heroTrending.length > 0 && <h3 className={circles === 3 ? "hero__images__title active" : 'hero__images__title'} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[2].id, 'movie')}>{heroTrending[2].title}</h3>}
                {heroTrending.length > 0 && <h3 className={circles === 2 ? "hero__images__title active" : 'hero__images__title'} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[3].id, 'movie')}>{heroTrending[3].title}</h3>}
                {heroTrending.length > 0 && <h3 className={circles === 4 ? "hero__images__title active" : 'hero__images__title'} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[4].id, 'movie')}>{heroTrending[4].title}</h3>}
            </div>
            <button className="hero__navigation-arrow right-arrow" onClick={nextImage}><i className="fa-solid fa-chevron-right fa-2x"></i></button>

            <div className="hero__navigation-circles">
                <div className={circles === 0 ? "hero__navigation-circles__circle active" : "hero__navigation-circles__circle"}></div>
                <div className={circles === 1 ? "hero__navigation-circles__circle active" : "hero__navigation-circles__circle"}></div>
                <div className={circles === 2 ? "hero__navigation-circles__circle active" : "hero__navigation-circles__circle"}></div>
                <div className={circles === 3 ? "hero__navigation-circles__circle active" : "hero__navigation-circles__circle"}></div>
                <div className={circles === 4 ? "hero__navigation-circles__circle active" : "hero__navigation-circles__circle"}></div>
            </div>
        </div>
    )
}

export default Hero;