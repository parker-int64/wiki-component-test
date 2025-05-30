/**
 * FlashCodeBlock.tsx
 * ------------------
 * This file contains reusable React components that display flashing-related
 * shell commands for Jetson devices, such as verifying SHA256, extracting tarballs,
 * and executing the flash script.
 *
 * The components rely on Zustand state (via `useJetsonStore`) to retrieve
 * the selected filename and foldername values dynamically.
 *
 * Components:
 *  - VerifySHA256: Displays a SHA256 checksum verification command
 *  - ExtractFile: Displays the tar extraction command
 *  - FlashCMD: Displays a sequence of flashing commands
 *
 * Dependencies:
 *  - Zustand (useJetsonStore)
 *  - @theme/CodeBlock (Docusaurus code block component)
 */
import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import { useJetsonStore } from '@site/src/stores/useJetsonStore';


/**
 * VerifySHA256
 * ------------
 * A component that displays a terminal command to verify the SHA256 hash
 * of the selected file.
 *
 * The file name is obtained from Zustand state via `useJetsonStore`.
 *
 * @returns {JSX.Element} A bash command block to verify file hash.
 */
export const VerifySHA256 = () => {
    const filename = useJetsonStore(state => state.filename);
    return (
        <CodeBlock language="bash">
            sha256sum {filename}
        </CodeBlock>
    );
}

/**
 * ExtractFile
 * -----------
 * A component that shows the bash command to extract a `.tar` archive file.
 *
 * The folder name (archive file name) is retrieved from the Zustand store.
 *
 * @returns {JSX.Element} A bash command block to extract the tarball.
 */
export const ExtractFile = () => {
    const foldername = useJetsonStore(state => state.foldername);
    return (
        <CodeBlock language="bash">
            sudo tar xvpf {foldername}
        </CodeBlock>
    );
}

/**
 * FlashCMD
 * --------
 * A component that shows a series of terminal commands to perform Jetson board flashing
 * using NVIDIA's `l4t_initrd_flash.sh` script.
 *
 * The working directory is determined by the `foldername` from the Zustand store.
 *
 * @returns {JSX.Element} Two bash command blocks for changing directory and executing the flash script.
 */
export const FlashCMD = () => {
    const foldername = useJetsonStore(state => state.foldername);
    return (
        <>
            <CodeBlock language="bash">
                cd {foldername}
            </CodeBlock>
            <CodeBlock language="bash">
                sudo ./tools/kernel_flash/l4t_initrd_flash.sh --flash-only --massflash 1 --network usb0  --showlogs
            </CodeBlock>
        </>
    );
}