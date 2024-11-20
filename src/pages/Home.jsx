import React from "react";
import BannerHome from "../components/BannerHome";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingMovie = useSelector((state) => state.movieoData.bannerData);
  // const [nowPlayingData, setNowPlayingData] = useState([]);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: upcomingData } = useFetch("/movie/upcoming");

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard
        data={trendingMovie}
        heading={"Trending Movies"}
        trending={true}
      />
      <HorizontalScrollCard
        data={nowPlayingData}
        heading={"Now Playing Movies"}
        media_type={"movie"}
      />
      media_type={"movie"}
      <HorizontalScrollCard
        data={topRatedData}
        heading={"Top Rated Movies"}
        media_type={"movie"}
      />
      <HorizontalScrollCard
        data={popularTvShowData}
        heading={"Popular TV Shows"}
        media_type={"tv"}
      />
      <HorizontalScrollCard
        data={upcomingData}
        heading={"Upcoming Movies"}
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
