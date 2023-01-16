import React from "react"
import MovieHomePage from "../components/movieWebSites/homePage/MovieHomePage"
import NavBar from '../components/Layouts/NavBar'
import Footer from "../components/movieWebSites/homePage/Footer"
import { createTheme, ThemeProvider } from "@mui/material";


const theme = createTheme({
  typography: {
    fontFamily: [
      "Antic Didone", "serif"
    ].join(','),
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#b3e5fc',
    },
  },
});

export default function HomePage() {



  return (
    <>

      <ThemeProvider theme={theme}>
        <MovieHomePage />
      </ThemeProvider>

    </>
  )
}
