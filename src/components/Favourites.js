import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet } from 'react-native';

import { ListItem } from 'react-native-elements';

class Favourites extends Component {

  renderItem = (item) => {
    const { title, poster_path } = item;
    return (
      <ListItem
        title={title}
        avatar={{uri: `https://image.tmdb.org/t/p/w185/${poster_path}`}}
        avatarStyle={{width: 40, height: 60}}
        onPress={(e) => this.props.goToMovieDetails(e,item)}
      />
    );
  }

  renderFavorites = () => {
    const moviesArr = Object
      .keys(this.props.movies)
      .map((id) => this.props.movies[id])
      .sort((a,b) => a.index < b.index);
    if (moviesArr.length === 0 ) return (
      <Text style={styles.noMovies}>Search movies & add favourites...</Text>
    );
    return (
      <FlatList
        data={moviesArr}
        keyExtractor={item => item.id}
        renderItem={({item}) => this.renderItem(item)}
      />
    );
  }

  render () {
    return (
      <View>
        <View style={styles.listNameContainer}>
          <Text style={styles.favourites}>YOUR FAVOURITES</Text>
        </View>
        {this.renderFavorites()}
      </View>

    );
  }
}

export default Favourites;

const styles = StyleSheet.create({
  listNameContainer: {
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  favourites: {
    fontSize: 18,
    color: '#E31222',
    paddingLeft: 5,
    paddingVertical: 5,
    letterSpacing: 1,
    fontFamily: 'Helvetica Neue'
  },
  noMovies: {
    color: '#999',
    marginTop: 50,
    fontSize: 20,
    alignSelf: 'center',
  },
});
