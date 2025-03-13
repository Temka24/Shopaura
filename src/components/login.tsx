'use client'
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast from "react-hot-toast";
import axios from "axios";

interface MyProps {
    isOpenLogin: boolean;
    setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
}

const Login: React.FC<MyProps> = ({ isOpenLogin, setIsOpenLogin, setIsAuthed }) => {

    const [formData, setFormData] = useState<{ email: string; password: string; }>({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true)
        const response = await axios.post("/api/user/login", formData)
        const data = response.data
        setIsLoading(false)

        if (data.status) {
            localStorage.setItem("token", data.token)
            localStorage.setItem("userData", JSON.stringify(data.user))
            setIsAuthed(true)

            toast.success(data.msg)
        }
        else if (!data.status) {
            toast.error(data.msg)
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-[30px] border border-violet-[400] w-[70vw] max-w-[300px] acpect-2/3 p-[20px] m-[auto] mt-[50px] rounded-[20px] shadow-[0_0_10px] shadow-violet-500 mb-[100px]">
                <div className="text-[25px]">Log in</div>
                <form onSubmit={handleLogin} className="flex flex-col items-center justify-center gap-[20px]">
                    <TextField
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        label="Email" size="small" type="email"
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { display: 'none' } }}
                    />
                    <TextField
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        label="Password" size="small" type="password"
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { display: 'none' } }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            borderRadius: '20px',
                            padding: '10px 30px', // py-[10px] ба px-[30px]
                            fontWeight: 'bold',
                            boxShadow: 'none',
                            backgroundColor: '#d946ef',
                            fontSize: '13px',
                        }}
                        loading={isLoading}
                    >
                        Login
                    </Button>
                </form>
                <div>Don&apos;t have account <span onClick={(): void => setIsOpenLogin(!isOpenLogin)} className="text-fuchsia-700 cursor-pointer">Sign up</span></div>
            </div>
        </>
    )
}

export default Login;