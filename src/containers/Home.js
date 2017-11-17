import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import { connect } from 'react-redux';
import {
  fetchMovies,
  addToFavourites,
  fetchMoviesGenres,
  emptySearchedMovies } from '../actions';

import SearchBar from '../components/SearchBar';
import SearchList from '../components/SearchList';
import Favourites from '../components/Favourites';
import Error from '../components/Error';

class Home extends Component {

  state = {
    query: '',
  }

  static navigationOptions = {
    title: 'NEATFLIX',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTitleStyle: {
      color: '#E31222',
      fontFamily: 'Helvetica Neue',
      fontSize: 30,
      letterSpacing: 2,
    }
  }

  componentDidMount () {
    this.props.fetchMoviesGenres('/genre/movie/list');
  }

  triggerSearch = (query) => {
    this.props.fetchMovies(query);
    this.setState({
      query
    });
  };

  clearSearch = () => {
    this.props.emptySearchedMovies();
    this.setState({
      query: ''
    });
  };

  handleAddToFavourites = (e, movieId) => {
    const movie = this.props.searchedMovies[movieId];
    this.props.addToFavourites(movie);
  }

  goToMovieDetails = (e, movie) => {
    const { navigate } = this.props.navigation;
    navigate('MovieDetails', { movie });
  }

  render () {
    return (
      <View>
        <StatusBar barStyle='light-content'/>
        <SearchBar
          clearSearch={this.clearSearch}
          triggerSearch={this.triggerSearch}
        />
        { this.props.error ? (
          <Error/>
        ) : (
          <View>
            <SearchList
              fetching={this.props.fetching}
              favorites={this.props.favourites}
              goToMovieDetails={this.goToMovieDetails}
              searchedMovies={this.props.searchedMovies}
              handleAddToFavourites={this.handleAddToFavourites}
            />
            <Favourites
              movies={this.props.favourites}
              goToMovieDetails={this.goToMovieDetails}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  searchedMovies: state.searchedMovies,
  favourites: state.favourites,
  fetching: state.fetching,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (query) => dispatch(fetchMovies(query)),
  fetchMoviesGenres: (endpoint) => dispatch(fetchMoviesGenres(endpoint)),
  emptySearchedMovies: () => dispatch(emptySearchedMovies()),
  addToFavourites: (movie) => dispatch(addToFavourites(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
