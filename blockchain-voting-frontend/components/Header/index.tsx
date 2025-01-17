'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';
import Link from 'next/link';

const Header: React.FC = () => {
    const { isConnected, isAdmin } = useSnapshot(UserStore.state);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Handle outside click to close dropdowns
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown((current) =>
            current === dropdown ? null : dropdown
        );
    };

    return (
        <header className='bg-gray-900 text-white shadow-lg'>
            <nav className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
                {/* Branding */}
                <Link href='/' className='text-2xl font-bold'>
                    Blockchain Voting
                </Link>
                <div className='flex items-center space-x-6' ref={dropdownRef}>
                    {/* Elections Link */}
                    <Link
                        href='/elections'
                        className='hover:underline text-white'
                    >
                        Elections
                    </Link>

                    {/* Admin Dropdown */}
                    {isAdmin && (
                        <div className='relative'>
                            <button
                                className='hover:underline'
                                onClick={() => toggleDropdown('admin')}
                            >
                                Admin
                            </button>
                            {activeDropdown === 'admin' && (
                                <div className='absolute bg-white text-gray-900 mt-2 shadow-lg rounded-lg p-3 w-48 z-50 right-0'>
                                    <Link
                                        href='/create-election'
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        Create Election
                                    </Link>
                                    <Link
                                        href='/end-election'
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        End Election
                                    </Link>
                                    <Link
                                        href='/register-voter'
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        Register Voter
                                    </Link>
                                    <Link
                                        href='/register-voters'
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        Register Multiple Voters
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Login/Logout */}
                    {!isConnected ? (
                        <Link
                            href='/login'
                            className='text-white hover:underline'
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={() => UserStore.reset()}
                            className='text-white hover:underline'
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
