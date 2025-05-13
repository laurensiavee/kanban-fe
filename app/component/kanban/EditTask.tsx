'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { API_DEV_URI } from "@/app/const/const";

export default function EditTask(props: any) {

    function handleStateModal(isShow: boolean){
        props.changeState(isShow)
    }

    const boardNo = props.boardNo
    const task = props.task

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");

    useEffect(() =>{
        setTaskTitle(task.task_title)
        setTaskDesc(task.task_desc)
    }, [])
    
    function handleChangeTaskTitle(event){
        setTaskTitle(event.target.value)
    }

    function handleChangeTaskDesc(event){
        setTaskDesc(event.target.value)
    }

    function editTask() {
        const newTask = {
            task_no: task.task_no,
            task_state: task.task_state,
            task_title: taskTitle,
            task_desc: taskDesc,
        }

        console.log("boardNo", boardNo)

        const uri = API_DEV_URI + `board/` + boardNo + `/task/` + task.task_no;
        axios
          .put(uri, newTask)
          .then((res) => {})
          .finally(() => {
            handleStateModal(false)
            window.location.href = "/kanban/" + boardNo;
        });
    }

  return (

    <>
        <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 border-white border outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-600 rounded-t">
                <h3 className="text-2xl font-semibold">
                    Edit Task
                </h3>
                <div className="px-3 text-gray-500 text-sm font-bold mb-2 align-middle">
                    <p>{task.task_no}</p>
                </div>
                <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleStateModal(false)}
                >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                </span>
                </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    <form className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            {/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0"> */}
                                <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
                                    Title
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Title..." 
                                value={taskTitle} onChange={handleChangeTaskTitle}/>
                                {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" /> */}
                                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                            </div>    

                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
                                    Description
                                </label>
                                <textarea id="comment" rows="4" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Description..." required 
                                value={taskDesc} onChange={handleChangeTaskDesc} />
                            </div>    
                        </div>   
                    </form> 
                </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 rounded-b my-5">
                <button
                className="text-red-500 bg-transparent hover:border-red-500 border border-transparent focus:outline-none font-medium 
                rounded-3xl text-sm px-5 py-3 text-center m-2 outline-none"
                type="button"
                onClick={() => handleStateModal(false)}
                >
                Cancel
                </button>
                <button
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:outline-none font-medium 
                rounded-3xl text-sm px-5 py-3 text-center m-2 outline-none"
                type="button"
                onClick={() => editTask()}
                >
                Save
                </button>
            </div>
            </div>
        </div>
        </div>
        <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
