import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator} from 'react-native';

import { Button } from 'react-native-elements';

class SearchList extends Component {

  renderItem = (item) => {
    const { poster_path, id, title } = item;
    const favorite = Object
      .keys(this.props.favorites)
      .find((itemId) => Number(itemId) === id);
    const fullPath = `https://image.tmdb.org/t/p/w185/${poster_path}`;
    return (
      <View>
        { poster_path !== null ? (
          <TouchableOpacity onPress={(e) => this.props.goToMovieDetails(e,item)}>
            <Image style={styles.image} source={{uri: fullPath}}/>
          </TouchableOpacity>
        ) : (
          <View style={styles.noImage}>
            <Text>{title}</Text>
          </View>
        )}
        <Button
          title='add'
          borderRadius={4}
          disabled={favorite ? true : false}
          style={styles.button}
          icon={{name: 'playlist-add'}}
          onPress={(e) => this.props.handleAddToFavourites(e,id)}
        />
      </View>
    );
  }

  renderFooter = () => {
    const { fetching } = this.props;
    return fetching ? (
      <View>
        <ActivityIndicator style={styles.activityIndicator} animating size='large'/>
      </View>
    ) : null;
  }

  render () {
    const moviesArr = Object
      .keys(this.props.searchedMovies)
      .map((id) => this.props.searchedMovies[id]);
    return moviesArr.length > 0 ? (
      <View>
        <FlatList
          horizontal
          data={moviesArr}
          style={styles.list}
          keyExtractor={item => item.id}
          renderItem={({item}) => this.renderItem(item)}
          ItemSeparatorComponent={() => <View style={{width: 5}}/>}
        />
      </View>
    ) : (
      this.renderFooter()
    );
  }
}

export default SearchList;

const styles = StyleSheet.create({
  list: {
    marginTop: 5,
  },
  image: {
    height: 300,
    width: 200,
  },
  noImage: {
    height: 300,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    paddingVertical: 40,
  },
  button: {
    marginVertical: 5,
    width: '50%',
    alignSelf: 'center'
  }
});
