import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useFetchDetail from "../hooks/useFetchDetail";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import VideoPlay from "../components/VideoPlay";

const Details = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const params = useParams();
  const imageUrl = useSelector((state) => state?.movieoData?.imageUrl);

  const { data } = useFetchDetail(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetail(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendation`
  );

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");

  return (
    <div className="">
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageUrl + data?.backdrop_path}
            className="h-full w-full object-cover"
            alt="img"
          />
        </div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageUrl + data?.poster_path}
            alt="img"
            className="h-80 w-90 object-cover rounded"
          />
          <button
            className="mt-3 w-full py-3 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500"
            onClick={() => handlePlayVideo(data)}
          >
            Play Now
          </button>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>
          <Divider />
          <div className="flex items-center my-3 gap-3">
            <p>Rating: {Number(data?.vote_average).toFixed(1)}</p>
            <span>|</span>
            <p> View:{Number(data?.vote_count)}</p>
            <span>|</span>

            <p>
              Duration : {duration[0]}h {duration[1]}min
            </p>
          </div>
          <Divider />
          <div>
            <h3 className="text-xl font-bold text-white ">Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
            </div>
            <Divider />
          </div>
          <div className="container mx-auto">
            <h3 className="text-lg lg:text-2xl font-bold ">Star cast</h3>
            <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-4">
              {castData?.cast
                ?.filter((el) => el?.profile_path)
                .map((cast, index) => {
                  return (
                    <div>
                      <div>
                        <img
                          src={imageUrl + cast?.profile_path}
                          className="w-25 h-25 object-cover rounded-full"
                          alt="img"
                        />
                      </div>
                      <p className="font-bold text-center text-sm">
                        {cast?.name}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar" + params?.explore}
        />
      </div>
      <div>
        <HorizontalScrollCard
          data={recommendationData}
          heading={"Recommendation " + params?.explore}
        />
      </div>
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default Details;
