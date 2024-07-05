import axios from 'axios';
import { useState, useEffect } from 'react';
import ListCard from '../components/ListCard';
import MovieCard from '../components/MovieCard';
import SearchResults from '../components/SearchResults';
import styles from '../styles/MyLists.module.css';

export default function MyLists() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [movies, setMovies] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showMovies, setShowMovies] = useState(false);

  const fetchLists = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/lists', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.length === 0) {
          setMessage('No list created.');
        } else {
          setLists(response.data);
        }
      } catch (err) {
        setErrorMessage('Error when searching lists. Check the server URL and token.');
      }
    }
  };

  const fetchMovies = async (listId) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `http://localhost:3000/lists/${listId}/movies`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        setMovies(response.data);
        setErrorMessage(''); 
      } catch (err) {
        
        setErrorMessage('Error when searching for films from the list.');
      }
    }
  };

  const searchMovies = async () => {
    if (searchQuery.trim() === '') return;
    try {
      const response = await axios.get(
        `http://localhost:3000/omdb/search?query=${searchQuery}`
      );
      setSearchResults(response.data);
      setMovies([]); 
      setErrorMessage(''); 
    } catch (err) {
      setErrorMessage('Error when searching for films.');
    }
  };

  const handleAddMovie = async (imdbID) => {
    if (!selectedList) return;
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3000/lists/add-movie',
        { listId: selectedList.id, imdbId: imdbID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMovies(selectedList.id);
      setMessage('Movie added successfully');
      setErrorMessage(''); 
    } catch (err) {      
      setErrorMessage(`Error adding movie to list: ${err.response?.data?.error || err.message}`);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleSelectList = (list) => {
    setSelectedList(list);
    fetchMovies(list.id);
    setShowMovies(true);
    setSearchResults([]);
  };

  const handleCreateList = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && newListName.trim() !== '') {
        try {
          await axios.post(
            'http://localhost:3000/lists',
            { name: newListName },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setNewListName('');
          fetchLists();
          setMessage(''); 
        } catch (err) {
          setErrorMessage('Error creating list.');
        }
      } else {
        setErrorMessage('Please enter a name for the list.');
      }
    }
  };

  const handleShowMovies = () => {
    if (selectedList) {
      fetchMovies(selectedList.id);
      setSearchResults([]); 
      setShowMovies(true);
    }
  };

  const handleDeleteMovie = (movieId) => {
    setMovies(movies.filter((movie) => movie.localId !== movieId));
  };

  const handleRateMovie = (movieId, rating) => {
    setMovies(
      movies.map((movie) =>
        movie.localId === movieId ? { ...movie, userRating: rating } : movie
      )
    );
  };

  const handleDeleteList = async () => {
    if (!selectedList) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/lists/${selectedList.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLists(lists.filter((list) => list.id !== selectedList.id));
      setSelectedList(null);
      setShowMovies(false);
      setMovies([]);
      setMessage('List deleted successfully.');
    } catch (err) {      
      setErrorMessage('Error deleting the list.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>My Lists</h2>
      {message && <p className={styles.message}>{message}</p>}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name"
        />
        <button onClick={handleCreateList}>Create List</button>
      </div>
      <div className={styles.listContainer}>
        {lists.map((list) => (
          <ListCard key={list.id} list={list} onSelect={handleSelectList} />
        ))}
      </div>
      {selectedList && (
        <div className={styles.moviesContainer}>
          <h2>{selectedList.name}</h2>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie or series"
            />
            <button onClick={searchMovies}>Search</button>
            <button onClick={handleShowMovies}>Ver Filmes</button>
            <button onClick={handleDeleteList}>Deletar Lista</button>
          </div>
          {searchResults.length > 0 && (
            <SearchResults results={searchResults} onAddMovie={handleAddMovie} />
          )}
          {showMovies && (
            <div className="container">
              <div className="movies-container">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    isUserList={true}
                    onDelete={handleDeleteMovie}
                    onRate={handleRateMovie}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
