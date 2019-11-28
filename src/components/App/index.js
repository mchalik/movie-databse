import React, {useEffect, useReducer} from 'react';
import Movie from '../Movie';
import Header from '../Header';
import Search from '../Search';
import axios from 'axios';
import './style.css';

const
  [
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE
  ] =
    [
      'SEARCH_MOVIES_REQUEST',
      'SEARCH_MOVIES_SUCCESS',
      'SEARCH_MOVIES_FAILURE'
    ];

const getMovieApiURL = (value) => `https://www.omdbapi.com/?s=${value}&apikey=4a3b711b`;

const initialState = {
  movies: [],
  loading: true,
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios(getMovieApiURL('social network'))
      .then(({data}) => {
        dispatch({
          type: SEARCH_MOVIES_SUCCESS,
          payload: data.Search
        })
      })
  }, []);

  const search = searchValue => {
    dispatch({
      type: SEARCH_MOVIES_REQUEST
    });
    axios(getMovieApiURL(searchValue))
      .then(({data}) => {
        if (data.Response === "True") {
          dispatch({
            type: SEARCH_MOVIES_SUCCESS,
            payload: data.Search
          })
        } else {
          dispatch({
            type: SEARCH_MOVIES_FAILURE,
            error: data.Error
          })
        }
      })
  };

  const {movies, errorMessage, loading} = state;

  return (
    <div className="App">
      <Header text="Архив кино"/>
      <Search search={search}/>
      <p className="App-intro">Делимся с вами вашими любимыми фильмами</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key ={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
