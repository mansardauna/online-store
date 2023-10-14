import React, { useState } from 'react';
import JSZip from 'jszip';

const DownloadButton:React.FC = () => {
  const [message, setMessage] = useState('');

  // Function to handle the download button click event
  const handleDownload = async () => {
    const zip = new JSZip();
    const files = [
      { name: 'book.pdf', content: 'This is the content of the book.' },
      { name: 'software.exe', content: 'This is the software file.' },
      { name: 'video.mp4', content: 'This is the video file.' },
    ];

    // Add files to the ZIP
    files.forEach((file) => {
      zip.file(file.name, file.content);
    });

    // Generate the ZIP file
    const content = await zip.generateAsync({ type: 'blob' });

    // Create a download link
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'files.zip';
    a.style.display = 'none';

    // Trigger the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setMessage('Files are downloading...');
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Files</button>
      <p>{message}</p>
    </div>
  );
};

export default DownloadButton;
