/* eslint-disable object-shorthand */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react/state-in-constructor */
import React, { useEffect, useState } from 'react';
import FileBrowser, { FileRenderers, FolderRenderers } from 'react-keyed-file-browser';
import { readFile, readTextFile } from '../toolbarActions/toolbarFunctions';
import { actionType as T } from '../reducer';
import './fileBrowser.css';

const LocalFileBrowser = ({ superState, dispatcher }) => {
    const fileRef = React.useRef();
    const [dirButton, setDirButton] = useState(false);

    useEffect(() => {
        if (navigator.userAgent.indexOf('Edg') !== -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
            setDirButton(true);
        }
        dispatcher({ type: T.SET_FILE_REF, payload: fileRef });
    }, []);

    const [fileState, setFileState] = useState([]);
    // const [fileState, setFileState] = useState(() => {
    //     let files = [];
    //     files = [];
    //     // if (window.localStorage.getItem('fileList')) {
    //     //     files = JSON.parse(window.localStorage.getItem('fileList'));
    //     //     console.log(files);
    //     //     return files;
    //     // }
    //     return { files };
    // });

    // TODO
    useEffect(() => {
        // if(window.localStorage.getItem('fileList')) {
        //     const allFiles = window.localStorage.getItem('fileList');
        //     setFileState({ files: allFiles });
        // }
        window.localStorage.setItem('fileList', JSON.stringify(fileState));
    }, [fileState]);

    const handleSelectFile = (data) => {
        // eslint-disable-next-line max-len
        if (data.fileObj.name.split('.').pop() === 'graphml') readFile(superState, dispatcher, data.fileObj, data.fileHandle);
        else {
            readTextFile(superState, dispatcher, data.fileObj, data.fileHandle);
        }
    };

    const handleFileInDirs = async (topKey, value) => {
        let state = [];
        // eslint-disable-next-line no-restricted-syntax
        for await (const [key, valueSubDir] of value.entries()) {
            if (valueSubDir.kind === 'file') {
                const fileData = await valueSubDir.getFile();
                state = state.concat([{
                    key: `${topKey}/${value.name}/${key}`,
                    modified: fileData.lastModified,
                    size: fileData.size,
                    fileObj: fileData,
                    fileHandle: value,
                }]);
            } else if (valueSubDir.kind === 'directory') {
                const res = await handleFileInDirs();
                state = state.concat(res);
            }
        }
        return state;
    };

    const newFeature = async () => {
        const dirHandle = await window.showDirectoryPicker();
        let state = [];
        // eslint-disable-next-line no-restricted-syntax
        for await (const [key, value] of dirHandle.entries()) {
            if (value.kind === 'file') {
                const fileData = await value.getFile();
                state = state.concat([{
                    key: `${dirHandle.name}/${key}`,
                    modified: fileData.lastModified,
                    size: fileData.size,
                    fileObj: fileData,
                    fileHandle: value,
                }]);
            } else if (value.kind === 'directory') {
                const res = await handleFileInDirs(dirHandle.name, value);
                state = state.concat(res);
            }
        }
        setFileState([]);
        setFileState(state);
    };

    return (
        <div>
            {!dirButton && (
                <label
                    className="inputButton"
                    htmlFor="fileButton"
                >
                    Upload Directory
                    <input
                        type="file"
                        accept=".py, .m, .c, .cpp, .v, .sh"
                        ref={fileRef}
                        id="fileButton"
                        style={{ display: 'none' }}
                        onClick={(e) => { e.target.value = null; }}
                        onChange={(e) => {
                            setFileState([]);
                            setFileState((state) => {
                                for (let i = 0; i < e.target.files.length; i += 1) {
                                    state = state.concat([{
                                        key: e.target.files[i].webkitRelativePath,
                                        modified: e.target.files[i].lastModified,
                                        size: e.target.files[i].size,
                                        fileObj: e.target.files[i],
                                    }]);
                                }
                                return state;
                            });
                            window.localStorage.setItem('fileList', JSON.stringify(fileState));
                        }}
                        directory
                        webkitdirectory="true"
                    />
                </label>
            ) }
            {dirButton && (
                <button
                    type="button"
                    className="inputButton"
                    disabled={!dirButton}
                    onClick={newFeature}
                >
                    Upload Directory
                </button>
            )}
            <h4>
                Folder Name :
                {' '}
                {fileState[0] ? fileState[0].key.split('/')[0] : '' }
            </h4>
            <FileBrowser
                files={fileState}
                onSelectFile={handleSelectFile}
                detailRenderer={() => null}
                fileRenderer={FileRenderers.TableFile}
                folderRenderer={FolderRenderers.TableFolder}
            />
        </div>
    );
};
export default LocalFileBrowser;
