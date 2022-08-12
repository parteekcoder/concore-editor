/* eslint-disable object-shorthand */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react/state-in-constructor */
import React, { useEffect, useState } from 'react';
import FileBrowser, { Icons } from 'react-keyed-file-browser';
import Moment from 'moment';
import '../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';
import { readFile } from '../toolbarActions/toolbarFunctions';
import { actionType as T } from '../reducer';

const LocalFileBrowser = ({ superState, dispatcher }) => {
    const fileRef = React.useRef();

    useEffect(() => {
        dispatcher({ type: T.SET_FILE_REF, payload: fileRef });
    }, []);

    const [fileState, setFileState] = useState({
        files: [
        ],
    });

    // TODO
    const handleCreateFolder = (key) => {
        setFileState((state) => {
            state.files = state.files.concat([{
                key: key,
            }]);
            console.log(fileState);
            return state;
        });
    };

    // TODO
    const handleCreateFiles = (files, prefix) => {
        setFileState((state) => {
            const newFiles = files.map((file) => {
                let newKey = prefix;
                if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
                    newKey += '/';
                }
                newKey += file.name;
                return {
                    key: newKey,
                    size: file.size,
                    modified: +Moment(),
                };
            });

            const uniqueNewFiles = [];
            newFiles.map((newFile) => {
                let exists = false;
                state.files.map((existingFile) => {
                    if (existingFile.key === newFile.key) {
                        exists = true;
                    }
                });
                if (!exists) {
                    uniqueNewFiles.push(newFile);
                }
            });
            state.files = state.files.concat(uniqueNewFiles);
            return state;
        });
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
                                lastModified: Moment(Date(e.target.files[i].lastModified)),
                                size: e.target.files[i].size,
                            }]);
                        }
                        return state;
                    });
                    console.log(JSON.stringify(fileState));
                    window.localStorage.setItem('fileList', JSON.stringify(fileState));
                    readFile(superState, dispatcher, e);
                }}
                directory
                webkitdirectory="true"
            />
            <FileBrowser
                files={fileState.files}
                icons={Icons.FontAwesome(4)}
            />
        </div>
    );
};
export default LocalFileBrowser;
