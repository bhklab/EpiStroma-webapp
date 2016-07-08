'use strict'

var classSuffixes = { nodeColor: 'node-color', nodeSize: 'node-size', labelPlacement: 'label-placement', labelBackground: 'label-background' };
var nodeSizes = { small: 12, medium: 18, large: 20, source: 40 };
var fontSizes = {source: 24};

var bipartiteStyles = {
    epi: {
        nodeColor: {
            'selector': '.epi-' + classSuffixes.nodeColor,
            'style': {
                'background-color': 'red',
            }
        },
        labelPlacement: {
            'selector': '.epi-' + classSuffixes.labelPlacement,
            'style': {
                'text-halign': 'center',
                'text-valign': 'center',
                'text-outline-color': 'red',
                'text-outline-width': 1,
                'color': 'white',
                'font-family': 'Verdana'
            }
        }
    },
    stroma: {
        nodeColor: {
            'selector': '.stroma-' + classSuffixes.nodeColor,
            'style': {
                'background-color': 'blue',
            }
        },
        labelPlacement: {
            'selector': '.stroma-' + classSuffixes.labelPlacement,
            'style': {
                'text-halign': 'center',
                'text-valign': 'center',
                'text-outline-color': 'blue',
                'text-outline-width': 1,
                'color': 'white',
                'font-family': 'Verdana'
            }
        }
    }
};

var randomStyles = {
    stripedSourceEpi: {
        'selector': '.sourceNode.epi',
        'style': {
            'pie-size': '100%',
            'pie-1-background-color': '#D500F9',
            'pie-1-background-size': '50',
            'pie-2-background-color': 'red',
            'pie-2-background-size': '50',
            'height': '40px',
            'width': '40px'
        }
    },
    stripedSourceStroma: {
        'selector': '.sourceNode.stroma',
        'style': {
            'pie-size': '100%',
            'pie-1-background-color': '#D500F9',
            'pie-1-background-size': '50',
            'pie-2-background-color': 'blue',
            'pie-2-background-size': '50',
            'height': '40px',
            'width': '40px'
        }
    },
    labelBackground: {
        'selector': 'node',
        'style': {}
    }
};

var nodeSize = {
    small: {
        'selector': 'node',
        'style': {
            'width': nodeSizes.small + 'px',
            'height': nodeSizes.small + 'px'
        }
    },
    medium: {
        'selector': 'node',
        'style': {
            'width': nodeSizes.medium + 'px',
            'height': nodeSizes.medium + 'px'
        }
    },
    large: {
        'selector': 'node',
        'style': {
            'width': nodeSizes.large + 'px',
            'height': nodeSizes.large + 'px'
        }
    },
    source: {
        'selector': '.sourceNode',
        'style': {
            'height': nodeSizes.source + 'px',
            'width': nodeSizes.source + 'px'
        }
    }
};

var fontSize = {
    source: {
        'selector': '.sourceNode',
        'style': {
            'font-size': fontSizes.source + 'px'
        }
    }
};

var selfLoopEdge = {
    'curve-style': 'bezier',
    'line-style': 'solid',
    'line-color': '#FF6D00',
    'target-arrow-color': '#FF6D00',
    'target-arrow-shape': 'triangle'
};

var edgeWeights = {
    positive: {
        selector: 'edge[weight>=0]',
        style: {
            width: '',
            'line-color': 'black',
            opacity: ''
        }
    },
    negative: {
        selector: 'edge[weight<0]',
        style: {
            width: '',
            'line-color': 'cyan',
            opacity: ''
        }
    }
};

var allRandomFormats = [nodeSize.medium, randomStyles.stripedSourceEpi, randomStyles.stripedSourceStroma, randomStyles.labelBackground, bipartiteStyles.epi.nodeColor,
    bipartiteStyles.epi.labelPlacement, bipartiteStyles.stroma.nodeColor, bipartiteStyles.stroma.labelPlacement
];

var allConcentricFormats = [nodeSize.medium, nodeSize.source, bipartiteStyles.epi.nodeColor,
    bipartiteStyles.epi.labelPlacement, bipartiteStyles.stroma.nodeColor, bipartiteStyles.stroma.labelPlacement, fontSize.source
];

function getAllBipartiteStyles() {
    var styles = [];

    for (var prop in bipartiteStyles.epi) {
        styles.push(bipartiteStyles.epi[prop]);
    }

    for (var prop in bipartiteStyles.stroma) {
        styles.push(bipartiteStyles.stroma[prop]);
    }

    return styles;
}

function getDynamicWidth(property, min, max) {
    if (Number(min) == Number(max)) {
        return "1px";
    }

    if (min < 0) {
        var width = Math.abs(Math.floor((min - max) * 10)) > 6 ? Math.abs(Math.floor((min - max) * 10)) : 6;
        return 'mapData(' + property + ',' + min + ',' + max + ',' + width + "px" + "," + "1px" + ")";
    } else {
        var width = Math.abs(Math.floor((max - min) * 10)) > 6 ? Math.abs(Math.floor((max - min) * 10)) : 6;
        return 'mapData(' + property + ',' + min + ',' + max + ',' + "1px" + "," + width + "px" + ")";
    }
}

function getDynamicColor(property, min, max) {
    if (min < 0) {
        if (Number(min) == Number(max)) {
            return '#ff9900';
        }

        return 'mapData(' + property + ',' + min + ',' + max + ',' + "#ff9900" + "," + "#ffd699" + ")";
    } else {
        if (Number(min) == Number(max)) {
            return 'black';
        }

        return 'mapData(' + property + ',' + min + ',' + max + ',' + "#f2f2f2" + "," + "black" + ")";
    }
}

function setDynamicEdgeStyles(edgeStyleNegative, edgeStylePositive, overallWeights) {
    edgeStyleNegative.style.width = getDynamicWidth('weight', overallWeights.minNegative, overallWeights.maxNegative);
    edgeStyleNegative.style['line-color'] = getDynamicColor('weight', overallWeights.minNegative, overallWeights.maxNegative);

    edgeStylePositive.style.width = getDynamicWidth('weight', overallWeights.minPositive, overallWeights.maxPositive);
    edgeStylePositive.style['line-color'] = getDynamicColor('weight', overallWeights.minPositive, overallWeights.maxPositive);
}

module.exports = {
    getAllBipartiteStyles: getAllBipartiteStyles,
    allRandomFormats: allRandomFormats,
    allConcentricFormats: allConcentricFormats,
    classSuffixes: classSuffixes,
    nodeSizes: nodeSizes,
    selfLoopEdge: selfLoopEdge,
    bipartiteStyles: bipartiteStyles,
    nodeSize: nodeSize,
    randomStyles: randomStyles,
    edgeWeights: edgeWeights,
    getDynamicWidth: getDynamicWidth,
    getDynamicColor: getDynamicColor,
    setDynamicEdgeStyles: setDynamicEdgeStyles
};