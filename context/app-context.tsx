"use client";

import { createContext, useContext, useEffect, useState, useReducer } from "react";
import { fetchVideos } from '../api/video'

export const AppContext = createContext({
  videos: [],
  error: "",
  totalVideos: 0,
  loadingVideos: false,
  nextPageToken: "",
  selectedCategory: "",
  setError: () => {},
  setVideos: () => {},
  setTotalVideos: () => {},
  setLoadingVideos: () => {},
  setNextPageToken: () => {},
  setSelectedCategory: () => {},
  isAuthenticated: false,
  user: null,
  login: (user: any) => {},
  logout: () => {},
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AppContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [totalVideos, setTotalVideos] = useState(0);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getVideos = async () => {
    setLoadingVideos(true);
    try {
      const data: any = await fetchVideos();

      if (data) {
        setVideos(data);
        setLoadingVideos(false);
      }
    } catch (error) {
      setError("Failed to fetch vidoes.");
      throw new Error(`${error}`)
    }
  };

  useEffect(() => {
    if (selectedCategory === "") {
      return;
    }

    setVideos([]);
    setError("");
    setTotalVideos(0);
    setNextPageToken("");
    setLoadingVideos(true);

    getVideos();
  }, [selectedCategory]);

  useEffect(() => {
    let getAuthToken;
    if (typeof window !== 'undefined') {
      getAuthToken = JSON.parse(localStorage.getItem('token') as any);
    }

    if (getAuthToken) {
      dispatch({
        type: 'LOGIN',
        payload: getAuthToken,
      });
    }
  }, [state.user]);

  const login = (token: any) => {
    localStorage.setItem('token', JSON.stringify(token));
    dispatch({
      type: 'LOGIN',
      payload: token,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false)
    dispatch({ type: 'LOGOUT' });
  };

  const appContext: any = {
    videos,
    error,
    totalVideos,
    loadingVideos,
    nextPageToken,
    selectedCategory,
    setError,
    setVideos,
    setTotalVideos,
    setLoadingVideos,
    setNextPageToken,
    setSelectedCategory,
    isAuthenticated,
    user: state.user,
    login,
    logout,
  }

  return (
    <AppContext.Provider value={appContext} >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
