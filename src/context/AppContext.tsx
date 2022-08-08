import React, { useState, FC, useContext } from 'react';
import { City } from '../views/City/CityList/CityList.component';
import { Community } from '../views/Community/CommunityList/CommunitList.component';

interface IThemeContext {
  showModal: Boolean;
  cities: City[];
  user: any,
  currentCity: City,
  communities: Community[],
  currentCommunity: Community,
  setShowModal: (value: boolean) => void,
  setUser: (user:any) => void,
  setCurrentCity: (city: City) => void,
  setCommunities: (communities: any, id?:string) => void,
  setCurrentCommunity: (community: Community) => void
}

const defaultState = {
  showModal: false,
  cities: [],
  user: {},
  currentCity: {nombre: '', id: '', created_at: '', updated_at: ''},
  communities: [],
  currentCommunity: {    
    id: '',
    tipocalle: '',
    nombrecalle: '',
    numerocalle: '',
    createdAt: '',
    updatedAt: '',
    ciudadId: ''},
  setShowModal: (value: boolean) => {
    defaultState.showModal = value;
  },
  setUser: (user: any) => {
    defaultState.user = user;
  },
  setCurrentCity: (city: City) => {
    defaultState.currentCity = city;
  },
  setCurrentCommunity: (community: Community) => {
    defaultState.currentCommunity = community;
  },
  setCommunities: (communities:any, id?:string) => {
    if(id) {
      defaultState.communities = defaultState.communities.filter((elem:any) => elem?.id !== id);
    } else {
      defaultState.communities = communities
    }

  },
};

export const ThemeContext = React.createContext<IThemeContext>(defaultState);

export const ThemeProvider: React.FC<any> = ( {children} ) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(defaultState.user);
  const [cities, setCities] = useState(defaultState.cities);
  const [currentCity, setCurrentCity] = useState(defaultState.currentCity);
  const [communities, setCommunities] = useState(defaultState.communities);
  const [currentCommunity, setCurrentCommunity] = useState(defaultState.currentCommunity)

  return (
    <ThemeContext.Provider
      value={{
        showModal,
        cities,
        user,
        currentCity,
        communities,
        currentCommunity,
        setShowModal,
        setUser,
        setCurrentCity,
        setCommunities,
        setCurrentCommunity
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () =>  useContext(ThemeContext);