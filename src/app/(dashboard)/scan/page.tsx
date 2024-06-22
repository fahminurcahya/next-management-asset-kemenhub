"use client"

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from '@zxing/library';
import { useZxing } from "react-zxing";
import { ScanAsset } from "./scan-asset";


const ScanPage = () => {
    const [result, setResult] = useState("");
    const { ref } = useZxing({
        onDecodeResult(result) {
            setResult(result.getText());
        },
    });

    useEffect(() => {
        console.log(result)
    }, [result]);

    return <>
        <video ref={ref} />
        <p>
            <span>Last result:</span>
            <span>{result}</span>
        </p>
    </>
};

export default ScanPage;