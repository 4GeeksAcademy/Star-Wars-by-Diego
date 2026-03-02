import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar/Navbar"
import { Footer } from "../components/Footer"
import { SearchBar } from "../components/SearchBar"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <main>
                <Navbar />
                <SearchBar/>
                <Outlet /> 
                <Footer />
            </main>
        </ScrollToTop>
    )
}