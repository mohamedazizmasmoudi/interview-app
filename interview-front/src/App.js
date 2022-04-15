import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RoomPage from "./screens/roomPage";
import { SocketContext, socket } from "./context/socket";
import Rootpage from "./screens/rootPage";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        {/* <Switch> */}
        <Route path="/" exact>
          <div>
            <Rootpage />
          </div>
        </Route>
        <Route path="/:roomId" exact>
          <RoomPage
          />
        </Route>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
