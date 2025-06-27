// "use client"

import styles from "./page.module.css";
// import React, {useState} from "react";
import Home from "./home/page";
import { fetchProjects } from "./lib/data";

export default async function Main() {

  const data = await fetchProjects()
  // console.log(data)

  return (
    <div className={styles.page}>
        <Home data = {data}></Home>
    </div>
  );
}
