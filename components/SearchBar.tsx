import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text:string) => {
    setSearchText(text);
    // Add your search logic here
    console.log('Searching for:', text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 16,
      },
      searchInput: {
        height:55,
        backgroundColor: '#f2f2f2',
        borderRadius: 45,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
      },
});

export default SearchBar;