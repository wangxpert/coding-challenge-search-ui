import React from "react";

type SearchResult = {
    id: string;
    title: string;
    url: string;
    description: string;
    category: "VIDEOS" | "PLAYLISTS" | "BLOG_POSTS";
};

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Search UI Challenge</h1>
                [This is Dev Environment]
            </header>
        </div>
    );
}

export default App;
