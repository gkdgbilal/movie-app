import './App.css';
import 'antd/dist/reset.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMovies } from './redux/services/movieService';
import { Button } from 'antd';
import Layout from './components/Layout';
import ListTable from './components/ListTable';
import HomePage from './components/HomePage';

function App() {
  const movies = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch])

  console.log("movies", movies);

  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}

export default App;
