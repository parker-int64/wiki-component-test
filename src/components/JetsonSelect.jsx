import React, { useEffect } from "react";
import { Select, ConfigProvider, theme } from "antd";
import { useColorMode } from '@docusaurus/theme-common';
import { useJetsonStore, useThemeStore } from '@site/src/stores/useJetsonStore';


export const ProductSelect = ({ children, options }) => {

    // L4T version and corresponding JetPack SDK version
    const L4T2JPVers = {
        '36.4.3': 'JetPack 6.2 (R36.4.3) 🚀',
        '36.4.0': 'JetPack 6.1 (R36.4.0) ',
        '36.3.0': 'JetPack 6.0 (R36.3.0)',
        '36.2.0': 'JetPack 6.0 DP (R36.2.0)',
        '35.6.1': 'JetPack 5.1.5 (R35.6.1) 🚀',
        '35.6.0': 'JetPack 5.1.4 (R35.6.0)',
        '35.5.0': 'JetPack 5.1.3 (R35.5.0)',
        '35.4.1': 'JetPack 5.1.2 (R35.4.1)',
        '35.3.1': 'JetPack 5.1.1 (R35.3.1)',
        '35.2.1': 'JetPack 5.1.0 (R35.2.1)',
        '32.7.6': 'JetPack 4.6.6 (R32.736)',
    }

    const { product, jetpack, setProduct, setJetPack } = useJetsonStore();
    const selectedProduct = options.find((f) => f.value === product);

    const { colorMode } = useColorMode();
    const setTheme = useThemeStore((state) => state.setTheme);

    const jetpackOptions = Array.from(
        new Set(options.flatMap(p => p.jetpacks))
    ).map(version => ({
        value: version,
        label: L4T2JPVers[version],
    }));

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
                    options={jetpackOptions}
                    value={jetpack}
                    showSearch
                    size='large'
                    placeholder="Select a JetPack"
                    optionFilterProp="label"
                    onChange={(value) => setJetPack(value)}
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