import {
  HomePage,
  AboutPage,
} from 'components/pages';

export default function routes() {
  return {
    indexRoute: {
      component: HomePage
    },
    childRoutes: [
      {
        path: "/",
        component: HomePage
      },
      {
        path: "/about",
        component: AboutPage
      }
    ]
  };
}
