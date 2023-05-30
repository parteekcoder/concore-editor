import React, {
    useCallback, useEffect, useState, createRef,
} from 'react';
import './nodeDetails.css';
// import ColorBox from './ColorBox';
import localStorageManager from '../../graph-builder/local-storage-manager';

const NodeDetails = ({
    data, setData, submit, labelAllowed,
}) => {
    const inputRef = useCallback((node) => node && node.focus(), []);
    const textRef = createRef();
    const [widthSet] = useState(false);
    const [labelName, setLabelName] = useState('');
    const [labelFile, setLabelFile] = useState('');
    const indexOfFile = [];
    indexOfFile.push(0);

    const setStyle = (prop) => {
        setData({ ...data, style: { ...data.style, ...prop } });
    };

    useEffect(() => {
        if (!widthSet) {
            setStyle({
                width: Math.max(data.style.width, Math.min(500, textRef.current.offsetWidth + 20)),
            });
        }
    }, [!widthSet && data.label]);

    useEffect(() => {
        setLabelName(data.label.split(':')[0]);
    }, [data.label]);

    return (
        <div className="nodeform" onSubmit={submit}>
            <div className="parent-div" style={{ height: data.style.height }}>
                <div
                    className="node-div"
                    style={{
                        ...data.style,
                        borderRadius: data.style.shape === 'ellipse' ? '100%' : 0,
                    }}
                >
                    <span ref={textRef}>{labelAllowed ? data.label : ''}</span>

                </div>
            </div>
            <div className="form" style={{ padding: 20 }}>
                {/* <div> Shape</div>
                <div>
                    <label htmlFor="rectangle">
                        <input
                            type="radio"
                            name="shape"
                            value="rectangle"
                            checked={data.style.shape === 'rectangle'}
                            onChange={() => setStyle({ shape: 'rectangle' })}
                        />
                        Rectangle
                    </label>
                </div>
                <div>
                    <label htmlFor="ellipse">
                        <input
                            type="radio"
                            name="shape"
                            value="ellipse"
                            checked={data.style.shape === 'ellipse'}
                            onChange={() => setStyle({ shape: 'ellipse' })}
                        />
                        Ellipse
                    </label>
                </div>
                <div /> */}

                {labelAllowed ? <div> Label</div> : ''}
                {labelAllowed ? (
                    <>
                        <input
                            className="nodeLabel"
                            ref={inputRef}
                            type="text"
                            required
                            label="Node Label"
                            placeholder="Enter Node Label"
                            value={data.label.split(':')[0]}
                            onChange={(e) => {
                                if (e.target.value.slice(-1) !== ':') {
                                    setLabelName(`${e.target.value}:`);
                                    setData({ ...data, label: `${e.target.value}:${labelFile}` });
                                } else {
                                    setLabelName(e.target.value);
                                    setData({ ...data, label: e.target.value + labelFile });
                                }
                            }}
                        />

                        <input
                            className="nodeLabelFile"
                            type="text"
                            label="Node Label file"
                            placeholder="Select file"
                            onChange={(e) => {
                                setLabelFile(e.target.value.split('/').pop());
                                if (labelName) {
                                    let lname = labelName;
                                    if (labelName.slice(-1) !== ':') {
                                        setLabelName(`${labelName}:`);
                                        lname += ':';
                                    }
                                    setData({ ...data, label: lname + e.target.value.split('/').pop() });
                                } else setData({ ...data, label: `:${e.target.value.split('/').pop()}` });
                            }}
                            list="files"
                        />
                        <datalist id="files">
                            {
                                localStorageManager.getFileList()
                                    // eslint-disable-next-line max-len, prefer-arrow-callback
                                    ? JSON.parse(localStorageManager.getFileList())
                                        .map((item) => {
                                            const list = [];
                                            const acceptedTypes = ['.v', '.c', '.cpp', '.py', '.m', '.sh'];
                                            let index;
                                            // eslint-disable-next-line max-len
                                            if ((acceptedTypes.some((substring) => item.key.toString().includes(substring)))) {
                                                list.push(item.key.toString());
                                                indexOfFile.push(indexOfFile[indexOfFile.length - 1] + 1);
                                                index = indexOfFile[indexOfFile.length - 1] + 1;
                                                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                                                return <option value={list} key={index} />;
                                            }
                                            return null;
                                        })
                                    : ''
                            }
                        </datalist>
                    </>
                ) : ''}
                {/* <div> Width</div>
                <input
                    type="number"
                    value={data.style.width}
                    onChange={(e) => {
                        setWidthSet(true);
                        setStyle({
                            width: Math.min(500, e.target.value),
                        });
                    }}
                /> */}

                {/* <div> Height</div>
                <input
                    type="number"
                    value={data.style.height}
                    onChange={(e) => setStyle({ height: Math.min(200, e.target.value) })}
                /> */}

                {/* <div> Background Color</div>
                <ColorBox
                    color={data.style.backgroundColor}
                    setColor={(color) => setStyle({ backgroundColor: color })}
                    type="light"
                /> */}

                {/* <div> Border Color</div>
                <ColorBox
                    color={data.style.borderColor}
                    setColor={(color) => setStyle({ borderColor: color })}
                    type="dark"
                /> */}

                {/* <div> Border Width</div>
                <input
                    type="number"
                    value={data.style.borderWidth}
                    onChange={(e) => setStyle({ borderWidth: Math.min(30, e.target.value) })}
                /> */}
                {/* <div> Opacity</div>
                <input
                    type="number"
                    step=".01"
                    value={data.style.opacity}
                    onChange={(e) => setStyle({ opacity: Math.min(1, Math.max(0, e.target.value)) })}
                /> */}
            </div>
        </div>
    );
};

export default NodeDetails;
