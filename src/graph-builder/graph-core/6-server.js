import { toast } from 'react-toastify';
import Axios from 'axios';
import { actionType as T } from '../../reducer';
import GraphLoadSave from './5-load-save';
// import {
//     postGraph, updateGraph, forceUpdateGraph, getGraph, getGraphWithHashCheck,
// } from '../../serverCon/crud_http';

class GraphServer extends GraphLoadSave {
    set(config) {
        const { serverID } = config;
        super.set(config);
        if (serverID) {
            this.setServerID(serverID);
            this.dispatcher({ type: T.IS_WORKFLOW_ON_SERVER, payload: Boolean(this.serverID) });
        }
    }
    // Not being immplemented in version 1
    // pushToServer() {
    //     if (this.serverID) {
    //         updateGraph(this.serverID, this.getGraphML()).then(() => {

    //         });
    //     } else {
    //         postGraph(this.getGraphML()).then((serverID) => {
    //             this.set({ serverID });
    //             this.cy.emit('graph-modified');
    //         });
    //     }
    // }

    // forcePushToServer() {
    //     if (this.serverID) {
    //         forceUpdateGraph(this.serverID, this.getGraphML()).then(() => {

    //         });
    //     } else {
    //         postGraph(this.getGraphML()).then((serverID) => {
    //             this.set({ serverID });
    //         });
    //     }
    // }

    // forcePullFromServer() {
    //     if (this.serverID) {
    //         getGraph(this.serverID).then((graphXML) => {
    //             this.setGraphML(graphXML);
    //         });
    //     } else {
    //         // eslint-disable-next-line no-toast.success
    //         toast.success('Not on server');
    //     }
    // }

    // pullFromServer() {
    //     if (this.actionArr.length === 0) { this.forcePullFromServer(); return; }
    //     if (this.serverID) {
    //         getGraphWithHashCheck(this.serverID, this.actionArr.at(-1).hash).then((graphXML) => {
    //             this.setGraphML(graphXML);
    //         }).catch(() => {

    //         });
    //     } else {
    //         // eslint-disable-next-line no-toast.success
    //         toast.success('Not on server');
    //     }
    // }

    build() {
        // TODO
        Axios.post(`http://127.0.0.1:5000/build/${this.superState.uploadedDirName}?fetch=${this.superState.graphs[this.superState.curGraphIndex].fileName.split('.')[0]}`)
            .then((res) => { // eslint-disable-next-line
                toast.success(res.data['message'])
            }).catch((err) => { // eslint-disable-next-line
                toast.success(err);
            });
        if (this.serverID);
    }

    debug() {
        // TODO
        Axios.post(`http://127.0.0.1:5000/debug/${this.superState.graphs[this.superState.curGraphIndex].fileName.split('.')[0]}`)
            .then((res) => { // eslint-disable-next-line
                toast.success(res.data['message'])
            }).catch((err) => { // eslint-disable-next-line
                toast.success(err);
            });
        if (this.serverID);
    }

    run() {
        // TODO
        Axios.post(`http://127.0.0.1:5000/run/${this.superState.graphs[this.superState.curGraphIndex].fileName.split('.')[0]}`)
            .then((res) => { // eslint-disable-next-line
                toast.success(res.data['message'])
            }).catch((err) => { // eslint-disable-next-line
                toast.success(err);
            });
        if (this.serverID);
    }

    clear() {
        // TODO
        Axios.post(`http://127.0.0.1:5000/clear/${this.superState.graphs[this.superState.curGraphIndex].fileName.split('.')[0]}`)
            .then((res) => { // eslint-disable-next-line
                toast.success(res.data['message'])
            }).catch((err) => { // eslint-disable-next-line
                toast.success(err);
            });
        if (this.serverID);
    }

    stop() {
        // TODO
        Axios.post(`http://127.0.0.1:5000/stop/${this.superState.graphs[this.superState.curGraphIndex].fileName.split('.')[0]}`)
            .then((res) => { // eslint-disable-next-line
                toast.success(res.data['message'])
            }).catch((err) => { // eslint-disable-next-line
                toast.success(err);
            });
        if (this.serverID);
    }

    destroy() {
        // TODO
        Axios.delete(`http://127.0.0.1:5000/destroy/${this.superState.graphs[this.superState.curGraphIndex].fileName.split('.')[0]}`)
            .then((res) => { // eslint-disable-next-line
                toast.success(res.data['message'])
            }).catch((err) => { // eslint-disable-next-line
                toast.success(err);
            });
        if (this.serverID);
    }

    setCurStatus() {
        super.setCurStatus();
        this.dispatcher({ type: T.IS_WORKFLOW_ON_SERVER, payload: Boolean(this.serverID) });
    }
}

export default GraphServer;
