import React, {Component} from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

class Credits extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}` === 'cast' ? 'Cast' : 'Crew',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTitleStyle: {
      color: '#E31222'
    },
    headerTintColor: 'white',
  });

  renderItem = (item) => {
    const { name } = this.props.navigation.state.params;
    if (name === 'cast') {
      const { name, character, profile_path } = item;
      return (
        <ListItem
          roundAvatar
          title= {`${name} as ${character}`}
          avatar={{uri: `https://image.tmdb.org/t/p/w185/${profile_path}`}}
        />
      );
    } else {
      const { job, name, profile_path } = item;
      return (
        <ListItem
          roundAvatar
          title= {`${job}: ${name}`}
          avatar={{uri: `https://image.tmdb.org/t/p/w185/${profile_path}`}}
        />
      );
    }
  }

  render () {
    const { people } = this.props.navigation.state.params;
    return (
      <FlatList
        data={people}
        keyExtractor={item => item.credit_id}
        renderItem={({item}) => this.renderItem(item)}
      />
    );
  }
}

export default Credits;
