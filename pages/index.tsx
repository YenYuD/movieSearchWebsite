import React from "react"
import MovieHomePage from "../components/movieWebSites/homePage/MovieHomePage"
import Head from "next/head"

export default function HomePage() {

  return (
    <>
      <Head>
        <title>Movie Search Website</title>
        <meta name="description" content="A website for you to explore the latest movies with all kinds of genre..." />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/images/popcorn.png" />
      </Head>
      <MovieHomePage />
    </>
  )
}
