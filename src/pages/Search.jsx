import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const Search = () => {
  const location = useLocation();
  console.log({ location });
  const [data, setData] = useState([]);
  const[pageNo,setPageNo] = useState(1);
  const navigate= useNavigate()

  const query = location?.search?.slice(3)

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: pageNo,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log("location", location);

  useEffect(() => {
    if(query){

      setPageNo(1)
      setData([])
      fetchData();
    }
  }, [location.search]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };
  useEffect(() => {
    if(query){

      fetchData();
    }
    }, [pageNo]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-1 sticky top-0 z-20">
        <input className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900" type="text" placeholder="search here..." onChange={(e) => navigate(`/search?q=$(e.target.value)`)} value={query.split("%20").join(" ")} />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-2">
          Search Results
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((searchData, index) => {
            return (
              <Card
                data={searchData}
                key={searchData.id + "searchSection"}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
