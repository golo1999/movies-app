import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import MoviesList from "../components/MoviesList";

const Movies = () => {
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {pageIsLoading && (
        <View>
          <Text>Fetching data...</Text>
        </View>
      )}
      {!pageIsLoading && <MoviesList />}
    </>
  );
};

export default Movies;
