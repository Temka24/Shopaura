'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { green } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("@/components/map"), { ssr: false, loading: () => <p>Газрын зураг ачааллаж байна...</p>, });

const Contact: React.FC = () => {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post('/api/sendEmail', formData)

            alert(response.data.mes)

            setFormData({ name: '', email: '', message: '' })

        } catch (err) {
            console.log(`Error in axios ${err}`)
        }
    }


    return (
        <>
            <div>
                <div className="w-[100vw] h-[300px] backdrop-blur-sm bg-opacity-[0.10] bg-black rounded-b-[80px] overflow-hidde pt-[100px]">
                    <p className='text-[50px] mt-[35px] ml-[10vw]'>Contact us</p>
                    <Image
                        src="/free_vector.png"
                        height={100}
                        width={200}
                        alt='vector'
                        className='absolute lg:w-[25vw] w-auto right-[18vw] top-[-25px] cu:w-[45vw]'
                    />
                </div>

                <div className='flex lg:flex-row cu:flex-col items-center justify-center gap-[10vw] my-[60px] pb-[100px]'>
                    <div className='flex flex-col items-center justify-center gap-[80px]'>
                        <div className='flex flex-row justify-center gap-[4vw]'>
                            <div className='flex flex-col justify-center gap-[10px]'>
                                <div className='text-[24px] text-center'>Contact Details</div>
                                <div className='flex flex-row justify-center gap-[0.5vw] items-start'>
                                    <PlaceIcon sx={{ color: green[600], fontSize: 45 }} />
                                    <div className='flex flex-col'>
                                        <p className='text-[20px]'>Our Location</p>
                                        <p className='font-normal text-[14px]'>WWP9+5V3, SBD - 11 khoroo,</p>
                                        <p className='font-normal text-[14px]'>Ulaanbaatar 14180</p>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-start gap-[0.5vw] items-start'>
                                    <EmailIcon sx={{ color: green[600], fontSize: 45 }} />
                                    <div className='flex flex-col'>
                                        <p className='text-[20px]'>Our Email</p>
                                        <p className='font-normal text-[14px]'>info@example.com</p>
                                        <p className='font-normal text-[14px]'>support@example.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row justify-center gap-[0.5vw] items-start mt-[45px]'>
                                <CallIcon sx={{ color: green[600], fontSize: 45 }} />
                                <div className='flex flex-col'>
                                    <p className='text-[20px]'>Call Us</p>
                                    <p className='font-normal text-[14px]'>+123 456 7890</p>
                                    <p className='font-normal text-[14px]'>+123 456 7891</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-[10px] px-[3vw] py-[30px] border-none rounded-[20px] shadow-[0_0_10px] shadow-sky-300' >
                            <h4 className='text-[20px] mb-[10px]'>Send Us a Message</h4>
                            <div className='flex flex-col items-center justify-center gap-[15px]'>
                                <TextField
                                    label="Name"
                                    type='text' size='small'
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    value={formData.name}
                                    required
                                    sx={{ '& .MuiFormLabel-asterisk': { display: 'none' }, borderRadius: "20px" }}
                                />
                                <TextField
                                    label='Email'
                                    type='email' size='small'
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    value={formData.email}
                                    required
                                    sx={{ '& .MuiFormLabel-asterisk': { display: 'none' }, borderRadius: "20px" }}
                                />
                                <textarea
                                    cols={5}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    value={formData.message}
                                    className='w-[100%] bg-transparent border-black p-[5px] border rounded-[10px] placeholder:text-gray-800 h-[100px] placeholder:pt-[10px] placeholder:text-center '
                                    required
                                    placeholder='message'
                                />
                                <Button type='submit' variant="contained" endIcon={<SendIcon />} className='bg-violet-500 rounded-[20px]'>
                                    Send
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className='h-[80vw] w-[65vw] lg:h-[50vw] lg:w-[40vw] flex flex-col items-center justify-center rounded-[20px] overflow-hidden'>
                        <Map />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;