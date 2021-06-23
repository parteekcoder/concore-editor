import { actionType as T } from '../reducer';
import GraphLoadSave from './graph-load-save';
// import GraphComponent from './graph-component';
import GraphCanvas from './graph-canvas';
import GraphUndoRedo from './graph-undo-redo';
import BendingDistanceWeight from './calculations/bending-dist-weight';

const CoreGraph = (ParentClass) => class CG extends
    GraphLoadSave(GraphCanvas(GraphUndoRedo(ParentClass))) {
    constructor(id, cy, dispatcher, superState, projectDetails) {
        super();
        if (dispatcher) this.dispatcher = dispatcher;
        if (superState) this.superState = superState;
        if (cy) this.cy = cy;
        this.id = id;
        this.projectDetails = projectDetails;
        this.regesterEvents();
        this.saveLocalStorage();
        this.bendNode = this.cy.add(
            { group: 'nodes', data: { type: 'bend' }, classes: ['hidden'] },
        );
    }

    setProjectDetail(projectDetails) {
        this.projectDetails = projectDetails;
        this.saveLocalStorage();
    }

    setNodeEvent() { return this; }

    getById(x) {
        return this.cy.getElementById(x);
    }

    set({ cy, dispatcher, superState }) {
        if (dispatcher) this.dispatcher = dispatcher;
        if (superState) this.superState = superState;
        if (cy) this.cy = cy;
    }

    selectDeselectEventHandler() {
        const els = this.cy.$(':selected');
        if (els.length === 0) { return this.dispatcher({ type: T.ELE_UNSELECTED }); }
        let type;
        if (els.every((e) => e.isNode())) type = 'NODE';
        else if (els.every((e) => e.isEdge())) type = 'EDGE';
        else type = 'MIX';
        const ids = els.map((e) => e.data('id'));
        return this.dispatcher({
            type: T.ELE_SELECTED,
            payload: {
                ids, type,
            },
        });
    }

    regesterEvents() {
        this.cy.on('select unselect', () => this.selectDeselectEventHandler());
        this.cy.on('add remove move style data free', '[type]', this.saveLocalStorage.bind(this));
        this.cy.on('grab', (e) => {
            e.target.forEach((node) => {
                node.scratch('position', { ...node.position() });
            });
        });
        this.cy.on('dragfree', (e) => {
            e.target.forEach((node) => {
                this.addPositionChange(node.id(), node.scratch('position'), { ...node.position() });
            });
        });
        this.cy.on('nodeediting.resizestart', (e, type, node) => {
            node.scratch('height', node.data('style').height);
            node.scratch('width', node.data('style').width);
            node.scratch('position', { ...node.position() });
        });
        this.cy.on('nodeediting.resizeend', (e, type, node) => {
            this.addDimensionChange(
                node.id(),
                { height: node.scratch('height'), width: node.scratch('width') },
                node.scratch('position'),
                { height: node.data('style').height, width: node.data('style').width },
                { ...node.position() },
            );
        });

        this.cy.on('drag', (evt) => (evt.target[0].data('type') !== 'bend' ? this.cy.$(':selected').unselect() : 0));
        this.cy.on('select unselect', () => {
            const el = this.cy.$(':selected');
            if (el.length !== 1 || !el[0].isEdge()) {
                this.bendNode.removeListener('drag');
                this.bendNode.addClass('hidden');
                return;
            }
            this.bendNode.position(CG.getBendEdgePoint(el));
            this.bendNode.on('drag', () => {
                const DW = BendingDistanceWeight.getWeightDistance(
                    this.bendNode.position(), el.source().position(), el.target().position(),
                );
                el.emit('bending');
                el.style('segment-weights', DW.w);
                el.style('segment-distances', DW.d);
            });
            this.bendNode.removeClass('hidden');
        });
    }

    static getBendEdgePoint(el) {
        const w = parseFloat(el.style('segment-weights'));
        const d = parseFloat(el.style('segment-distances').slice(0, -2));
        return BendingDistanceWeight.getCoordinate(w, d, el.source().position(), el.target().position());
    }

    setCurStatus() {
        if (super.setCurStatus) super.setCurStatus();
        this.selectDeselectEventHandler();
    }
};

export default CoreGraph;
