import React from 'react'
import MainPage from '../../application/pages/public/MainPage';
import HomePage from '../../application/pages/private/HomePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMusic, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import UserPage from '../../application/pages/private/UserPage';
import PrivatePage from '../../application/pages/private/PrivatePage';
import ContentPage from '../../application/pages/private/ContentPage';

const Routes = [
	{
    title: "Login",
    path: "/",
    component: MainPage,
    type: 'public'
  },
  {
    title: "Home",
    path: "/home",
    component: PrivatePage,
    children: HomePage,
    icon: <FontAwesomeIcon icon={faHome}/>,
    type: 'private'
  },
  {
    title: "User Management",
    path: "/users",
    component: PrivatePage,
    children: UserPage,
    icon: <FontAwesomeIcon icon={faUserFriends}/>,
    type: 'private'
  },
  {
    title: "Content Management",
    path: "/content",
    component: PrivatePage,
    children: ContentPage,
    icon: <FontAwesomeIcon icon={faMusic}/>,
    type: 'private'
  }
];

export default Routes;