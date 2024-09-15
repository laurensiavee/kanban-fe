"use client";

import Image from "next/image";
import axios from "axios";
import { API_DEV_URI, ACCESS_TOKEN } from './const/const';
import { useState } from "react";

export default function Home() {

  const [isLoading, setLoading] = useState(true);
  
  if(isLoading) getBoard();

  function getBoard() {
    const uri = API_DEV_URI + `board/`;
    const accessToken = ACCESS_TOKEN

    axios
      .get(uri, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        withCredentials: true, // Add this line for credentials: 'include'
      })    
      .then((res) => {
        const board = res.data
        console.log("board")
        console.log(board)
      })
      .finally(() => {
        setLoading(false)
      });
  }

  return (
    <div> tes
    </div>
  );
}
