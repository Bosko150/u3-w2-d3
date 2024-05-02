import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const MyCarousel = (props) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const movieUrl = `http://www.omdbapi.com/?apikey=86cefc24&s=${props.search}`;
        const response = await fetch(movieUrl);
        if (!response.ok) {
          throw new Error("Errore nella richiesta");
        }
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [props.search]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  return (
    <Container fluid className="p-5">
      <h2 className="text-white text-start ms-4">{props.title}</h2>
      {isLoading && <Spinner animation="border" variant="primary" />}
      {movies.length === 0 && !isLoading && !isError && (
        <Alert className="w-50 text-center mx-auto" variant="info">
          There's no available movies for this saga
        </Alert>
      )}
      {isError && (
        <Alert className="w-50 text-center mx-auto" variant="danger">
          Si è verificato un errore, riprova più tardi.
        </Alert>
      )}
      {!isLoading && movies.length > 0 && (
        <div className="slider-container">
          <Slider {...settings}>
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                onClick={() => {
                  navigate(`/movie/${movie.imdbID}`);
                }}
              >
                <img src={movie.Poster} alt={movie.Title} className="img-fluid carousel-img ps-1" />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </Container>
  );
};

export default MyCarousel;
