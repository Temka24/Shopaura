'use client'
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import toast from "react-hot-toast";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from "next/image";


interface MyProps {
    isOpenLogin: boolean;
    setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



const Signup: React.FC<MyProps> = ({ isOpenLogin, setIsOpenLogin, setIsAuthed }) => {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [isLoading, setIsloading] = useState<boolean>(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsloading(true)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        if (image) {
            formData.append('image', image)
        }


        const response = await axios.post("/api/user/signup", formData)
        const data = response.data
        setIsloading(false)

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0])
            const imageUrl = URL.createObjectURL(e.target.files[0])
            setPreviewImage(imageUrl)
        }
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center gap-[30px] border border-violet-[400] w-[70vw] max-w-[300px] acpect-2/3 p-[20px] m-[auto] mt-[50px] rounded-[20px] shadow-[0_0_10px] shadow-violet-500 mb-[100px]">
                <div className="text-[25px]">Sign up</div>
                {previewImage && (
                    <div className="mt-4">
                        <Image
                            src={previewImage}
                            alt='preview'
                            className='w-[30px] h-[30px] object-cover rounded-[50%]'
                        />
                    </div>
                )}
                <form onSubmit={handleLogin} className="flex flex-col items-center justify-center gap-[20px]">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            borderRadius: '20px',
                            padding: '10px 30px', // py-[10px] ба px-[30px]
                            fontWeight: 'bold',
                            boxShadow: 'none',
                            backgroundColor: '#d946ef',
                            fontSize: '13px',
                        }}
                    >
                        Profile Img
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            required
                            multiple
                        />
                    </Button>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Name" size="small" type="text"
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { display: 'none' } }}
                    />
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email" size="small" type="email"
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { display: 'none' } }}
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        Sign up
                    </Button>
                </form>
                <div className="text-[14px]">Already have a account<span onClick={(): void => setIsOpenLogin(!isOpenLogin)} className="text-fuchsia-700 cursor-pointer"> Log in</span></div>
            </div>
        </>
    )
}

export default Signup;