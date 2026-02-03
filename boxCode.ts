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
 * @param {number[]} boxConnections - 0 for no connections, 1 for right arrow, 2 for left arrow, 3 for both.
 * @returns {String[][]} 2D String array that contains all the boxes.
 */
function board(boxes: String[][][], boxConnections: number[] = new Array(boxes.length).fill(0)): String[][] {
    const fullBoard: String[][] = [];
    let boxesLength: number = boxes.length;
    let boxesHeight: number = 3;
    for (let i = 0; i < boxes.length; i++) {
        boxesHeight = Math.max(boxesHeight, boxes[i].length);
        boxesLength += boxes[i][0].length;
    }

    for (let i = 0; i < boxesHeight; i++) {
        fullBoard[i] = new Array(boxesLength).fill(" ");
    }
    let pos: number = 0;
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes[i].length; j++) {
            for (let k = 0; k < boxes[i][j].length; k++) {
                fullBoard[j+((fullBoard.length-boxes[i].length)/2)][pos+k] = boxes[i][j][k];
            }
        }
        pos += boxes[i][0].length + 4;
        if (i !== boxes.length-1) {
            let leftArrowExists : number = boxConnections[i] >= 2 ? 1 : 0;
            let rightArrowExists : number = boxConnections[i] % 2;
            if (rightArrowExists !== 0) {
                fullBoard[(fullBoard.length-1)/2-leftArrowExists][pos-1] = ">";
                fullBoard[(fullBoard.length-1)/2-leftArrowExists][pos-2] = "-";
                fullBoard[(fullBoard.length-1)/2-leftArrowExists][pos-3] = "-";
                fullBoard[(fullBoard.length-1)/2-leftArrowExists][pos-4] = "-";
            }
            if (leftArrowExists) {
                fullBoard[(fullBoard.length-1)/2+rightArrowExists][pos-1] = "-";
                fullBoard[(fullBoard.length-1)/2+rightArrowExists][pos-2] = "-";
                fullBoard[(fullBoard.length-1)/2+rightArrowExists][pos-3] = "-";
                fullBoard[(fullBoard.length-1)/2+rightArrowExists][pos-4] = "<";
            }

        }
    }
    return fullBoard;
}

let test = board([box("Happy", 5, 3), box("Long Word", 7), box("TEST"), box("TEST", 3, 3), box("FinalFinal")], [3, 1, 0, 2]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}