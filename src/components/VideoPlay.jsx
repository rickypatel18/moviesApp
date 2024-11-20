import React from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetail from "../hooks/useFetchDetail";

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetail(
    `/${media_type}/${data?.id}/videos`
  );
  console.log({ videoData });

  return (
    <div className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full max-h-[50vh]  max-w-screen-lg aspect-video rounded  relative">
        <button
          onClick={close}
          className="absolute -right-2 -top-5 text-3xl z-50"
        >
          <IoClose />
        </button>
        <iframe
          title="Video Player"
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default VideoPlay;
