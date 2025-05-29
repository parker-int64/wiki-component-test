import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import { useJetsonStore } from '@site/src/stores/useJetsonStore';


export function VerifySHA256() {
    const product = useJetsonStore(state => state.product);
    return (
        <CodeBlock language="bash">
            sha256sum {product}
        </CodeBlock>
    );
}

export function ExtractFile() {
    const product = useJetsonStore(state => state.product);
    return (
        <CodeBlock language="bash">
            sudo tar xvpf {product}
        </CodeBlock>
    );
}

export function FlashCMD() {
    const product = useJetsonStore(state => state.product);
    return (
        <>
            <CodeBlock language="bash">
                cd mfi_{product}
            </CodeBlock>
            <CodeBlock language="bash">
                sudo ./tools/kernel_flash/l4t_initrd_flash.sh --flash-only --massflash 1 --network usb0  --showlogs
            </CodeBlock>
        </>
    );
}