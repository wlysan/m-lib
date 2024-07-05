import '../styles/globals.css';
import { UserProvider } from '../context/UserContext';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
