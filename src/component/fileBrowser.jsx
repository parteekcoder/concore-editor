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
            {
                key: '/home/emory/Desktop/github',
                modified: +Moment().subtract(1, 'hours'),
                size: 1.5 * 1024 * 1024,
            },
            {
                key: '/concore/demo/sample2.graphml',
                modified: +Moment().subtract(3, 'days'),
                size: 545 * 1024,
            },
            {
                key: '/concore/demo/sample3.graphml',
                modified: +Moment().subtract(3, 'days'),
                size: 52 * 1024,
            },
            {
                key: '/concore/demo/sampleM.graphml',
                modified: +Moment().subtract(2, 'months'),
                size: 13.2 * 1024 * 1024,
            },
            {
                key: '/concore/demo/sampleMFile.graphml',
                modified: +Moment().subtract(25, 'days'),
                size: 85 * 1024,
            },
            {
                key: '/concore/demo/sampleP.graphml',
                modified: +Moment().subtract(15, 'days'),
                size: 480 * 1024,
            },
            {
                key: '/concore/demo/sampleplot.graphml',
                modified: +Moment().subtract(15, 'days'),
                size: 4.2 * 1024 * 1024,
            },
        ],
    });

    const handleCreateFolder = (key) => {
        setFileState((state) => {
            state.files = state.files.concat([]);
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
                    console.log(e.target.files.length);
                    // const { name } = e.target.files[0].name;
                    // const { lastModified } = e.target.files[0].lastModified;
                    // const { size } = e.target.files[0].size;
                    // const { files } = [{
                    //     key: name,
                    //     lastModified: lastModified,
                    //     size: size,
                    // }];
                    console.log('Hi');
                    // setFileState(files);
                    readFile(superState, dispatcher, e);
                }}
                multiple
            />
            {/* eslint-disable-next-line react/button-has-type */}
            <FileBrowser
                files={fileState.files}
                icons={Icons.FontAwesome(4)}
                onCreateFolder={handleCreateFolder}
            />
        </div>
    );
};

export default LocalFileBrowser;
