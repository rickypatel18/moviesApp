import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetail = (endPoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endPoint);
      setLoading(false);
      setData(response.data);
      // console.log(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endPoint]);

  return {
    data,
    loading,
  };
};

export default useFetchDetail;