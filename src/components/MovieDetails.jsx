import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MyNavbar from "./MyNavbar";

const MovieDetails = () => {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [comments, setComments] = useState();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieId = params.movieId;
        const movieDetailsResponse = await fetch(`http://www.omdbapi.com/?apikey=86cefc24&i=${movieId}`);
        const movieDetailsData = await movieDetailsResponse.json();

        const commentsResponse = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${movieId}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWRiODdmMzA0NjAwMWFlNTlmN2EiLCJpYXQiOjE3MTQ2NTk4NzQsImV4cCI6MTcxNTg2OTQ3NH0.G-pxb1f6oCxhZlHxWBlvdPjOijI-yM6Cn_45E82cAmY",
          },
        });
        const commentsData = await commentsResponse.json();

        setMovieDetails(movieDetailsData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching movie details and comments:", error);
      }
    };

    fetchMovieDetails();
  }, [params.movieId]);

  return (
    <div>
      <MyNavbar />
      <Container fluid className="p-5 text-white">
        {movieDetails && (
          <div className="text-center">
            <h2>{movieDetails.Title}</h2>
            <img src={movieDetails.Poster} alt="" />
            <p>{movieDetails.Plot}</p>
            <p>{movieDetails.Year}</p>
            <p>{movieDetails.Genre}</p>

            <h3>Comments:</h3>
            {comments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.comment}</p>
                <p>Posted by: {comment.author}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MovieDetails;
