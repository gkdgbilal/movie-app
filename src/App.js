import './App.scss';
import 'antd/dist/reset.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { searchMovies } from './redux/services/movieService';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Detail from './pages/Detail';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMovies());
  }, [dispatch])

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
