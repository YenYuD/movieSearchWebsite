import axios from "axios";
import urlJoin from "url-join";

const PATHNAME_PREFIX = "https://api.themoviedb.org/3";

export const MovieSearchService = {
    PATHNAME_PREFIX,
    GetMovieDataByID,
    GetPopularMovies,
    GetAllGernes,
    FilterMovieByGenre,
};

export const api_key = process.env.NEXT_PUBLIC_REACT_APP_API_KEY;

async function GetMovieDataByID(movieID: string) {
    const url = urlJoin(PATHNAME_PREFIX, "movie", movieID);
    const res = await axios.get(url, {
        params: {
            api_key,
            language: "en-US",
        },
    });
    return res.data;
}

GetMovieDataByID.fnName = "MovieSearchService.GetMovieDataByID";

async function GetPopularMovies() {
    const url = urlJoin(PATHNAME_PREFIX, "movie/popular");
    const res = await axios.get(url, {
        params: {
            api_key,
            language: "en-US",
            page: 1,
        },
    });
    return res.data;
}

GetPopularMovies.fnName = "MovieSearchService.GetPopularMovies";

async function GetAllGernes() {
    const url = urlJoin(PATHNAME_PREFIX, "genre/movie/list");
    const res = await axios.get(url, {
        params: {
            api_key,
            language: "en-US",
        },
    });
    return res.data;
}

GetAllGernes.fnName = "MovieSearchService.GetAllGernes";

async function FilterMovieByGenre(page: number = 1, genre?: number) {
    const url = urlJoin(PATHNAME_PREFIX, "discover/movie");
    const res = await axios.get(url, {
        params: {
            api_key,
            language: "en-US",
            sort_by: "popularity.desc",
            include_adult: false,
            include_video: false,
            page: page,
            with_genres: genre,
        },
    });

    return res.data;
}

FilterMovieByGenre.fnName = "MovieSearchService.FilterMovieByGenre";
