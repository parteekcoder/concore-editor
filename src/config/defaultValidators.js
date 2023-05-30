const nodeValidator = `(node, nodes, edges) => {
    var regex = /^[A-za-z0-9]+[:[A-Za-z0-9.]+]|[^$]$/;
    let message = { ok: true, err: null };
    if (!regex.test(node.label)) {
        message = {
            ok: false,
            err: 'Node with incorrect label.',
        }
        return message;
    }
    nodes.forEach((n) => {
        if (n.id !== node.id && n.label.split(':')[0] === node.label.split(':')[0]) {
            message = {
                ok: false,
                err: 'Node with same label exists.',
            };
        }
    });
    return message;
    }`;
const edgeValidator = `(edge, nodes, edges) => {
let message = { ok: true, err: null };
edges.forEach((e) => {
    if (e.label === edge.label && e.sourceLabel !== edge.sourceLabel) {
        message = {
            ok: false,
            err: 'Edge with same label exists.',
        };
    }
});
return message;
}`;

/* eslint-disable max-len */
const nodeValidatorFormat = `Takes **\`node\`** details under validation, existing **\`nodes\`**, existing **\`edges\`** and **\`type\`**

**Node:** { label: String, style: Object, id: String | undefined },
**Nodes:** [{ label: String, style: Object, id: String }],
**Edges:** [{ label: String, sourceLabel: String, targetLabel: String, style: Object, id: String }],
**Type:** \`New\` | \`Update\``;

const edgeValidatorFormat = `Takes **\`edge\`** details under validation, existing **\`nodes\`** and existing **\`edges\`** and **\`type\`**

**Edge:** { label: String, sourceLabel: String, targetLabel: String, style: Object, id: String | undefined },
**Nodes:** [{ label: String, style: Object, id: String }],
**Edges:** [{ label: String, sourceLabel: String, targetLabel: String, style: Object, id: String }],
**Type:** \`New\` | \`Update\``;
/* eslint-enable max-len */

export {
    nodeValidator, edgeValidator, nodeValidatorFormat, edgeValidatorFormat,
};
