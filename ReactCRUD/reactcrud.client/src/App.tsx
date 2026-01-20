import './App.css';
import SchoolList from "./views/SchoolList";
import SchoolDetail from "./views/SchoolDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SchoolList />} />
                <Route path="/details/:id" element={<SchoolDetail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;