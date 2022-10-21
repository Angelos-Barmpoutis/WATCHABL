// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Hero = ({ heroTrending, openModal }) => {
  // Return item's title based on its category
  const filterTitle = (item) => (item.title ? item.title : item.name);

  // Return item's release year based on its category
  // const filterYear = (item) => {
  //   if (item.release_date) {
  //     return item.release_date.split("-", 1);
  //   } else {
  //     return item.first_air_date.split("-", 1);
  //   }
  // };

  return (
    <div className="wrapper">
      <Swiper
        speed={600}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          {heroTrending.results.length > 0 && (
            <img
              className="hero__images__image-container__image"
              src={`https://image.tmdb.org/t/p/w780${heroTrending.results[0].backdrop_path}`}
              alt={filterTitle(heroTrending.results[0])}
              onClick={() =>
                openModal(heroTrending.results[0].id, heroTrending.category)
              }
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {heroTrending.results.length > 0 && (
            <img
              onClick={() =>
                openModal(heroTrending.results[1].id, heroTrending.category)
              }
              className="hero__images__image-container__image"
              src={`https://image.tmdb.org/t/p/w780${heroTrending.results[1].backdrop_path}`}
              alt={filterTitle(heroTrending.results[1])}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {heroTrending.results.length > 0 && (
            <img
              onClick={() =>
                openModal(heroTrending.results[2].id, heroTrending.category)
              }
              className="hero__images__image-container__image"
              src={`https://image.tmdb.org/t/p/w780${heroTrending.results[2].backdrop_path}`}
              alt={filterTitle(heroTrending.results[2])}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {heroTrending.results.length > 0 && (
            <img
              onClick={() =>
                openModal(heroTrending.results[3].id, heroTrending.category)
              }
              className="hero__images__image-container__image"
              src={`https://image.tmdb.org/t/p/w780${heroTrending.results[3].backdrop_path}`}
              alt={filterTitle(heroTrending.results[3])}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {heroTrending.results.length > 0 && (
            <img
              onClick={() =>
                openModal(heroTrending.results[4].id, heroTrending.category)
              }
              className="hero__images__image-container__image"
              src={`https://image.tmdb.org/t/p/w780${heroTrending.results[4].backdrop_path}`}
              alt={filterTitle(heroTrending.results[4])}
            />
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
