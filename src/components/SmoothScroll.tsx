import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/scroll";

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    useEffect(() => {
        scrollToTop();
    }, [location.pathname]);

    return <>{children}</>;
};
