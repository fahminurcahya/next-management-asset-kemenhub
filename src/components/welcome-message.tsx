import React from 'react'
import Forbidden from './forbidden';
import { auth } from '@/auth';

export default async function WelcomeMsg() {

    const session = await auth();

    return (
        <div>
            <h2 className='text-2xl lg:text-4xl text-white font-medium'>
                Hallo, {session?.user.name} 👋🏻
            </h2>
            <p className='text-sm lg:text-base text-[#89b5fd]'>
                This is your asset management
            </p>
        </div>
    )
}
