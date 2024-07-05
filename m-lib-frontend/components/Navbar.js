import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiSearchAlt2 } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <h2>
          <Link href="/">M-LIB</Link>
        </h2>
        {user ? (
          <>
            <Link href="/my-lists">My Lists</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
      <div className={styles.navRight}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for a movie" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit"><BiSearchAlt2 /></button>
        </form>
        {user && (
          <div className={styles.userMenu}>
            <FaUserCircle className={styles.userIcon} />
            <span>{user.username}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
