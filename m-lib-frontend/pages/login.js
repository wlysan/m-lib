import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import styles from '../styles/auth.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setUser({ username });
      setMessage('Login successfully! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 2000); 
    } catch (error) {
      setMessage('Error when logging in. Check your credentials.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
