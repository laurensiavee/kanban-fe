'use client'

import AddTask from "@/app/component/kanban/AddTask";
import Board from "../../component/kanban/Board";
import { useEffect, useState } from "react";

export default function Home({params}) {
    const board_no = params.id
    const [isShowModal, setIsShowModal] = useState(false);
    const [key, setKey] = useState(0); // Add state to force re-render of Board

    function handleStateModal(isShow: boolean){
      setIsShowModal(isShow)
    }

    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Update key to force re-render
    }, [isShowModal]);


    return (
      <>
        <button data-modal-target="static-modal" data-modal-toggle="static-modal" type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium 
          rounded-full text-sm px-5 py-3 text-center m-5 outline-none"
          onClick={() => handleStateModal(true)}>+</button>

        {isShowModal && <AddTask board_no={board_no} changeState = {handleStateModal}/>}

        <Board key={key} board_no={board_no}/>
      </>
    );
  }