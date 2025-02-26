'use client'
import React, { useEffect, useState } from "react";
import Login from "@/components/login";
import Signup from "@/components/signup";
import Dashboard from "@/components/userDashboard";


const Account: React.FC = () => {

    const [isAuthed, setIsAuthed] = useState<boolean>(false)
    const [isOpenLogin, setIsOpenLogin] = useState<boolean>(true)

    useEffect(() => {
        if(localStorage.getItem("token")){
            setIsAuthed(true)
        }
    }, [])

    return (
        <>
            <div>
                {
                    (!isAuthed) ? (
                        isOpenLogin ? (
                            <Login isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin} setIsAuthed={setIsAuthed} />
                        ) : (
                            <Signup isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin} setIsAuthed={setIsAuthed} />
                        )
                    ) : (
                        <Dashboard setIsAuthed={setIsAuthed} />
                    )
                }
            </div>
        </>
    )
}

export default Account;