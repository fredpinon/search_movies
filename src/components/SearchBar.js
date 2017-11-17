import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

import { debouncedSearch } from '../helpers';

class Search extends Component {

  handleSearch = (query) => {
    if (query.length > 1) debouncedSearch(query, this.props.triggerSearch);
    else {
      this.props.clearSearch();
      setTimeout(() => this.props.clearSearch(), 300);
    }
  }

  render () {
    return (
      <SearchBar
        placeholder='Search movies...'
        onChangeText={this.handleSearch}
      />
    );
  }
}

export default Search;
