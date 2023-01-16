import axios from "axios";
import urlJoin from "url-join";

const PATHNAME_PREFIX = "https://api.themoviedb.org/3";

export const MovieSearchService = {
    PATHNAME_PREFIX,
    GetMovieDataByID,
};

const api_key = "97a0ecdf541080bcb45926a6ba81b292";

async function GetMovieDataByID(movieID: string) {
    const url = urlJoin(PATHNAME_PREFIX, "movie", movieID);
    const res = await axios.get(url, {
        params: {
            api_key,
            language: "zh-TW",
        },
    });

    return res.data;
}

GetMovieDataByID.fnName = "MovieSearchService.GetMovieDataByID";
