import React, { useState, useEffect } from 'react';
import Modal from './ParentModal';
import './file-edit.css';
import CodeEdit from '../CodeEdit';
import { actionType as T } from '../../reducer';

const FileEditModal = ({ superState, dispatcher }) => {
    const [codeStuff, setCodeStuff] = useState('');
    const [fileName, setFileName] = useState('');
    const close = () => dispatcher({ type: T.EDIT_TEXTFILE, payload: { show: false } });
    // TODO - Save file
    async function submit() {
        // eslint-disable-next-line prefer-const
        // let fileHandle = superState.fileObj;
        // console.log(fileHandle);
        // const stream = await fileHandle.createWriter();
        // await stream.write(codeStuff);
        // await stream.close();
        dispatcher({ type: T.EDIT_TEXTFILE, payload: { show: false } });
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
                <div>
                    <CodeEdit
                        pre=""
                        post=""
                        value={codeStuff}
                        onChange={(e) => setCodeStuff(e.target.value)}
                        height={350}
                        docString=""
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
