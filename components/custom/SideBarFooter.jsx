import { HelpCircle, LogOutIcon, Settings2, Wallet2Icon } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { googleLogout } from '@react-oauth/google';


function SideBarFooter() {
    const router=useRouter();

    const handleLogout = () => {
        googleLogout(); // Clears Google OAuth session
        console.log("User logged out"); 
        router.push('/'); // Redirect to home or login page
    };

    const options=[
        {
            name:'Settings',
            icon:Settings2
        },
        {
            name:'Help Centre',
            icon:HelpCircle
        },
        {
            name:'Upgrade',
            icon:Wallet2Icon,
            path:'/pricing'
        },
        {
            name:'Sign Out',
            icon:LogOutIcon,
            action:handleLogout
        }
    ]
    const onOptionClick = (option) => {
        if (option.action) {
            option.action(); // Call logout function
        } else if (option.path) {
            router.push(option.path);
        }
    };

    return (
        <div className='p-2 mb-10'>
            {options.map((option,index)=>(
                <Button variant="ghost" 
                onClick={()=>onOptionClick(option)} 
                className='w-full flex justify-start my-3' key={index}>
                    <option.icon size={20} className='mr-2'/>
                    {option.name}
                </Button>
            ))}
            
        </div>
    )
}

export default SideBarFooter;