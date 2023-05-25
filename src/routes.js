import Home from "./views/Home.vue";
import MovieDetail from "./components/MovieDetail.vue";
const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Movie Details",
    path: "/details/:id",
    component: MovieDetail,
  },
];

export default routes;
