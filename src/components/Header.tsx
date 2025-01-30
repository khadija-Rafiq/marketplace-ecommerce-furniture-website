// 'use client'
// import React from 'react'
// import { SignInButton, UserButton } from '@clerk/nextjs'
// import { useAuth } from '@clerk/nextjs'


// const Header = () => {
//     const {  isSignedIn } = useAuth();

//   return (
//     <div className='flex justify-between'>
//  {!isSignedIn && (
//   <SignInButton mode="modal">
//   <button className='bg-black text-white py-5 px-5 font-semibold'>Sign In</button>
  
//   </SignInButton>
//   )}
//         <UserButton  afterSignOutUrl ='/'/>
//       </div>
//   )
// }

// export default Header



'use client'
import React from 'react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'

const Header = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="flex justify-between items-center p-4 bg-light_skin">
            {/* Sign In button */}
            {!isSignedIn && (
                <SignInButton mode="modal">
                    <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
                        Sign In
                    </button>
                </SignInButton>
            )}

            {/* User Button */}
            <div className="flex items-center">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}

export default Header;

