import React, { useState, useEffect } from 'react';
import Modal from './ParentModal';
import './file-edit.css';
import CodeEdit from '../CodeEdit';
import { actionType as T } from '../../reducer';

const FileEditModal = ({ superState, dispatcher }) => {
    const [codeStuff, setCodeStuff] = useState('');
    const close = () => dispatcher({ type: T.EDIT_TEXTFILE, payload: { show: false } });
    const submit = () => {
        // superState.curGraphInstance.setEdgeNodeValidator({
        //     nodeValidator: `(node, nodes, edges, type)=>{${nodeValidator}}`,
        //     edgeValidator: `(edge, nodes, edges, type)=>{${edgeValidator}}`,
        // });
        dispatcher({ type: T.EDIT_TEXTFILE, payload: { show: false } });
        console.log(superState);
    };

    useEffect(() => {
        if (superState.fileObj) {
            setCodeStuff(superState.fileObj);
        }
    }, [superState.fileObj]);

    return (
        <Modal
            ModelOpen={superState.textFileModal}
            closeModal={close}
            title=""
        >
            <div className="File Edit Container">
                <div>
                    <CodeEdit
                        pre=""
                        post=""
                        value={codeStuff}
                        onChange={(e) => setCodeStuff(e.target.value)}
                        height={350}
                        width={300}
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
