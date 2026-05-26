import { box, board, Arrow } from "./boxCode";

let test = board([box("Start", 5, 3), box("Long Word", 7), box("TEST"), box("TEST", 3, 3), box("Final")], [Arrow.Both, Arrow.Left, Arrow.None, Arrow.Right], [[0,2,Arrow.Left,5], [1,3,Arrow.None,1]]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
test = board([box("Start"), box("Playing"), box("Lose"), box("Win")], [Arrow.Left, Arrow.Left, Arrow.None], [[1,3,Arrow.Right,1]]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
console.log(" ");
test = board([box("One"), box("2"), box("Box with Three in it"), box("four")], [Arrow.Left,Arrow.None,Arrow.None], [[0,3,Arrow.Both,1]]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
console.log(" ");
test = board([box("Test"), box("No"), box("Arrows")]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
console.log(" ");
test = board([box("Test"), box("One"), box("Arrows"), box("Test")], [1]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}
console.log(" ");
test = board([box("Test", 7), box("One"), box("Arrows"), box("Test")], [1], [[0,3,Arrow.Right,2]]);
for (let i = 0; i < test.length; i++) {
    console.log(test[i].join(""));
}