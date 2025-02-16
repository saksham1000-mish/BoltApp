"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { api } from '@/convex/_generated/api';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import colors from '@/data/colors';
import Image from 'next/image';
import { ArrowRight, Link, LoaderPinwheelIcon } from 'lucide-react';
import Lookup from '@/data/Lookup';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import ReactMarkdown from'react-markdown';
import { useSidebar } from '../ui/sidebar';

function ChatView(){
    const{id}=useParams();
    const convex=useConvex();
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const {messages,setMessages}=useContext(MessagesContext);
    const [userInput,setUserInput]=useState()
    const [loading, setLoading]=useState(false);
    const UpdateMessages=useMutation(api.workspace.UpdateMessages)
    const {toggleSidebar}=useSidebar();

    useEffect(()=>{
        id&&GetWorkspaceData();
    },[id]);


    const GetWorkspaceData=async()=>{
        const result=await convex.query(api.workspace.GetWorkspace,{
            workspaceId:id
        });
        setMessages(result?.messages)
        console.log(result);
    }

    useEffect(()=>{
        if(messages?.length>0){
            const role=messages[messages?.length-1]?.role;
            if(role=='user'){
                GetAiResponse();
            }
        }
    },[messages])

    const GetAiResponse=async()=>{
        setLoading(true);
        const PROMPT=JSON.stringify(messages)+Prompt.CHAT_PROMPT;
        const result=await axios.post('/api/ai-chat',{
            prompt:PROMPT
        });
        console.log(result.data.result);
        const aiResp={
            role:'ai',
            content:result.data.result
        }
        setMessages(prev=>[...prev,aiResp])

        await UpdateMessages({
            messages:[...messages,aiResp],
            workspaceId:id
        })
        setLoading(false);
    }
    const onGenerate=async(input)=>{
        setMessages(prev=>[...prev,{
            role:'user',
            content:input
        }]);
        setUserInput('');
    }

    return(
        <div className='relative h-[85vh] flex flex-col'>
            <div className='flex-1 overflow-y-scroll scrollbar-hide pl-5 '>
                {messages?.map((msg,index)=>(
                    <div key={index} 
                    className='p-3 rounded-lg mb-2 flex gap-2 items-center leading-7'
                    style={
                        {backgroundColor:colors.CHAT_BACKGROUND}
                    }>
                        {msg?.role=='user'&&
                        <Image src={userDetail?.picture} alt='userImage'
                        width={35} height={35} className='rounded-full'/>}
                        <ReactMarkdown className='flex flex-col'>{msg.content}</ReactMarkdown>
                        
                    </div>
                ))}
                {loading&& 
                <div className='p-3 rounded-lg mb-2 flex gap-2 items-center'
                style={{
                    backgroundColor:colors.CHAT_BACKGROUND
                }}>
                            <LoaderPinwheelIcon className='animate-spin'/>
                            <h2>Generating response...</h2>
                        </div>}
            </div>
            {/* Add chat input */}
            <div className='flex gap-2 items-end'>
               {userDetail&& <Image src={userDetail?.picture}
               className='rounded-full cursor-pointer'
               onClick={toggleSidebar} 
               alt='userImage' width={30} height={30}/>}
            
            <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
                style={{
                    backgroundColor:colors.BACKGROUND
                }}>
                <div className='flex gap-2'>
                    <textarea onChange={(event) =>setUserInput(event.target.value)}
                    value={userInput}
                     placeholder={Lookup.INPUT_PLACEHOLDER} 
                     className='outline-none bg-transparent w-full h-32 max-h-56 resize-none' 
                     />
                    
                    {userInput&&<ArrowRight 
                    onClick={()=>onGenerate(userInput)}
                    className='bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer' />}
                </div>
                <div>
                    <Link className='w-5 h-5'/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ChatView;