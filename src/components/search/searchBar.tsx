import React from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface SearchBarProps {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (phrase: string) => void;
  setClicked: (clicked: boolean) => void;
  handleCanceled: () => void;
  isValid?: boolean;
  extra?: React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({ clicked, searchPhrase, setSearchPhrase, setClicked, handleCanceled, isValid = true, extra }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        <FontAwesome.Button
          backgroundColor="#E4FBFA"
          size={clicked ? 17 : 20}
          name="search"
          color="black"
          style={{ padding: 0, paddingLeft: 5, justifyContent: "center", alignItems: "center" }}
        />

        <TextInput
          style={[styles.input, clicked && { width: "70%" }]}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
          editable={isValid}
          selectTextOnFocus={isValid}
        />
        {clicked && (
          <Entypo.Button name="cross" backgroundColor="#E4FBFA" size={20} color="black" style={{ padding: 0 }} onPress={() => {
            setClicked(false);
            setSearchPhrase("");
            Keyboard.dismiss();
            handleCanceled();
          }} />
        )}

        {extra && extra}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "95%",
  },
  searchBar__unclicked: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#E4FBFA",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#E4FBFA",
    borderRadius: 15,
    alignItems: "center",
    borderColor: '#0063B9',
    borderWidth: 1,
    justifyContent: "space-around",
  },
  input: {
    fontSize: 15,
    width: "80%",
  },
});