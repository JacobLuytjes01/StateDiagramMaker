# StateDiagramMaker
A program to make simple state diagrams made in Typescript.

Box:
* params
  * text {string} - Text goes in the middle of the box.
  * height {number} - The y-axis length of the box, Must be an odd number.
  * width {number} - The spacing on the left and right of the word.
* returns
  * A 2D string array that contains a box with a word in it.

Board:
* params
  * boxes {string[][][]} - Array of boxes.
  * localBoxConnections {number[]} - Can use Arrow.None, Arrow.Right, Arrow.Left, Arrow.Both
  * farBoxConnections {number[][]} - An array of [From, To, ArrowType, length], ArrowType same as localBoxConnections.
* returns
  * A 2D string array that contains a board of boxes and arrows.

# Some Examples of Output:
```
                 ┌-----------┐
┌-----------┐    |           |
|           |--->|           |    ┌------┐    ┌----------┐    ┌-------┐
|   Start   |    | Long Word |<---| TEST |    |   TEST   |--->| Final |
|           |<---|           |    └------┘    └----------┘    └-------┘
└-----------┘    |           |        |             |
       ^         └-----------┘        |             |
       |                |             |             |
       |                └---------------------------┘
       |                              |
       └------------------------------┘

┌-------┐    ┌---------┐    ┌------┐    ┌-----┐
| Start |<---| Playing |<---| Lose |    | Win |
└-------┘    └---------┘    └------┘    └-----┘
                   |                        ^
                   └------------------------┘
                   
┌-----┐    ┌---┐    ┌----------------------┐    ┌------┐
| One |<---| 2 |    | Box with Three in it |    | four |
└-----┘    └---┘    └----------------------┘    └------┘
    ^                                               ^
    └-----------------------------------------------┘
    
┌------┐    ┌----┐    ┌--------┐
| Test |    | No |    | Arrows |
└------┘    └----┘    └--------┘

┌------┐    ┌-----┐    ┌--------┐    ┌------┐
| Test |--->| One |--->| Arrows |--->| Test |
└------┘    └-----┘    └--------┘    └------┘

┌------┐
|      |
|      |    ┌-----┐    ┌--------┐    ┌------┐
| Test |--->| One |--->| Arrows |--->| Test |
|      |    └-----┘    └--------┘    └------┘
|      |                                 ^
└------┘                                 |
    |                                    |
    |                                    |
    └------------------------------------┘
```
