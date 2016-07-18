'use strict'

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isPositive(n) {
    return n >= 0;
}

function isNegative(n) {
    return n <= 0;
}

function validateFilters(body) {
    if (body.minPositiveWeightFirst != "NA" || (body.minPositiveWeightFirst == "NA" && body.selectedFilterFirst.positive)) {
        if (!(isNumeric(body.minPositiveWeightFirst) && isPositive(body.minPositiveWeightFirst))) {
            return { error: "First neighbours positive filter must be a positive number and not exceed the specified highest value" };
        }
    }

    if (body.minNegativeWeightFirst != "NA" || (body.minNegativeWeightFirst == "NA" && body.selectedFilterFirst.negative)) {
        if (!(isNumeric(body.minNegativeWeightFirst) && isNegative(body.minNegativeWeightFirst))) {
            return { error: "First neighbours negative filter must be a negative number and not exceed the specified lowest value" };
        }
    }

    if (body.minPositiveWeightSecond != "NA" || (body.minPositiveWeightSecond == "NA" && body.selectedFilterSecond.positive)) {
        if (!(isNumeric(body.minPositiveWeightSecond) && isPositive(body.minPositiveWeightSecond))) {
            return { error: "Second neighbours positive filter must be a positive number and not exceed the specified highest value" };
        }
    }

    if (body.minNegativeWeightSecond != "NA" || (body.minNegativeWeightSecond == "NA" && body.selectedFilterSecond.negative)) {
        if (!(isNumeric(body.minNegativeWeightSecond) && isNegative(body.minNegativeWeightSecond))) {
            return { error: "Second neighbours negative filter must be a negative number and not exceed the specified lowest value" };
        }
    }

    return { error: null };
}

function validateFiles(files) {
    if (files == null) {
        return { error: "Please specify the necessary files." };
    } else if (files.error != null) {
        return { error: files.error };
    }

    return {};
}

function validateSelectedGenes(selectedGenes) {
    var selectedGeneNames  = [];

    if (selectedGenes == null || selectedGenes == "" || selectedGenes == []) {
        return { error: "Please select at least 1 gene of interest." };
    }

    for (var i = 0; i < selectedGenes.length; i++) {
        if (selectedGenes[i] == null || selectedGenes[i].value == null) {
            return { error: "Please select a gene." };
        }

        selectedGeneNames.push(selectedGenes[i].value);
    }

    return selectedGeneNames;
}

module.exports = {
    isNegative: isNegative,
    isPositive: isPositive,
    isNumeric: isNumeric,
    validateFilters: validateFilters,
    validateFiles: validateFiles,
    validateSelectedGenes: validateSelectedGenes
};
