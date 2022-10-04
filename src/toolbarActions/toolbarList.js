/* eslint-disable no-alert */
import {
    FaSave, FaUndo, FaRedo, FaTrash, FaFileImport, FaPlus, FaDownload, FaEdit, FaRegTimesCircle, FaShare, FaHistory,
    FaHammer, FaBug, FaBomb, FaToggleOn, FaThermometerEmpty,
} from 'react-icons/fa';

import {
    // FiChevronDown, FiChevronsDown, FiChevronsUp, FiChevronUp,
    FiPlay, FiStopCircle, FiToggleLeft, FiTriangle,
} from 'react-icons/fi';

import {
    createNode, editElement, deleteElem, downloadImg, saveAction,
    readFile, clearAll, undo, redo, openShareModal, viewHistory,
    toggleServer,
    // openSettingModal,
} from './toolbarFunctions';

const toolbarList = (state, dispatcher) => [
    {
        type: 'action',
        text: 'Node',
        icon: FaPlus,
        action: createNode,
        active: true,
        hotkey: 'Ctrl+G',
    },
    { type: 'vsep' },
    {
        type: 'file-upload',
        text: 'Open',
        icon: FaFileImport,
        action: readFile,
        active: true,
        hotkey: 'Ctrl+O',
    },
    {
        type: 'menu',
        text: 'Save',
        icon: FaSave,
        action: (s, d) => [
            { fn: () => saveAction(s, d), name: 'Save As' },
        ],
        active: false,
    },
    {
        type: 'menu',
        text: 'Save As',
        icon: FaSave,
        action: (s, d) => [
            { fn: () => saveAction(s, d, prompt('File Name:')), name: 'Save As' },
        ],
        active: true,
    },
    {
        type: 'action',
        text: 'Empty',
        icon: FaThermometerEmpty,
        action: clearAll,
        active: true,
        hotkey: 'Ctrl+Backspace',
    },
    { type: 'vsep' },
    {
        type: 'action',
        text: 'Undo',
        icon: FaUndo,
        action: undo,
        active: state.undoEnabled,
        hotkey: 'Ctrl+Z',
    },
    {
        type: 'action',
        text: 'Redo',
        icon: FaRedo,
        action: redo,
        active: state.redoEnabled,
        hotkey: 'Ctrl+Shift+Z,Ctrl+Y',
    },
    { type: 'vsep' },
    {
        type: 'action',
        text: 'Edit',
        icon: FaEdit,
        action: editElement,
        active: (state.eleSelected && state.eleSelectedPayload.type !== 'MIX'),
        hotkey: 'Ctrl+E',
    },
    {
        type: 'action',
        text: 'Delete',
        icon: FaTrash,
        action: deleteElem,
        active: state.eleSelected,
        hotkey: 'Delete,Backspace,Del,Clear',
    },
    { type: 'vsep' },
    {
        type: 'action',
        text: 'History',
        icon: FaHistory,
        action: viewHistory,
        active: true,
    },
    { type: 'vsep' },
    // server buttons
    {
        type: 'action',
        text: 'Server',
        icon: state.isWorkflowOnServer ? FaToggleOn : FiToggleLeft,
        action: () => toggleServer(state, dispatcher),
        active: true,
    },
    {
        type: 'action',
        text: 'Build',
        icon: FaHammer,
        action: () => state.curGraphInstance && state.curGraphInstance.build(),
        active: state.isWorkflowOnServer,
    },
    {
        type: 'action',
        text: 'Debug',
        icon: FaBug,
        action: () => state.curGraphInstance && state.curGraphInstance.debug(),
        active: state.isWorkflowOnServer,
    },
    {
        type: 'action',
        text: 'Run',
        icon: FiPlay,
        action: () => state.curGraphInstance && state.curGraphInstance.run(),
        active: state.isWorkflowOnServer,
    },
    {
        type: 'action',
        text: 'Clear',
        icon: FaRegTimesCircle,
        action: () => state.curGraphInstance && state.curGraphInstance.clear(),
        active: state.isWorkflowOnServer,
    },
    {
        type: 'action',
        text: 'Stop',
        icon: FiStopCircle,
        action: () => state.curGraphInstance && state.curGraphInstance.stop(),
        active: state.isWorkflowOnServer,
    },
    {
        type: 'action',
        text: 'Destroy',
        icon: FaBomb,
        action: () => state.curGraphInstance && state.curGraphInstance.destroy(),
        active: state.isWorkflowOnServer,
    },

    // Not being implemented in version 1
    // {
    //     type: 'action',
    //     text: 'Push',
    //     icon: FiChevronUp,
    //     action: () => state.curGraphInstance && state.curGraphInstance.pushToServer(),
    //     active: state.curGraphInstance && state.isWorkflowOnServer,
    // },
    // {
    //     type: 'action',
    //     text: 'Pull',
    //     icon: FiChevronDown,
    //     action: () => state.curGraphInstance && state.curGraphInstance.pullFromServer(),
    //     active: state.curGraphInstance && state.isWorkflowOnServer,
    // },
    // {
    //     type: 'action',
    //     text: 'Force Push',
    //     icon: FiChevronsUp,
    //     action: () => state.curGraphInstance && state.curGraphInstance.forcePushToServer(),
    //     active: state.curGraphInstance && state.isWorkflowOnServer,
    // },
    // {
    //     type: 'action',
    //     text: 'Force Pull',
    //     icon: FiChevronsDown,
    //     action: () => state.curGraphInstance && state.curGraphInstance.forcePullFromServer(),
    //     active: state.curGraphInstance && state.isWorkflowOnServer,
    // },
    // { type: 'vsep' },
    { type: 'space' },
    // Not being implemented in version 1
    // {
    //     type: 'action',
    //     text: 'Settings',
    //     icon: FaRegSun,
    //     action: openSettingModal,
    //     active: true,
    // },
    {
        type: 'action',
        text: 'Contribute',
        icon: FiTriangle,
        action: () => { window.open('https://github.com/ControlCore-Project/concore-editor', '_blank'); },
        active: true,
    },
    {
        type: 'action',
        text: 'Share',
        icon: FaShare,
        action: openShareModal,
        active: true,
    },
    {
        type: 'menu',
        text: 'Export',
        icon: FaDownload,
        action: (s, d) => [
            { fn: () => downloadImg(s, d, 'JPG'), name: 'JPG' },
            { fn: () => downloadImg(s, d, 'PNG'), name: 'PNG' },
        ],
        active: true,
    },
    { type: 'vsep' },
];

export default toolbarList;
