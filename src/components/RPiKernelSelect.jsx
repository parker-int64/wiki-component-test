import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';

export const KernelSelect = () => {
  const kernelInfo = [
    { value: 'rpi-6.12.y', label: '6.12.x' },
    { value: 'rpi-6.11.y', label: '6.11.x' },
    { value: 'rpi-6.10.y', label: '6.10.x' },
    { value: 'rpi-6.9.y', label: '6.9.x' },
    { value: 'rpi-6.8.y', label: '6.8.x' },
    { value: 'rpi-6.7.y', label: '6.7.x' },
    { value: 'rpi-6.6.y', label: '6.6.x' },
  ];

  const [selectedKernel, setSelectedKernel] = useState('rpi-6.12.y');

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <select
        id="kernel-select"
        value={selectedKernel}
        onChange={(e) => setSelectedKernel(e.target.value)}
        style={{ marginTop: '0.5rem', padding: '0.5rem', fontSize: '1rem' }}
      >
        {kernelInfo.map((kernel) => (
          <option key={kernel.value} value={kernel.value}>
            {kernel.label}
          </option>
        ))}
      </select>

      <div style={{ marginTop: '1.5rem' }}>
        <CodeBlock language="bash">
          {`git clone -b ${selectedKernel} --depth=1 https://github.com/raspberrypi/linux.git`}
        </CodeBlock>
      </div>
    </div>
  );
};