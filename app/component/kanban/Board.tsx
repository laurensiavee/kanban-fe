"use client";
import Task from "./Task";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { API_DEV_URI } from "@/app/const/const";

export default function Board(data: any) {
  let todoListL: any = [];
  let doingListL: any = [];
  let doneListL: any = [];
  let cancelledListL: any = [];

  const [isLoading, setLoading] = useState(true);

  const [todoList, setTodoList] = useState([]);
  const [doingList, setDoingList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [cancelledList, setCancelledList] = useState([]);

  if (isLoading) getBoard(data.board_no);

  function taskRespToList(tasks: any) {
    setTodoList([]);
    setDoingList([]);
    setDoneList([]);
    setCancelledList([]);

    tasks.forEach((task) => {
      if (task.task_state === "todo") {
        todoListL.push(task);
      } else if (task.task_state === "doing") {
        doingListL.push(task);
      } else if (task.task_state === "done") {
        doneListL.push(task);
      } else if (task.task_state === "cancel") {
        cancelledListL.push(task);
      }
    });

    setTodoList(todoListL);
    setDoingList(doingListL);
    setDoneList(doneListL);
    setCancelledList(cancelledListL);
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
        taskRespToList(board.data[0].task_list);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function updateTaskState(task, droppableId, board_no: string) {
    let nextState = "";
    switch (droppableId) {
      case "todoDroppable":
        nextState = "todo";
        break;
      case "doingDroppable":
        nextState = "doing";
        break;
      case "doneDroppable":
        nextState = "done";
        break;
      case "cancelledDroppable":
        nextState = "cancel";
        break;
      default:
        nextState = "";
        break;
    }

    task.task_state = nextState;
    const uri = API_DEV_URI + `board/` + board_no + `/task/` + task.task_no + `/state/` + task.task_state;
    axios
      .put(uri)
      .then((res) => {})
      .finally(() => {
        setLoading(true);
      });
  }

  function updateTask(task, droppableId, board_no: string) {
    let nextState = "";
    switch (droppableId) {
      case "todoDroppable":
        nextState = "todo";
        break;
      case "doingDroppable":
        nextState = "doing";
        break;
      case "doneDroppable":
        nextState = "done";
        break;
      case "cancelledDroppable":
        nextState = "cancel";
        break;
      default:
        nextState = "";
        break;
    }

    task.task_state = nextState;
    const uri = API_DEV_URI + `board/` + board_no + `/task/` + task.task_no + `/state`;
    axios
      .put(uri, {
        task_no: task.task_no,
        task_state: task.task_state,
        task_title: task.task_title,
        task_desc: task.task_desc,
      })
      .then((res) => {})
      .finally(() => {
        setLoading(true);
      });
  }

  function onDragEnd(result: any) {
    let sourceList = setList(result.source.droppableId);
    let destinationList = setList(result.destination.droppableId);
    // console.log(sourceList[result.source.index]);

    // let nextState = "";
    // switch (result.destination.droppableId) {
    //   case "todoDroppable":
    //     nextState = "todo";
    //     break;
    //   case "doingDroppable":
    //     nextState = "doing";
    //     break;
    //   case "doneDroppable":
    //     nextState = "done";
    //     break;
    //   case "cancelledDroppable":
    //     nextState = "cancel";
    //     break;
    //   default:
    //     nextState = "";
    //     break;
    // }

    // sourceList[result.source.index].task_state = nextState
    updateTaskState(sourceList[result.source.index], result.destination.droppableId, data.board_no);
  }

  function setList(droppableId: string): any {
    let list = [];
    switch (droppableId) {
      case "todoDroppable":
        list = todoList;
        break;
      case "doingDroppable":
        list = doingList;
        break;
      case "doneDroppable":
        list = doneList;
        break;
      case "cancelledDroppable":
        list = cancelledList;
        break;
      default:
        list = [];
        break;
    }
    return list;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          <Droppable droppableId="todoDroppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h1 className="mx-5">Todo</h1>
                {todoList.map((task, index) => (
                  <Draggable
                    key={task.task_no}
                    draggableId={task.task_no}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task key={task.task_no} task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="doingDroppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h1 className="mx-5">Doing</h1>
                {doingList.map((task, index) => (
                  <Draggable
                    key={task.task_no}
                    draggableId={task.task_no}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task key={task.task_no} task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="doneDroppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h1 className="mx-5">Done</h1>
                {doneList.map((task, index) => (
                  <Draggable
                    key={task.task_no}
                    draggableId={task.task_no}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task key={task.task_no} task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="cancelledDroppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h1 className="mx-5">Cancelled</h1>
                {cancelledList.map((task, index) => (
                  <Draggable
                    key={task.task_no}
                    draggableId={task.task_no}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          key={task.task_no}
                          task={task}
                          isCancelled={true}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}
