'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { API_DEV_URI } from '@/app/const/const';
import axios from 'axios';
import { useState } from 'react';
import EditTask from './EditTask';

export default function Task(task: any) {
  function deleteTask(taskNo, boardNo){
    const uri = API_DEV_URI + `board/` + boardNo + `/task/` + taskNo;
    axios
      .delete(uri)
      .then((res) => {})
      .finally(() => {
        window.location.href = "/kanban/" + boardNo;
    });
  }
  
  function editTask(taskNo, boardNo){
    console.log(task)
    handleStateModal(true)
  }
  
  const [isShowModal, setIsShowModal] = useState(false);
  
  function handleStateModal(isShow: boolean){
    setIsShowModal(isShow)
  }

    return (
      <>
        <div className={`m-5 p-5 bg-slate-800 rounded-md ${task.isCancelled ? "line-through text-slate-500" : ""}`}>
            <h1 className="mb-3"><b>{task.task.task_no}</b></h1>
            <p>{task.task.task_desc}</p>
            <div className='mt-2 text-end'>
              <button 
              onClick={() => editTask(task.task.task_no, task.boardNo)}>
                <FontAwesomeIcon icon={faPencilAlt} className='m-0 p-0 ' />
              </button>
              <button 
              onClick={() => deleteTask(task.task.task_no, task.boardNo)}>
                <FontAwesomeIcon icon={faTrashAlt} className='m-0 p-0 ms-2' />
              </button>
            </div>
        </div>

        {isShowModal && <EditTask boardNo={task.boardNo} task={task.task} changeState={handleStateModal}/>}
        
      </>
    );
  }