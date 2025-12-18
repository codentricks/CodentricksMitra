// renderer.js
// document.addEventListener('DOMContentLoaded', () => {
//     const selectFileBtn = document.getElementById('select-file-btn');
//     if (selectFileBtn) {
//         selectFileBtn.addEventListener('click', async () => {
//             // Check if window.fileApi exists before calling
//             if (window.fileApi && typeof window.fileApi.selectFile === 'function') {
//                 const filePath = await window.fileApi.selectFile();
//                 if (filePath) {
//                     document.getElementById('file-path-display').textContent = filePath;
//                     console.log('Selected file path:', filePath);
//                 } else {
//                     document.getElementById('file-path-display').textContent = 'No file selected';
//                 }
//             } else {
//                 console.error('fileApi.selectFile is not available.');
//             }
//         });
//     }
// });
