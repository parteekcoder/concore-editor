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

    const handleCreateFolder = (key) => {
        setFileState((state) => {
            state.files = state.files.concat([{
                key: key,
            }]);
            console.log(fileState);
            return state;
        });
    };

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
                accept=".graphml"
                onChange={(e) => {
                    console.log(e.target.files);
                    setFileState((state) => {
                        for (let i = 0; i < e.target.files.length; i += 1) {
                            console.log(Moment(e.target.files[0].lastModified).date() - Moment(1318781876406).date());
                            state.files = state.files.concat([{
                                key: e.target.files[i].name,
                                // eslint-disable-next-line max-len
                                lastModified: Moment(Date(e.target.files[i].lastModified)),
                                size: e.target.files[i].size,
                            }]);
                        }
                        console.log(fileState);
                        return state;
                    });
                    readFile(superState, dispatcher, e);
                }}
                multiple
            />
            {/* eslint-disable-next-line react/button-has-type */}
            <FileBrowser
                files={fileState.files}
                icons={Icons.FontAwesome(4)}
                // onCreateFolder={handleCreateFolder}
                // onCreateFiles={handleCreateFiles}
            />
        </div>
    );
};
export default LocalFileBrowser;
