"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import colors from '@/data/colors';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link, PanelRightClose } from 'lucide-react';
import React, { useContext, useState } from 'react'
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useSidebar } from '../ui/sidebar';


function Hero() {
    const [userInput, setUserInput] = useState();
    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
    const router = useRouter();
    const { toggleSidebar } = useSidebar();

    const onGenerate = async (input) => {
        if (!userDetail?.name) {
            setOpenDialog(true);
            return;
        }
        const msg = {
            role: 'user',
            content: input
        }
        setMessages(msg);
        const workspaceId = await CreateWorkspace({
            user: userDetail._id,
            messages: [msg]
        });
        console.log(workspaceId);
        router.push('/workspace/' + workspaceId);
    }

    return (
        <div className='flex flex-col items-center mt-36 xl:mt-52 gap-2 w-full'>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[100px] bg-[#00FFFF] blur-3xl opacity-40 rounded-full"></div>
            <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
            <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
            <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
                style={{
                    backgroundColor: colors.BACKGROUND
                }}>
                <div className='flex gap-2'>
                    <textarea onChange={(event) => setUserInput(event.target.value)}
                        placeholder={Lookup.INPUT_PLACEHOLDER}
                        className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'
                    />
                    {userDetail && <PanelRightClose onClick={toggleSidebar}
                        className="absolute left-4 top-20 w-[40px] h-[40px] cursor-pointer"  />}
                    {userInput && <ArrowRight
                        onClick={() => onGenerate(userInput)}
                        className='bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer' />}
                </div>
                <div>
                    <Link className='w-5 h-5' />
                </div>
            </div>
            <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-2'>
                {Lookup?.SUGGSTIONS.map((suggestion, index) => (
                    <h2 key={index}
                        onClick={() => onGenerate(suggestion)}
                        className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer'>
                        {suggestion}
                    </h2>
                ))}
            </div>
            <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />
        </div>
    )

}

export default Hero;