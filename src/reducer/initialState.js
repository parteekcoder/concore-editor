const initialState = {
    ModelOpen: false,
    modalPayload: {
        cb: () => {},
        title: '',
        submitText: '',
        Children: '',
        defaultStyle: {},
        defaultLabel: '',
        labelAllowed: null,
    },
    shareModal: false,
    settingsModal: false,
    editDetailsModal: false,
    newGraphModal: false,
    contributeModal: false,

    eleSelected: false,
    drawModeOn: true,
    undoEnabled: false,
    redoEnabled: false,
    graphs: [],
    curGraphIndex: 0,
    viewHistory: false,
    isWorkflowOnServer: false,
    curGraphInstance: null,
    zoomLevel: 100,
    uploadedDirName: null,
    resetEnabled: false,
};

const initialGraphState = {
    projectName: '',
    graphID: null,
    serverID: null,
    graphML: null,
    authorName: '',
    component: null,
    instance: null,
    id: null,
    fileHandle: null,
    fileName: null,
};

export { initialState, initialGraphState };
