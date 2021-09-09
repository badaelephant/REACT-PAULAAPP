import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext({});

const AppContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const setData = async () => {
    AsyncStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        getData,
        setData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppContextProvider};
