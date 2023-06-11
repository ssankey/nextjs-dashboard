'use client'
import Header from "./components/Header"
import Layout from "./components/Layout"
import Sidebar from "./components/Sidebar"
import Login from "./components/Login"
import { layouts } from "chart.js"
import { useSession } from "next-auth/react"
export default function Home() {
  const {data:session,status} = useSession();
    if(status =='authenticated'){
      return(
        <Layout/>
      )
    }
  return (
        <Login/>
  )
}
