
import Image from 'next/image'
import React from 'react'

const NotFoundPage = () => {
    return (
        <div className="h-screen pt-40 flex flex-col items-center gap-14">
            <div>Page not found. sorry.....</div>
            <Image src="/images/dtmdh6nbxsx81.png" alt="cat crying image" className="object-cover " width={500} height={500} />
        </div>

    )
}

export default NotFoundPage