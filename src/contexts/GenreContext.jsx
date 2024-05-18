import { createContext, useMemo } from "react";
import { fetchData } from "../tools/fetchData";
import PropTypes from "prop-types";

export const GenreContext = createContext();

export function GenreContextProvider({ children }) {
  const { fetchedData } = fetchData("filter");
  const fetchedGenre = fetchedData ? fetchedData.genres : [];

  const genreValue = useMemo(() => ({ fetchedGenre }), [fetchedGenre]);

  return <GenreContext.Provider value={genreValue}>{children}</GenreContext.Provider>;
}

// GenreContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
