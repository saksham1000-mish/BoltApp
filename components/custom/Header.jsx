import Image from 'next/image';
import React, { useContext } from 'react'
import { Button } from '../ui/button';
import colors from '@/data/colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LucideDownload, Rocket } from 'lucide-react';
import { ActionContext } from '@/context/ActionContext';

function Header(){
    const {userDetail, setUserDetail}=useContext(UserDetailContext);
    // const {toggleSideBar}=useSidebar();
    const {action, setAction} = useContext(ActionContext);
    const path=usePathname();
    console.log(path?.includes('workspace'))

    const onActionBtn=(action)=>{
        setAction({
            actionType:action,
            timeStamp:Date.now()
        })
    }
    
    return(
        <div className='p-4 flex justify-between items-center border-b'>
            <Link href={'/'}>
            <Image src={'/logo.svg'} alt="Logo" width={150} height={150} />
            </Link>
            {!userDetail?.name ? <div className='flex gap-5'>
                <Button variant='ghost'>Sign in</Button>
                <Button className='text-white' style={{
                    backgroundColor: colors.BLUE
                }}>Get Started</Button>
            </div>:
            path?.includes('workspace')&&<div className='flex gap-2 items-center'>
                <Button variant='ghost' onClick={()=>onActionBtn('export')}><LucideDownload/>Export</Button>
                <Button className='bg-blue-500 text-white hover:bg-blue-600'
                onClick={()=>onActionBtn('deploy')}><Rocket/>Deploy</Button>
                {userDetail&&<Image src={userDetail?.picture} alt='user' width={30} height={30}
                className='rounded-full w-[30px]'
                // onClick={toggleSideBar}
                />}
                </div>
            }
        </div>
    )

}

export default Header;