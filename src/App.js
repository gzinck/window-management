import { BrowserRouter, Routes, Route } from "react-router-dom";
import DraggableWindowScreen from "./components/window/DraggableWindowScreen";
import DraggableCircleScreen from "./components/drawing/DraggableCircleScreen";
import Home from "./components/home/Home";
import { HOME_ROUTE, WINDOW_ROUTE, DRAW_ROUTE } from "./routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={DRAW_ROUTE} element={<DraggableCircleScreen />} />
        <Route path={WINDOW_ROUTE} element={<DraggableWindowScreen />} />
        <Route path={HOME_ROUTE} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
