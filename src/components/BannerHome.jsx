import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  //   console.log(bannerData);
  const imageUrl = useSelector((state) => state.movieoData.imageUrl);

  const [currenImage, setCurrentImage] = useState(0);

  //   const handleNext = () => {
  //     if (currenImage < bannerData.length - 1) {
  //       setCurrentImage((prev) => prev + 1);
  //     }
  //   };
  //   const handlePrevious = () => {
  //     if (currenImage > 0) {
  //       setCurrentImage((prev) => prev - 1);
  //     }
  //   };

  const handleNext = () => {
    setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : bannerData.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currenImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerData, imageUrl,currenImage]);

  return (
    <section className="w-full h-full ">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data) => {
          //   console.log({data});

          return (
            <div
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidde relative group transition-all"
              style={{ transform: `translateX(-${currenImage * 100}%)` }}
              key={data.id+"bannerHome"}
            >
              <div className="w-full h-full">
                <img
                  src={imageUrl + data.backdrop_path}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              {/* button next and previous image */}
              <div className="absolute top-0 w-full h-full hidden items-center justify-between p-4 group-hover:lg:flex">
                <button
                  className="bg-white p-1 rounded-full text-xl z-10 text-black"
                  onClick={handlePrevious}
                >
                  <FaAngleLeft />
                </button>
                <button
                  className="bg-white p-1 rounded-full text-xl z-10 text-black"
                  onClick={handleNext}
                >
                  <FaAngleRight />
                </button>
              </div>
              <div className="absolute top-0  w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

              <div className="container mx-auto">
                <div className="w-full absolute bottom-0 max-w-md px-3 ml-10 ">
                  <h2 className="font-bold text-2xl lg:text-4xl text-whited drop-shadow-2xl">
                    {data.title || data.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View : {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <button className="bg-white px-4 py-2 text-black font-bold mt-5 rounded hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all  hover:scale-105">
                    Play Trailer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
