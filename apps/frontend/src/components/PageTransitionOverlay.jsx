// src/components/PageTransitionOverlay.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useUIStore from '../store/uiStore';


export default function PageTransitionOverlay() {
    const { isTransitioning } = useUIStore();
    return (
        <AnimatePresence>
        
                <motion.div
                    className="fixed inset-0 z-50 bg-blend-overlay bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <DotLottieReact
                        src="https://lottie.host/d2bab9e2-7a95-4e82-b6d0-a31f5b2b4974/RKP3vAlvZq.lottie"
                        loop
                        autoplay
                    />
                </motion.div>
        </AnimatePresence>
    );
}
