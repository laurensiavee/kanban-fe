'use client'

import AddTask from "@/app/component/kanban/AddTask";
import Board from "../../component/kanban/Board";
import { useEffect, useState } from "react";
import { API_DEV_URI } from "@/app/const/const";
import axios from "axios";
import EditBoard from "@/app/component/kanban/EditBoard";


export default function Home({params}) {
    const board_no = params.id
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [key, setKey] = useState(0); // Add state to force re-render of Board
    const [boardName, setBoardName] = useState("");
    const [board, setBoard] = useState();

    function handleStateModal(isShow: boolean){
      setIsShowModal(isShow)
    }

    function handleStateModalEdit(isShow: boolean){
      setIsShowModalEdit(isShow)
    }

    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Update key to force re-render
        getBoard(board_no)
    }, [isShowModal]);

    function deleteBoard(boardNo: string){
      const uri = API_DEV_URI + `board/` + boardNo ;
      axios
        .delete(uri)
        .then((res) => {})
        .finally(() => {
          window.location.href = "/";
      });
    }

    function getBoard(board_no: string) {
      const uri = API_DEV_URI + `board/` + board_no;
  
      axios
        .get(uri, {
          headers: {
            "Content-Type": "application/json",
          },
        })    
        .then((res) => {
          const board = res.data
          setBoardName(board.data[0].board_name)
          setBoard(board.data[0])
        })
        .finally(() => {
        });
    }
    
    return (
      <>
        <div className="flex justify-between">
          <div>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold mb-2">{board_no}</h1>
              <button data-modal-target="static-modal" data-modal-toggle="static-modal" type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium 
                rounded-3xl text-sm px-5 py-2 text-center mx-5 outline-none"
                onClick={() => handleStateModalEdit(true)}>Edit Board</button>
            </div>
            <h2>{boardName}</h2>
          </div>
          <div className="flex justify-between">
            <button data-modal-target="static-modal" data-modal-toggle="static-modal" type="button" className="text-slate-300 bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium 
              rounded-3xl text-sm px-5 py-2 text-center m-5 outline-none"
              onClick={() => deleteBoard(board_no)}>Delete Board</button>
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <button data-modal-target="static-modal" data-modal-toggle="static-modal" type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium 
            rounded-full text-sm px-5 py-3 text-center m-5 outline-none"
            onClick={() => handleStateModal(true)}>+ Add Task</button>
        </div>

        {isShowModal && <AddTask board_no={board_no} changeState = {handleStateModal}/>}
        
        {isShowModalEdit && <EditBoard board={board} changeState = {handleStateModalEdit}/>}

        <Board key={key} board_no={board_no}/>
      </>
    );
  }