import { Scanner } from "@/components/scanner";
import { useEffect } from "react";

export const ScanAsset = ({
    onResult = () => {
    },
    onError = () => { },
}) => {
    const { ref } = Scanner({ onResult, onError });
    useEffect(() => {
        console.log(ref)
    }, [ref]);
    return <video ref={ref} />;
};