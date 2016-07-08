'use strict'

function nodeIsInTopEdges(node, topEdges) {
    for (var i = 0; i < topEdges.length; i++) { 
        if (topEdges[i].data.source == node.data.id || topEdges[i].data.target == node.data.id) {
            return true;
        }
    }

    return false;
}

module.exports = {
    nodeIsInTopEdges: nodeIsInTopEdges
};