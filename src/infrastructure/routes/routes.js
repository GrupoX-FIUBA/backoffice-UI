import MainPage from '../../application/pages/public/MainPage';
import HomePage from '../../application/pages/private/HomePage';

const Routes = [
	{
    title: "Login",
    path: "/",
    component: MainPage
  },
  {
    title: "Home",
    path: "/home",
    component: HomePage
  }
];

export default Routes;