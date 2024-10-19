'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, getProviders } from 'next-auth/react'

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        setProvider();
    }, [])

    return (
        <nav className='flex justify-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flec-center'>
                <Image
                    src='/assets/images/logo.svg'
                    alt='prompotipa logo'
                    width={30}
                    height={30}
                    className='object-contain' />
                <p className='logo_text'>Promptopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-post' className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>

                        <Link href='/profile'>
                            <Image src='/assets/images/logo.svg'
                                alt='profile'
                                width={37}
                                height={37}
                                className='rounded-full' />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'>
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav