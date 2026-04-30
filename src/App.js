import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import HomePage from "@/pages/HomePage";
import BlogIndexPage from "@/pages/BlogIndexPage";
import BlogArticlePage from "@/pages/BlogArticlePage";

function App() {
    return (
        <HelmetProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/blog" element={<BlogIndexPage />} />
                        <Route path="/blog/:slug" element={<BlogArticlePage />} />
                    </Routes>
                </BrowserRouter>
                <Toaster position="bottom-right" richColors />
            </div>
        </HelmetProvider>
    );
}

export default App;
