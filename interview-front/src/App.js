import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RoomPage from "./screens/roomPage";
import { SocketContext, socket } from "./context/socket";
import Rootpage from "./screens/rootPage";
import Signin from "./screens/Signin";

import Navbar from "./components/nav";

function App() {
  const [isBoardActive, setBoardActive] = useState(true);
  const [isAuth, setisAuth] = useState(null);
  const isAuthfct = useCallback(() => {
    const token = localStorage.getItem("tokenpeerjsapp");
    if (token && token.length > 0) setisAuth(true);
    else setisAuth(false);
  }, []);
  useEffect(() => {
    isAuthfct();
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <React.Fragment>
          <>
            {!isAuth ? (
              <Route path="/" exact>
                <div>
                  <Signin />
                </div>
              </Route>
            ) : (
              <>
                {/* <Switch> */}
                <Route path="/" exact>
                  <div>
                    <Rootpage />
                  </div>
                </Route>
                <Route path="/:roomId" exact>
                  <Navbar
                    isBoardActive={isBoardActive}
                    setBoardActive={setBoardActive}
                  />
                  <RoomPage
                    isBoardActive={isBoardActive}
                    setBoardActive={setBoardActive}
                  />
                </Route>
              </>
            )}
          </>
        </React.Fragment>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
