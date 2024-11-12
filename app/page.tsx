"use client";

import Image from "next/image";
import axios from "axios";
import { API_DEV_URI, ACCESS_TOKEN } from './const/const';
import { useState } from "react";
import AddBoard from "./component/kanban/AddBoard";

export default function Home() {

  const [isLoading, setLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  
  if(isLoading) getBoard();

  function getBoard() {
    const uri = API_DEV_URI + `board/list`;
    // const accessToken = ACCESS_TOKEN

    axios
      .get(uri, {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${accessToken}`,
        },
        withCredentials: true, // Add this line for credentials: 'include'
      })    
      .then((res) => {
        const board = res.data
      })
      .finally(() => {
        setLoading(false)
      });
  }

  function handleStateModal(isShow: boolean){
    setIsShowModal(isShow)
  }

  return (
    <>
      <div> home
      </div>
      <div>
        <button data-modal-target="static-modal" data-modal-toggle="static-modal" type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium 
            rounded-full text-sm px-5 py-3 text-center m-5 outline-none"
            onClick={() => handleStateModal(true)}>+  Add New Board </button>
      </div>

      {isShowModal && <AddBoard changeState = {handleStateModal}/>}

    </>
  );
}
