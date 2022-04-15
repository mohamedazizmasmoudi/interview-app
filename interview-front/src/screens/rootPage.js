import { useState, useRef } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { useHistory } from "react-router-dom";
import { CgEnter } from "react-icons/cg";
import { BsPlusSquare } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { HiClipboardCopy } from "react-icons/hi";

dotenv.config();

const Rootpage = () => {
  const [loading, setLoading] = useState(false);
  const [newMeetLoading, setNewMeetLoading] = useState(false);
  const meetRef = useRef(null);
  const [newId, setId] = useState("");
  const history = useHistory();

  const validateMeet = async (meetId) => {
    try {
      const meetData = await axios.post(
        process.env.REACT_APP_BACKEND_SERVER_URL + "/id/isValid",
        { meetId }
      );
      const { status } = meetData.data;
      return status;
    } catch (error) {
      console.log('err')
      return false;
    }
  };

  const joinMeet = async () => {
    setNewMeetLoading(true);
    if (meetRef.current.value === "") {
      console.log('err')
      setNewMeetLoading(false);
      return;
    }

    const isValidMeet = await validateMeet(meetRef.current.value);

    if (isValidMeet) {
      history.push(`/${meetRef.current.value}`);
    } else {
      console.log('err')
    }
    setNewMeetLoading(false);
  };

  const creatNewMeet = async () => {
    if (newId !== "") {
      console.log("Psst 🤔 , You already generated a new id !");
      return;
    }
    setLoading(true);

    try {
      const meetingId = await axios.post(
        process.env.REACT_APP_BACKEND_SERVER_URL + "/id"
      );
      // console.log(meetingId.data.id);
      setId(meetingId.data.id);
      console.log(" 🚀 Copy and Send the meet id to your friends ");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (

              <form className="">
                <div className="mb-4">
                  <label className="block text-white py-2 font-bold mb-2">
                    Join a meet
                  </label>
                  <input
                    className="shadow appearance-none border rounded "
                    id="meetId"
                    type="text"
                    ref={meetRef}
                    placeholder="Meet-id ..."
                  />
                </div>

                <div className="flex flex-row pt-2">
                  <div className="flex items-center justify-between mr-5">
                    <button
                      className="text-white font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={() => joinMeet()}
                    >
                      <div className="flex flex-row justify-center items-center gap-x-2 sm:gap-x-1">
                        {newMeetLoading ? (
                          <div className="w-8 h-8 mx-3 border-4 border-white rounded-full loader" />
                        ) : (
                          <>
                            <CgEnter size={20} />
                            <span>Join meet</span>
                          </>
                        )}
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className="text-white font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={() => creatNewMeet()}
                    >
                      <div className="flex flex-row justify-center items-center gap-x-2 sm:gap-x-1">
                        {loading ? (
                          <div className="w-8 h-8 mx-3 border-4 border-white rounded-full loader" />
                        ) : (
                          <>
                            <BsPlusSquare size={18} />
                            <span>Create meet</span>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
                {newId && (
                  <>
                    <div className="flex flex-row justify-between text-md p-3 rounded-md shadow-inner my-6 bg-white">
                      <span>{newId ?? ""}</span>
                      <HiClipboardCopy
                        size={20}
                        className="cursor-pointer"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(newId);
                            console.log(" 🚀 Meeting id copied to clipboard ");
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      />
                    </div>
                    <span className="text-sm italic flex flex-row gap-x-1">
                      <AiFillInfoCircle size={18} />
                      Your friends join in with this id.
                    </span>
                  </>
                )}
              </form>
  );
};

export default Rootpage;
