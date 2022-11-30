import './App.scss';
import 'antd/dist/reset.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { searchMovies } from './redux/services/movieService';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Detail from './pages/Detail';
import { Button, Result } from 'antd';
import useLocalStorage from './utils/useLocalStorage';

function App() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    localStorage.setItem('movieList', JSON.stringify(movieList));
  }, [movieList]);

  useEffect(() => {
    const movieList = JSON.parse(localStorage.getItem('movieList'));
    if (movieList) {
      setMovieList(movieList);
    }
  }, []);

  useEffect(() => {
    dispatch(searchMovies());
  }, [dispatch]);

  console.log("movies", movies.Search);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route
            path="*"
            element={
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Button type="primary" href="/">
                    Back Home
                  </Button>
                }
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
