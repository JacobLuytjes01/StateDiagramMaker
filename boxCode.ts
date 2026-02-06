const enum Arrow {
    None,
    Right,
    Left,
    Both,
}
const BOX_GAP = 4;

/**
 * @param {string} text - Text goes in the middle of the box.
 * @param {number} height - The y-axis length of the box, must be an odd number.
 * @param {number} width - The spacing on the left and right of the word.
 * @returns {string[][]} 2D string array that contains a box with a word in it.
 */
function box(text: string, height: number = 3, width: number = 1): string[][] {
    if (height % 2 === 0) {
        throw new Error("height must be a odd number");
    }
    const boxes: string[][] = [];
    const boxLength: number = text.length + 1 + width*2;
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
 * @param {string[][][]} boxes - Array of boxes
 * @param {Arrow[]} localBoxConnections - Can use Arrow.None, Arrow.Right, Arrow.Left, Arrow.Both or 0 for no arrows, 1 for right arrow, 2 for left arrow, 3 for both.
 * @param {number[][]} farBoxConnections - An array of [From, To, ArrowType, length], ArrowType same as localBoxConnections.
 * @returns {string[][]} 2D string array that contains a board of boxes and arrows.
 */
function board(boxes: string[][][], localBoxConnections: Arrow[] = new Array(boxes.length).fill(Arrow.None), farBoxConnections: Array<[from: number, to: number, arrow: Arrow, length: number]> = []): string[][] {
    const fullBoard: string[][] = [];
    let boardWidth: number = boxes.length * BOX_GAP;
    let boxesHeight: number = 3;
    let largestBox: number = 3;
    for (let i = 0; i < boxes.length; i++) {
        boxesHeight = Math.max(boxesHeight, boxes[i].length);
        boardWidth += boxes[i][0].length;
        largestBox = Math.max(largestBox, boxes[i].length);
    }
    let boxLen2: number = 0;
    if (farBoxConnections.length != 0) {
        for (let i = 0; i < farBoxConnections.length; i++) {
            boxLen2 = Math.max(boxLen2, farBoxConnections[i][3]+1);
        }
    }
    boxesHeight += boxLen2;

    for (let i = 0; i < boxesHeight; i++) {
        fullBoard[i] = new Array(boardWidth).fill(" ");
    }
    let pos: number = 0;
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes[i].length; j++) {
            for (let k = 0; k < boxes[i][j].length; k++) {
                fullBoard[j+((largestBox-boxes[i].length)/2)][pos+k] = boxes[i][j][k];
            }
        }
        pos += boxes[i][0].length + BOX_GAP;
        if (i !== boxes.length-1) {
            const leftArrowExists : number = localBoxConnections[i] >= 2 ? 1 : 0;
            const rightArrowExists : number = localBoxConnections[i] % 2;
            const midPoint : number = (largestBox-1)/2;
            if (rightArrowExists !== 0) {
                fullBoard[midPoint-leftArrowExists][pos-1] = ">";
                for (let j = 2; j <= BOX_GAP; j++) {
                    fullBoard[midPoint-leftArrowExists][pos-j] = "-";
                }
            }
            if (leftArrowExists) {
                for (let j = 1; j < BOX_GAP; j++) {
                    fullBoard[midPoint+rightArrowExists][pos-j] = "-";
                }
                fullBoard[midPoint+rightArrowExists][pos-BOX_GAP] = "<";
            }
        }
    }
    if (farBoxConnections.length != 0) {
        for (let i = 0; i < farBoxConnections.length; i++) {
            let pos1 = Math.floor((boxes[farBoxConnections[i][0]][0].length+1) / 2);
            let pos2 = Math.floor((boxes[farBoxConnections[i][1]][0].length+1) / 2);
            for (let j = 0; j < farBoxConnections[i][0]; j++) {
                pos1 += boxes[j][0].length + BOX_GAP;
            }
            for (let j = 0; j < farBoxConnections[i][1]; j++) {
                pos2 += boxes[j][0].length + BOX_GAP;
            }
            const offset1 = Math.floor((largestBox-boxes[farBoxConnections[i][0]].length)/2);
            const offset2 = Math.floor((largestBox-boxes[farBoxConnections[i][1]].length)/2);
            const startLines: number = Math.min(boxes[farBoxConnections[i][0]].length, boxes[farBoxConnections[i][1]].length);
            const endLines: number = Math.max(boxes[farBoxConnections[i][0]].length, boxes[farBoxConnections[i][1]].length) + farBoxConnections[i][3];
            for (let j = startLines; j < endLines; j++) {
                if (j >= boxes[farBoxConnections[i][0]].length+offset1) {
                    fullBoard[j][pos1] = "|";
                }
                if (j >= boxes[farBoxConnections[i][1]].length+offset2) {
                    fullBoard[j][pos2] = "|";
                }
            }
            const leftArrowExists : number = farBoxConnections[i][2] >= 2 ? 1 : 0;
            const rightArrowExists : number = farBoxConnections[i][2] % 2;
            if (leftArrowExists) {
                fullBoard[boxes[farBoxConnections[i][0]].length+offset1][pos1] = "^";
            }
            if (rightArrowExists !== 0) {
                fullBoard[boxes[farBoxConnections[i][1]].length+offset2][pos2] = "^";
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

let test = board([box("Start", 5, 3), box("Long Word", 7), box("TEST"), box("TEST", 3, 3), box("Final")], [Arrow.Both, Arrow.Left, Arrow.None, Arrow.Right], [[0,2,Arrow.Left,5], [1,3,Arrow.None,1]]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
test = board([box("Start"), box("Playing"), box("Lose"), box("Win")], [Arrow.Left, Arrow.Left, Arrow.None], [[1,3,Arrow.Right,1]]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
console.log("");
test = board([box("One"), box("2"), box("Box with Three in it"), box("four")], [Arrow.Left,Arrow.None,Arrow.None], [[0,3,Arrow.Both,1]]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
console.log("");
test = board([box("Test"), box("No"), box("Arrows")]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
console.log("");
test = board([box("Test"), box("One"), box("Arrows"), box("Test")], [1]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
console.log("");
test = board([box("Test", 7), box("One"), box("Arrows"), box("Test")], [1], [[0,3,Arrow.Right,2]]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}