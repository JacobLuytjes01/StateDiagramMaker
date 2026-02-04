/**
 * @param {string} text - Text goes in the middle of the box.
 * @param {number} height - The y-axis length of the box, must be an odd number.
 * @param {number} width - The spacing on the left and right of the word.
 * @returns {String[][]} 2D String array that contains a box with a word in it.
 */
function box(text: string, height: number = 3, width: number = 1): String[][] {
    if (height % 2 === 0) {
        throw "height must be a odd number";
    }
    let boxes: String[][] = [];
    let boxLength: number = text.length + 1 + width*2;
    for (let i = 0; i < height; i++) {
        if (i == 0 || i == height-1) {
            boxes[i] = new Array(boxLength).fill("-");
        }
        else {
            boxes[i] = new Array(boxLength).fill(" ");
        }
        boxes[i][0] = "|";
        boxes[i][boxLength] = "|";
    }
    boxes[0][0] = "┌";
    boxes[0][boxLength] = "┐";
    boxes[height-1][0] = "└";
    boxes[height-1][boxLength] = "┘";
    for (let i = 0; i < text.length; i++) {
        boxes[(height-1)/2][i+1+width] = text[i];
    }
    return boxes;
}

/**
 * @param {String[][][]} boxes - Array of boxes
 * @param {number[]} localBoxConnections - 0 for no connections, 1 for right arrow, 2 for left arrow, 3 for both.
 * @param {number[][]} farBoxConnections - An array of [From, To, ArrowType, length], 1 for "From to To" arrow, 2 for "To to From" arrow, 3 for both.
 * @returns {String[][]} 2D String array that contains all the boxes.
 */
function board(boxes: String[][][], localBoxConnections: number[] = new Array(boxes.length).fill(0), farBoxConnections: number[][] | null = null): String[][] {
    const fullBoard: String[][] = [];
    let boxesLength: number = boxes.length * 4;
    let boxesHeight: number = 3;
    let largestBox: number = 3;
    for (let i = 0; i < boxes.length; i++) {
        boxesHeight = Math.max(boxesHeight, boxes[i].length);
        boxesLength += boxes[i][0].length;
        largestBox = Math.max(largestBox, boxes[i].length);
    }
    let boxLen2: number = 0;
    if (farBoxConnections != null) {
        for (let i = 0; i < farBoxConnections.length; i++) {
            boxLen2 = Math.max(boxLen2, farBoxConnections[i].length+1);
        }
    }
    boxesHeight += boxLen2;

    for (let i = 0; i < boxesHeight; i++) {
        fullBoard[i] = new Array(boxesLength).fill(" ");
    }
    let pos: number = 0;
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes[i].length; j++) {
            for (let k = 0; k < boxes[i][j].length; k++) {
                fullBoard[j+((largestBox-boxes[i].length)/2)][pos+k] = boxes[i][j][k];
            }
        }
        pos += boxes[i][0].length + 4;
        if (i !== boxes.length-1) {
            let leftArrowExists : number = localBoxConnections[i] >= 2 ? 1 : 0;
            let rightArrowExists : number = localBoxConnections[i] % 2;
            if (rightArrowExists !== 0) {
                fullBoard[(largestBox-1)/2-leftArrowExists][pos-1] = ">";
                fullBoard[(largestBox-1)/2-leftArrowExists][pos-2] = "-";
                fullBoard[(largestBox-1)/2-leftArrowExists][pos-3] = "-";
                fullBoard[(largestBox-1)/2-leftArrowExists][pos-4] = "-";
            }
            if (leftArrowExists) {
                fullBoard[(largestBox-1)/2+rightArrowExists][pos-1] = "-";
                fullBoard[(largestBox-1)/2+rightArrowExists][pos-2] = "-";
                fullBoard[(largestBox-1)/2+rightArrowExists][pos-3] = "-";
                fullBoard[(largestBox-1)/2+rightArrowExists][pos-4] = "<";
            }

        }
    }
    if (farBoxConnections != null) {
        for (let i = 0; i < farBoxConnections.length; i++) {
            let pos1 = (boxes[farBoxConnections[i][0]][0].length+1) / 2;
            let pos2 = (boxes[farBoxConnections[i][1]][0].length+1) / 2;
            for (let j = 0; j < farBoxConnections[i][0]; j++) {
                pos1 += boxes[i][0].length + 4;
            }
            for (let j = 0; j < farBoxConnections[i][1]; j++) {
                pos2 += boxes[i][0].length + 4;
            }
            let startLines: number = Math.min(boxes[farBoxConnections[i][0]].length, boxes[farBoxConnections[i][1]].length)+1;
            let endLines: number = Math.max(boxes[farBoxConnections[i][0]].length, boxes[farBoxConnections[i][1]].length) + farBoxConnections[i][3];
            for (let j = startLines; j < endLines; j++) {
                if (j >= boxes[farBoxConnections[i][0]].length) {
                    fullBoard[j][pos1] = "|";
                }
                if (j >= boxes[farBoxConnections[i][1]].length) {
                    fullBoard[j][pos2] = "|";
                }
            }
            let leftArrowExists : number = farBoxConnections[i][2] >= 2 ? 1 : 0;
            let rightArrowExists : number = farBoxConnections[i][2] % 2;
            if (rightArrowExists !== 0) {
                let offset = (largestBox-boxes[farBoxConnections[i][0]].length)/2;
                fullBoard[boxes[farBoxConnections[i][0]].length+offset][pos1] = "^";
            }
            if (leftArrowExists) {
                let offset = (largestBox-boxes[farBoxConnections[i][1]].length)/2;
                fullBoard[boxes[farBoxConnections[i][1]].length+offset][pos2] = "^";
            }
            fullBoard[endLines][pos1] = "└";
            fullBoard[endLines][pos2] = "┘";
            for (let j = pos1+1; j < pos2; j++) {
                fullBoard[endLines][j] = "-";
            }
        }
    }
    return fullBoard;
}

let test = board([box("Happy", 5, 3), box("Long Word", 7), box("TEST"), box("TEST", 3, 3), box("Final")], [3, 1, 0, 2], [[0,1,3,2]]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}