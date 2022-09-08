/* eslint-disable object-shorthand */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react/state-in-constructor */
import React, { useEffect, useState } from 'react';
import FileBrowser, { Icons } from 'react-keyed-file-browser';
import Moment from 'moment';
import '../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';
import { readFile, readTextFile } from '../toolbarActions/toolbarFunctions';
import { actionType as T } from '../reducer';

const LocalFileBrowser = ({ superState, dispatcher }) => {
    const fileRef = React.useRef();

    useEffect(() => {
        dispatcher({ type: T.SET_FILE_REF, payload: fileRef });
    }, []);

    const [fileState, setFileState] = useState({
        files: [
            // {
            //     key: '/home/emory/Desktop/github',
            //     modified: +Moment().subtract(1, 'hours'),
            //     size: 1.5 * 1024 * 1024,
            // },
            // {
            //     key: '/concore/demo/sample2.graphml',
            //     modified: +Moment().subtract(3, 'days'),
            //     size: 545 * 1024,
            // },
        ],
    });

    // TODO
    useEffect(() => {
        // if(window.localStorage.getItem('fileList')) {
        //     const allFiles = window.localStorage.getItem('fileList');
        //     setFileState({ files: allFiles });
        // }
        window.localStorage.setItem('fileList', JSON.stringify(fileState));
    }, [fileState]);

    // const handleCreateFolder = (key) => {
    //     setFileState((state) => {
    //         state.files = state.files.concat([{
    //             key: key,
    //         }]);
    //         console.log(fileState);
    //         return state;
    //     });
    // };

    // TODO
    // const handleCreateFiles = (files, prefix) => {
    //     setFileState((state) => {
    //         const newFiles = files.map((file) => {
    //             let newKey = prefix;
    //             if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
    //                 newKey += '/';
    //             }
    //             newKey += file.name;
    //             return {
    //                 key: newKey,
    //                 size: file.size,
    //                 modified: +Moment(),
    //             };
    //         });

    //         const uniqueNewFiles = [];
    //         newFiles.map((newFile) => {
    //             let exists = false;
    //             state.files.map((existingFile) => {
    //                 if (existingFile.key === newFile.key) {
    //                     exists = true;
    //                 }
    //             });
    //             if (!exists) {
    //                 uniqueNewFiles.push(newFile);
    //             }
    //         });
    //         state.files = state.files.concat(uniqueNewFiles);
    //         return state;
    //     });
    // };

    const handleSelectFile = (data) => {
        if (data.fileObj.name.split('.').pop() === 'graphml') readFile(superState, dispatcher, data.fileObj);
        else {
            readTextFile(superState, dispatcher, data.fileObj);
        }
    };

    return (
        <div>
            <input
                type="file"
                ref={fileRef}
                onClick={(e) => { e.target.value = null; }}
                onChange={(e) => {
                    setFileState((state) => {
                        for (let i = 0; i < e.target.files.length; i += 1) {
                            state.files = state.files.concat([{
                                key: e.target.files[i].name,
                                lastModified: +Moment(),
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
            <FileBrowser
                files={fileState.files}
                icons={Icons.FontAwesome(4)}
                onSelectFile={handleSelectFile}
                detailRenderer={() => null}
                // TODO
                // onCreateFolder={handleCreateFolder}
                // onCreateFiles={handleCreateFiles}
            />
        </div>
    );
};
export default LocalFileBrowser;
