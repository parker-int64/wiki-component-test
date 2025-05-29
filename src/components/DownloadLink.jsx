import React from 'react';
import { Col, Row } from 'antd';
import { useJetsonStore } from '@site/src/stores/useJetsonStore';

export default function OneDriveLink() {
    const jetpack = useJetsonStore(state => state.jetpack);
    let filename, sha256sum, mainlink, altlink
    switch (jetpack) {
        case 'j4012s':
            filename = 'mfi_recomputer-super-orin-nx-16g-2025-05-28.tar.gz'
            sha256sum = 'BC87FB817DFF031CF3CCBF544916BBB6D8439337E7950FAE5E6AC9BA913E295D'
            break;
        case 'j4011s':
            filename = 'mfi_recomputer-super-orin-nx-8g-2025-05-28.tar.gz'
            sha256sum = 'D999842E6553AFEF756B22E370EBC09CA45DE1BE3B8C0148D69B3B85C584AF82'
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 20,
        }}>
            <Row>
                <Col span={3}><p style={{ userSelect: 'none', fontWeight: 'bold' }}>Link</p></Col>
                <Col span={4}><a href={`/`}>OneDrive1</a></Col>
                <Col span={4}><a href={`/`}>OneDrive2</a></Col>
            </Row>

            <Row>
                <Col span={3}><p style={{ userSelect: 'none', fontWeight: 'bold' }}>File</p></Col>
                <Col><span>{filename}</span></Col>
            </Row>
            <Row>
                <Col span={3}><p style={{ userSelect: 'none', fontWeight: 'bold' }}>SHA256</p></Col>
                <Col><span>{sha256sum}</span></Col>
            </Row>
        </div>

    );
}