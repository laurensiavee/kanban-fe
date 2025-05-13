"use client";
import { API_DEV_URI } from "@/app/const/const";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [boardList, setBoardList] = useState([]);

    function getBoardList() {
        const uri = API_DEV_URI + `board/list`;
    
        axios
          .get(uri, {
            headers: {
              "Content-Type": "application/json",
            },
          })    
          .then((res) => {
            const boards = res.data.data
            setBoardList(boards[0])
          })
          .finally(() => {
          });
    }

    useEffect(() =>{
        getBoardList()
    }, [])

    return (
      <>
        <aside id="default-sidebar" className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-teal-400 group-hover:text-teal-200 dark:group-hover:text-teal-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg>
                        <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                    {boardList.map((board, index) => (
                        <li  key={index}>
                            <a href={`/kanban/${board.board_no}`} className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
                                <span className="text-sm flex-1 ms-3 whitespace-nowrap">{board.board_no} - {board.board_name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
      </>
    );
}