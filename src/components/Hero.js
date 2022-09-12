import { useState, useRef, useEffect } from "react";

const Hero = ({heroTrending, openModal}) => {

    const [circles, setCircles ] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const carouselShift = useRef(0);
    
    // The required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 15;

    // Move to the next image
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

    // Move to the previous image
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

    // Reset carousel every time its category changes
    useEffect(() => {
      setCircles(0);
      carouselShift.current = 0;
      document.querySelectorAll('.hero__images__image-container').forEach(image => {
        image.style.transform = `translateX(${carouselShift.current}%)`;
      })
    }, [heroTrending.category])

    // Set carousel to change slides automatically every 2.5 seconds
    useEffect(() => {
      const intervalId = setInterval(() => nextImage(), 2500);

      return () => clearInterval(intervalId)
    })
    
    // Keep track of touch's start
    const onTouchStart = (e) => {
      setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
      setTouchStart(e.targetTouches[0].clientX)
    }
    
    // Keep track of touch's movement
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
    
    // Keep track of touch's end
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

    // Return item's title based on its category
    const filterTitle = item => item.title ? item.title : item.name;

    // Return item's release year based on its category
    const filterYear = (item) => {
      if (item.release_date) {
        return item.release_date.split('-', 1);
      } else {
        return item.first_air_date.split('-', 1);
      }
    }

    return (
        <div className="hero wrapper">
            <button aria-label="left-navigation-arrow" className="hero__navigation-arrow left-arrow" onClick={previousImage}><i className="fa-solid fa-chevron-left fa-2x"></i></button>
            <div className="hero__images">
              {/* Image  1 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending.results[0].id, heroTrending.category)}>
                {heroTrending.results.length > 0 && <img className='hero__images__image-container__image' src={`https://image.tmdb.org/t/p/w780${heroTrending.results[0].backdrop_path}`} alt={filterTitle(heroTrending.results[0])}/>}

                {heroTrending.results.length > 0 && 
                  <div className="hero__images__image-container__details">
                    <h3 className='hero__images__image-container__details__title'>{filterTitle(heroTrending.results[0])}<span>{filterYear(heroTrending.results[0])}</span></h3>
                  </div>
                }
              </div>
              {/* Image 2 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending.results[1].id, heroTrending.category)}>
                {heroTrending.results.length > 0 && <img className='hero__images__image-container__image' src={`https://image.tmdb.org/t/p/w780${heroTrending.results[1].backdrop_path}`} alt={filterTitle(heroTrending.results[1])}/>}

                {heroTrending.results.length > 0 && 
                  <div className="hero__images__image-container__details">
                    <h3 className='hero__images__image-container__details__title'>{filterTitle(heroTrending.results[1])}<span>{filterYear(heroTrending.results[1])}</span></h3>
                  </div>
                }
              </div>
              {/* Image 3 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending.results[2].id, heroTrending.category)}>
                {heroTrending.results.length > 0 && <img className='hero__images__image-container__image' src={`https://image.tmdb.org/t/p/w780${heroTrending.results[2].backdrop_path}`} alt={filterTitle(heroTrending.results[2])}/>}

                {heroTrending.results.length > 0 && 
                  <div className="hero__images__image-container__details">
                    <h3 className='hero__images__image-container__details__title'>{filterTitle(heroTrending.results[2])}<span>{filterYear(heroTrending.results[2])}</span></h3>
                  </div>
                }
              </div>
              {/* Image 4 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending.results[3].id, heroTrending.category)}>
                {heroTrending.results.length > 0 && <img className='hero__images__image-container__image' src={`https://image.tmdb.org/t/p/w780${heroTrending.results[3].backdrop_path}`} alt={filterTitle(heroTrending.results[3])}/>}

                {heroTrending.results.length > 0 && 
                  <div className="hero__images__image-container__details">
                    <h3 className='hero__images__image-container__details__title'>{filterTitle(heroTrending.results[3])}<span>{filterYear(heroTrending.results[3])}</span></h3>
                  </div>
                }
              </div>
              {/* Image 5 */}
              <div className="hero__images__image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => openModal(heroTrending.results[4].id, heroTrending.category)}>
                {heroTrending.results.length > 0 && <img className='hero__images__image-container__image' src={`https://image.tmdb.org/t/p/w780${heroTrending.results[4].backdrop_path}`} alt={filterTitle(heroTrending.results[4])}/>}

                {heroTrending.results.length > 0 && 
                  <div className="hero__images__image-container__details">
                    <h3 className='hero__images__image-container__details__title'>{filterTitle(heroTrending.results[4])}<span>{filterYear(heroTrending.results[4])}</span></h3>
                  </div>
                }
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