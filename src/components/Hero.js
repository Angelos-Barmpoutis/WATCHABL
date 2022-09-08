import { useState, useRef } from "react";

const Hero = ({heroTrending, openModal}) => {

    const [circles, setCircles ] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const carouselShift = useRef(0);
    
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 15;

    const nextImage = () => {

      if (circles === 4 && carouselShift.current === -400) {
        setCircles(0)
        carouselShift.current = 0
      } else {
        setCircles(circles + 1)
        carouselShift.current = carouselShift.current - 100
      }

      document.querySelectorAll('.hero__images__image-container').forEach(image => {
        image.style.transform = `translateX(${carouselShift.current}%)`;
      })

    }

    const previousImage = () => {

      if (carouselShift.current === 0 && circles === 0) {
        setCircles(4)
        carouselShift.current = -400
      } else {
        setCircles(circles - 1)
        carouselShift.current = carouselShift.current + 100
      }

      document.querySelectorAll('.hero__images__image-container').forEach(image => {
        image.style.transform = `translateX(${carouselShift.current}%)`;
      })
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
            <button aria-label="left-navigation-arrow" className="hero__navigation-arrow left-arrow" onClick={previousImage}><i className="fa-solid fa-chevron-left fa-2x"></i></button>
            <div className="hero__images">
              {/* Image  1 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[0].id, 'movie')}>
                {heroTrending.length > 0 && <img className="hero__images__image" src={`https://image.tmdb.org/t/p/w780${heroTrending[0].backdrop_path}`} alt={heroTrending[0].title}/>}
                {heroTrending.length > 0 && <h3 className='hero__images__title'>{heroTrending[0].title}<span>{heroTrending[0].release_date.split('-', 1)}</span></h3>}
              </div>
              {/* Image 2 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[1].id, 'movie')}>
                {heroTrending.length > 0 && <img className="hero__images__image" src={`https://image.tmdb.org/t/p/w780${heroTrending[1].backdrop_path}`} alt={heroTrending[1].title}/>}
                {heroTrending.length > 0 && <h3 className='hero__images__title'>{heroTrending[1].title}<span>{heroTrending[1].release_date.split('-', 1)}</span></h3>}
              </div>
              {/* Image 3 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[2].id, 'movie')}>
                {heroTrending.length > 0 && <img className="hero__images__image" src={`https://image.tmdb.org/t/p/w780${heroTrending[2].backdrop_path}`} alt={heroTrending[2].title}/>}
                {heroTrending.length > 0 && <h3 className='hero__images__title'>{heroTrending[2].title}<span>{heroTrending[2].release_date.split('-', 1)}</span></h3>}
              </div>
              {/* Image 4 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[3].id, 'movie')}>
                {heroTrending.length > 0 && <img className="hero__images__image" src={`https://image.tmdb.org/t/p/w780${heroTrending[3].backdrop_path}`} alt={heroTrending[3].title}/>}
                {heroTrending.length > 0 && <h3 className='hero__images__title'>{heroTrending[3].title}<span>{heroTrending[3].release_date.split('-', 1)}</span></h3>}
              </div>
              {/* Image 5 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending[4].id, 'movie')}>
                {heroTrending.length > 0 && <img className="hero__images__image" src={`https://image.tmdb.org/t/p/w780${heroTrending[4].backdrop_path}`} alt={heroTrending[4].title}/>}
                {heroTrending.length > 0 && <h3 className='hero__images__title'>{heroTrending[4].title}<span>{heroTrending[4].release_date.split('-', 1)}</span></h3>}
              </div>    
            </div>
            <button aria-label="right-navigation-arrow" className="hero__navigation-arrow right-arrow" onClick={nextImage}><i className="fa-solid fa-chevron-right fa-2x"></i></button>

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