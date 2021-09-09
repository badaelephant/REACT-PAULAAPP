import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#3143e8',
  },
  textInput: {
    width: 300,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
  },
  linkText: {
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

export default Styles;
