import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaWallet, FaChartLine, FaClock, FaFileAlt } from 'react-icons/fa';
import styles from '../../styles/Movie.module.css';

const Movie = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/omdb/details/${id}`);
          setMovie(response.data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };

      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className={styles.moviePage}>
      <button className={styles.backButton} onClick={() => router.back()}>Voltar</button>
      <div className={styles.movieCard}>
        <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"} alt={movie.Title} />
        <h2>{movie.Title}</h2>
        <p>
          <FaStar className={styles.starIcon} /> {movie.imdbRating}
        </p>
      </div>
      <p className={styles.tagline}>{movie.Tagline || "N/A"}</p>
      <div className={styles.info}>
        <h3><FaWallet /> Orçamento:</h3>
        <p>{movie.BoxOffice || "N/A"}</p>
      </div>
      <div className={styles.info}>
        <h3><FaChartLine /> Receita:</h3>
        <p>{movie.Revenue || "N/A"}</p>
      </div>
      <div className={styles.info}>
        <h3><FaClock /> Duração:</h3>
        <p>{movie.Runtime || "N/A"}</p>
      </div>
      <div className={styles.info}>
        <h3><FaFileAlt /> Direção:</h3>
        <p>{movie.Director || "N/A"}</p>
      </div>
      <div className={styles.info}>
        <h3><FaFileAlt /> Escritor:</h3>
        <p>{movie.Writer || "N/A"}</p>
      </div>
      <div className={styles.info}>
        <h3><FaFileAlt /> Atores:</h3>
        <p>{movie.Actors || "N/A"}</p>
      </div>
      <div className={`${styles.info} ${styles.description}`}>
        <h3><FaFileAlt /> Descrição:</h3>
        <p>{movie.Plot || "N/A"}</p>
      </div>
    </div>
  );
};

export default Movie;
