import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import { connect } from 'react-redux';
import { fetchMovieCredits } from '../actions';

class MovieDetails extends Component {

  state = {
    castAndCrew: [{key:1, title:'View film cast', name:'cast'}, {key:2, title:'View film crew', name:'crew'}],
  }

  static navigationOptions = {
    title: 'Movie',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTitleStyle: {
      color: '#E31222'
    },
    headerTintColor: 'white',
  }

  componentDidMount () {
    const { id } = this.props.navigation.state.params.movie;
    this.props.fetchMovieCredits(`/movie/${id}/credits`);
  }

  renderGenres = () => {
    const { genre_ids } = this.props.navigation.state.params.movie;
    let genres = genre_ids.reduce((accum,id) => {
      accum += `${this.props.genres[id].name}, `;
      return accum;
    }, '');
    return genres.substring(0, genres.length-2);
  }

  renderCastAndCrew = (item) => {
    const { navigate } = this.props.navigation;
    return (
      <ListItem
        title={item.title}
        containerStyle={{borderBottomWidth: 0}}
        onPress={() => navigate('Credits', { people: this.props.credits[item.name], name:item.name })}
      />
    );
  }

  render () {
    const {
      id,
      title,
      poster_path,
      vote_average,
      release_date } = this.props.navigation.state.params.movie;
    const fullPath = `https://image.tmdb.org/t/p/w185/${poster_path}`;
    return (
      <View>
        <Image
          style={styles.image} source={{uri: fullPath}}
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Relased on <Text style={styles.bold}>{release_date}</Text></Text>
          <Text style={styles.detailsText}>Score: <Text style={styles.bold}>{vote_average}</Text></Text>
        </View>
        <Text style={styles.detailsText}>Classified as: <Text style={styles.bold}>{this.renderGenres()}</Text></Text>
        <FlatList
          data={this.state.castAndCrew}
          renderItem={({item}) => this.renderCastAndCrew(item)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  genres: state.movieGenres,
  credits: state.credits
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovieCredits: (endpoint) => dispatch(fetchMovieCredits(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);

const styles = StyleSheet.create({
  image: {
    height: 390,
    width: 260,
    alignSelf: 'center'
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
  },
  title: {
    paddingVertical: 5,
    fontSize: 30,
    alignSelf: 'center'
  },
  detailsText: {
    marginLeft: 20,
    paddingVertical: 3,
  },
  bold: {
    fontWeight: 'bold',
  }
});
