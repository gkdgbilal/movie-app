import './App.scss';
import 'antd/dist/reset.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { searchMovies } from './redux/services/movieService';
import Layout from './components/Layout';
import ListTable from './components/ListTable';
import HomePage from './components/HomePage';
import ListGrid from './components/ListGrid';

function App() {
  const movies = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMovies());
  }, [dispatch])

  // console.log("movies", movies);

  return (
    <Layout>
      <HomePage />
      <ListGrid />
    </Layout>
  );
}

export default App;
