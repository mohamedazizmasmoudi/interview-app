import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Peer from "peerjs";
import Video from "../components/video";
import SharedContent from "../components/shared";
import { SocketContext } from "../context/socket";
import dotenv from "dotenv";
import "react-toastify/dist/ReactToastify.css";

dotenv.config();

//Config Peer Object
const peer = new Peer(undefined, {
  path: "/peerJs",
  host: "/",
  port: 5000,
  // key: "peerJs",
  secure: false,
});

const RoomPage = ({ isBoardActive, setBoardActive }) => {
  const { roomId } = useParams();
  const socket = useContext(SocketContext);

  console.log(roomId);

  useEffect(() => {
    console.log(peer);
    console.log(peer.id);
    socket.emit("join-room", roomId, peer.id);
  }, [roomId, socket]);

  return (
    <>
      <div className="flex flex-col md:flex-row  xs:flex-col w-full justify-start gap-x-4 ">
        <SharedContent
          isBoardActive={isBoardActive}
          setBoardActive={setBoardActive}
          peer={peer}
        />
        <Video roomId={roomId} peer={peer} />
      </div>
    </>
  );
};

export default RoomPage;
