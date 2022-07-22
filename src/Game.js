import { useState } from "react";

const Game = () => {
    return (
        <Board/>
    );
}

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i) => {
        const clonedSquares = squares.slice();

        if(!clonedSquares[i]){
            clonedSquares[i] = xIsNext ? "X" : "O"; 
            setXIsNext(!xIsNext);
            setSquares(clonedSquares);
            checkWinner(clonedSquares);
        }
    }

    const renderSquare = (i) => {
        return <Square gameOver={checkWinner(squares)} value={squares[i]} setMove={() => handleClick(i)}/>;
    }

    const checkWinner = (squares) => {
        let combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(let i = 0; i < combos.length; i++){
            const [a, b, c] = combos[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return !!squares[a];
                // let winner = document.createElement("h1");
            }
        }    
    }

    return (
        <div id="board">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
            <button id="clear" onClick={() => {setSquares(Array(9).fill(""))}}>Clear</button>
        </div>
    );
}

const Square = (props) => {
    const [move, setMove] = useState("X");

    return (
        <button disabled={props.gameOver} onClick={props.setMove}>{props.value}</button>
    );
}

export default Game;
