import ButtonAppBar from './components/AppBar';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <ButtonAppBar />

      <Outlet />
    </div>
  );
}

export default App;
