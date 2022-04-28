import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "peerjs";
import Video from "../components/video";
import { SocketContext } from "../context/socket";
import dotenv from "dotenv";

dotenv.config();

//Config Peer Object

var peer = new Peer();


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

        <Video roomId={roomId} peer={peer} />
      </div>
    </>
  );
};

export default RoomPage;
