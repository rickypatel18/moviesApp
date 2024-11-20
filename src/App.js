import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData } from "./store/movieoSlice";
import { setImageUrl } from "./store/movieoSlice";

function App() {
  const dispatch = useDispatch();

  const fetchtrendingData = async () => {
    try {
      // Log the Authorization header to verify the token is correctly set
      // console.log("Authorization Header:", axios.defaults.headers.common["Authorization"]);

      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response.data.results));
      // console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("./configuration");
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
      // console.log({ response });
      // console.log( response.data.images.secure_base_url+"original" );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchtrendingData();
    fetchConfiguration();
  }, []); // Empty dependency array to call the function only once

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
