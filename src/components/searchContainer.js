// SearchContainer.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utils/constants';
import SearchIcon from '../icons/Search';
import FilterIcon from '../icons/Filter';

const SearchContainer = ({searchQuery, setSearchQuery, showFilter}) => {
  return (
    <View style={styles.searchContainer}>
      <View
        style={[
          styles.searchBarContainer,
          showFilter ? styles.withFilter : styles.fullWidth,
        ]}>
        <SearchIcon width={24} height={24} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Here"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {showFilter && (
        <TouchableOpacity style={styles.filterBtn}>
          <FilterIcon width={24} height={24} />
          <Text style={styles.menuText}>Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
  },
  searchBarContainer: {
    height: 50,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.7,
    marginLeft: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  withFilter: {
    width: '70%',
  },
  fullWidth: {
    width: '92%',
  },
  searchBar: {
    width: '82%',
    height: '100%',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 50,
    width: '17%',
    marginRight: '4%',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
});

export default SearchContainer;
