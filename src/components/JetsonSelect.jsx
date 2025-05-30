/**
 * JetsonSelect.jsx
 * ----------------
 * This component provides product and Jetson Linux version (L4T) selection UI
 * using Ant Design Select components. It dynamically updates L4T options based
 * on the selected product.
 *
 * The selection is stored in Zustand store (useJetsonStore) and the component also
 * reacts to the site's dark/light mode via Docusaurus' useColorMode.
 *
 * Dependencies:
 *  - Zustand (useJetsonStore, useThemeStore)
 *  - Docusaurus (useColorMode)
 *  - Ant Design (Select, ConfigProvider)
 * 
 * Props:
 *  - options: Array of products, each with an associated list of L4T versions
 *  - children: Optional custom JSX content for each Select
 */
import React, { useEffect } from "react";
import { Select, ConfigProvider, theme } from "antd";
import { useColorMode } from '@docusaurus/theme-common';
import { useJetsonStore, useThemeStore } from '@site/src/stores/useJetsonStore';


export const ProductSelect = ({ children, options }) => {

    // L4T version and corresponding JetPack SDK version
    const L4T2JPVers = {
        '36.4.3': 'R36.4.3 (JetPack 6.2🚀)',
        '36.4.0': 'R36.4.0 (JetPack 6.1)',
        '36.3.0': 'R36.3.0 (JetPack 6.0)',
        '36.2.0': 'R36.2.0 (JetPack 6.0 DP)',
        '35.6.1': 'R35.6.1 (JetPack 5.1.5) 🚀',
        '35.6.0': 'R35.6.0 (JetPack 5.1.4)',
        '35.5.0': 'R35.5.0 (JetPack 5.1.3)',
        '35.4.1': 'R35.4.1 (JetPack 5.1.2)',
        '35.3.1': 'R35.3.1 (JetPack 5.1.1)',
        '35.2.1': 'R35.2.1 (JetPack 5.1.0)',
        '32.7.6': 'R32.736 (JetPack 4.6.6)',
    }

    // Access Zustand store state and setters
    const { product, l4t, setProduct, setL4T } = useJetsonStore();

    // Find the selected product object from the options list
    const selectedProduct = options.find((p) => p.value === product);

    // Docusaurus color mode (dark/light)
    const { colorMode } = useColorMode();
    const setTheme = useThemeStore((state) => state.setTheme);

    // Generate L4T version options from the selected product
    const l4tOptions = (selectedProduct?.l4t || []).map(version => ({
        value: version,
        label: L4T2JPVers[version],
    }));

    // Sync the Zustand theme state with Docusaurus color mode
    useEffect(() => {
        setTheme(colorMode === 'dark' ? 'dark' : 'light');
    }, [colorMode]);

    const currentTheme = useThemeStore((state) => state.theme);


    return (
        <ConfigProvider
            theme={{
                algorithm:
                    currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                gap: 16,
            }}>
                <Select
                    options={options}
                    value={selectedProduct}
                    showSearch
                    size='large'
                    placeholder="Select a Product"
                    optionFilterProp="label"
                    onChange={(value) => setProduct(value)}
                    style={{
                        width: '100%',
                        maxWidth: 300,
                    }}>
                    {children}
                </Select>
                <Select
                    options={l4tOptions}
                    value={l4t}
                    showSearch
                    size='large'
                    placeholder="Select Jetson Linux"
                    optionFilterProp="label"
                    onChange={(value) => setL4T(value)}
                    style={{
                        width: '100%',
                        maxWidth: 300,
                    }}>
                    {children}
                </Select>
            </div>
        </ConfigProvider>

    )
}