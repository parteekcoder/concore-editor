import React, { useState } from 'react';
import axios from 'axios';
import Modal from './ParentModal';
import { actionType as T } from '../../reducer';
import './contributeDetails.css';

const ContributeDetails = ({ superState, dispatcher }) => {
    const closeModal = () => {
        dispatcher({ type: T.SET_CONTRIBUTE_MODAL, payload: false });
    };
    const [study, setStudy] = useState('');
    const [path, setPath] = useState('');
    const [auth, setAuth] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [branch, setBranch] = useState('');
    const submit = async (e) => {
        try {
            e.preventDefault();
            const result = await axios.post(`http://127.0.0.1:5000/contribute?study=${study}&auth=${auth}&desc=${desc}&title=${title}&path=${path}&branch=${branch}`);
            console.log(result.data);
            // eslint-disable-next-line
            alert("Still in Development");
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal
            ModelOpen={superState.contributeModal}
            title="Contribute"
            closeModal={closeModal}
        >
            <form className="contribute-details">
                <span>Study Name</span>
                <input
                    required
                    value={study}
                    onChange={(e) => setStudy(e.target.value)}
                />
                <span>Study Path</span>
                <input
                    placeholder="Enter Full Directory Path of Study"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    required
                />
                <span>Author Name</span>
                <input
                    value={auth}
                    onChange={(e) => setAuth(e.target.value)}
                    required
                />
                <span>Branch Name</span>
                <input
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                />
                <span>PR Title</span>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <span>PR Description</span>
                <input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
                <div className="expand">
                    <button type="submit" className="btn btn-primary" onClick={submit}>Generate PR</button>
                </div>
            </form>
        </Modal>
    );
};
export default ContributeDetails;
