import Header from "../Component/Header";
import NewFood from "../Component/NewFood";
import RecommendedFood from "../Component/RecommendedFood";
import Service from "../Component/Service";
import Service2 from "../Component/Service2";
import Special from "../Component/Special";

const Home = () => {
  return (
    <div>
      <Header />
      <RecommendedFood />
      <Service />
      <NewFood />
      <Service2 />
      <Special />
    </div>
  );
};

export default Home;
