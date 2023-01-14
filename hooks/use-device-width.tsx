import { useState, useEffect } from 'react'


const UseDeviceWidth = () => {
    const [windowWidth, setWindowWidth] = useState(850);
    useEffect(() => {
        const getWindowWidth = () => {
            const { innerWidth: width, innerHeight: height } = window;
            return { width, height };
        }
        const handleResize = () => {
            // @ts-ignore
            setWindowWidth(getWindowWidth());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return windowWidth;
}

export default UseDeviceWidth