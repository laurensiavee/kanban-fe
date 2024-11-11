'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function Task(task: any) {
    return (
      <>
        <div className={`m-5 p-5 bg-slate-800 rounded-md ${task.isCancelled ? "line-through text-slate-500" : ""}`}>
            <h1 className="mb-3"><b>{task.task.task_no}</b></h1>
            <p>{task.task.task_desc}</p>
            <div className='mt-2 text-end'>
              <FontAwesomeIcon icon={faTrashAlt} className='m-0 p-0 ' />
            </div>
        </div>
      </>
    );
  }