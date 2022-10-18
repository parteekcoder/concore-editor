import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import { saveAs } from 'file-saver';
import Modal from './ParentModal';
import './file-edit.css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { actionType as T } from '../../reducer';

const FileEditModal = ({ superState, dispatcher }) => {
    const [codeStuff, setCodeStuff] = useState('');
    const [fileName, setFileName] = useState('');
    const [dirButton, setDirButton] = useState(false);

    useEffect(() => {
        if (navigator.userAgent.indexOf('Edg') !== -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
            setDirButton(true);
        }
    }, []);

    const close = () => dispatcher({ type: T.EDIT_TEXTFILE, payload: { show: false } });
    // TODO - Save file
    async function submit() {
        if (superState.fileHandle) {
            const stream = await superState.fileHandle.createWritable();
            await stream.write(codeStuff);
            await stream.close();
        } else {
            // eslint-disable-next-line no-alert
            alert('Switch to Edge/Chrome!');
        }
        dispatcher({ type: T.EDIT_TEXTFILE, payload: { show: false } });
    }

    async function saveAsSubmit() {
        const handle = await window.showSaveFilePicker();
        const stream = await handle.createWritable();
        await stream.write(codeStuff);
        await stream.close();
        // dispatcher({ type: T.EDIT_TEXTFILE, payload: { show: false } });
    }

    async function saveSubmit() {
        // eslint-disable-next-line no-alert
        const newFileName = prompt('Filename:');
        const bytes = new TextEncoder().encode(codeStuff);
        const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
        saveAs(blob, newFileName);
        // dispatcher({ type: T.EDIT_TEXTFILE, payload: { show: false } });
    }

    useEffect(() => {
        if (superState.fileObj) {
            setFileName(superState.fileObj.name);
            const fr = new FileReader();
            fr.onload = (x) => {
                setCodeStuff(x.target.result);
            };
            fr.readAsText(superState.fileObj);
        }
    }, [superState.fileObj]);

    return (
        <Modal
            ModelOpen={superState.textFileModal}
            closeModal={close}
            title={fileName}
        >
            <div className="File Edit Container">
                <div className="footer">
                    {fileName
                        && (
                            <button type="submit" className="btn btn-primary" onClick={submit}>Save</button>
                        )}
                    {dirButton && (
                        <button type="submit" className="btn btn-primary" onClick={saveAsSubmit}>Save As</button>
                    )}
                    {!dirButton && (
                        <button type="submit" className="btn btn-primary" onClick={saveSubmit}>Save As</button>
                    )}
                </div>
                <div
                    style={{
                        minHeight: '400px',
                    }}
                >
                    <Editor
                        value={codeStuff}
                        onValueChange={(e) => setCodeStuff(e)}
                        highlight={(code) => highlight(code, languages.js)}
                        padding={10}
                        style={{
                            fontFamily: '"Arial"',
                            fontSize: 16,
                            minHeight: '100vh',
                            minWidth: '80vw',
                            border: '1px solid black',
                        }}
                    />
                </div>
                <div className="footer">
                    <button type="submit" className="btn btn-primary" onClick={submit}>Save</button>
                </div>
            </div>
        </Modal>
    );
};

export default FileEditModal;
