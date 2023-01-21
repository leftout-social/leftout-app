import { useEffect, useRef, useState } from 'react';
import type { LottiePlayer } from 'lottie-web';

interface LottieAnimationProps {
    animationJson: string; //path to json file
    height?: string | number;
    width?: string | number;
    color?: string;
}

export const LottieAnimation = ({animationJson, height = 200, width = 200, color = '#5252C7'}: LottieAnimationProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [lottie, setLottie] = useState<LottiePlayer | null>(null);

    useEffect(() => {
        import('lottie-web').then((Lottie) => setLottie(Lottie.default));
    }, []);
    const loaderStyles = {
        height,
        width,
        color,
    }
    useEffect(() => {
        if (lottie && ref.current) {
            const animation = lottie.loadAnimation({
                container: ref.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                // path to your animation file, place it inside public folder
                path: animationJson,

            });

            return () => animation.destroy();
        }
    }, [lottie]);

    return (
        <div ref={ref} style={loaderStyles}/>
    );
};