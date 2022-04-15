import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "peerjs";
import Video from "../components/video";
import { SocketContext } from "../context/socket";
import dotenv from "dotenv";

dotenv.config();

//Config Peer Object

var peer = new Peer();

const RoomPage = () => {
  const { roomId } = useParams();
  const socket = useContext(SocketContext);
  const [id, setId] = useState(null);

  console.log(roomId);

  useEffect(() => {
    console.log(peer);
    peer.on("open", (id) => {
      console.log("id",id);
      setId(id)
      socket.emit("join-room", roomId, id);
    });
    // socket.emit("join-room", roomId, peer._options.token);
  }, [roomId, socket]);

  return (
    <>
      <div className="flex flex-col md:flex-row  xs:flex-col w-full justify-start gap-x-4 ">
        <Video roomId={roomId} peer={peer} id={id} setId={setId} />
      </div>
    </>
  );
};

export default RoomPage;
