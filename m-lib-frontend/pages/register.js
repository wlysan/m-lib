import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/auth.module.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
      });
      setMessage('Registration completed successfully! Redirecting to login page...');
      setTimeout(() => {
        router.push('/login');
      }, 2000); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === 'User already exists') {
        setMessage('Username already exists. Try another name.');
      } else {
        setMessage('Error when registering. Try again.');
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2>Register</h2>
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
        <button onClick={handleRegister}>Register</button>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
