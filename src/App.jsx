import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './navbar';
import Hero from './hero';
import Home from './home';
import Loader from './Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Home />
        </>
      )}
    </>
  );
}

export default App;