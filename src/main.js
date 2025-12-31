const patterns = {
	none: []
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fps = document.getElementById("fps");
const size = document.getElementById("size");
const apply = document.getElementById("apply");
const pattern = document.getElementById("pattern");

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const clearButton = document.getElementById("clear");

const genInfo = document.getElementById("gen-n");
const timeInfo = document.getElementById("time-n");

let grid = [];
let rows = 0;
let cols = 0;
const cellSize = 20;
let generation = 0;
let isRunning = false;
let intervalId = null;
let elapsedTime = 0;

function initGrid()
{
	rows = Math.floor(canvas.height / cellSize);
	cols = Math.floor(canvas.width / cellSize);
	
	grid = [];
	for (let i = 0; i < rows;i++)
	{
		grid[i] = [];
		for (let j = 0; j < cols; j++)
			grid[i][j] = 0;
	}
	
	generation = 0;
	elapsedTime = 0;
	updateInfo();
}

function drawGrid()
{
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = '#000000';
	for (let i = 0; i < rows; i++) 
	{
		for (let j = 0; j < cols; j++) 
		{
			if (grid[i][j] === 1)
				ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
		}
	}

	ctx.strokeStyle = '#000000ff';
	ctx.lineWidth = 0.5;

	for (let j = 0; j <= cols; j++) 
	{
		ctx.beginPath();
		ctx.moveTo(j * cellSize, 0);
		ctx.lineTo(j * cellSize, canvas.height);
		ctx.stroke();
	}

	for (let i = 0; i <= rows; i++) 
	{
		ctx.beginPath();
		ctx.moveTo(0, i * cellSize);
		ctx.lineTo(canvas.width, i * cellSize);
		ctx.stroke();
	}
}

function updateInfo()
{
	genInfo.innerText = generation;
	timeInfo.innerText = elapsedTime.toFixed("2");
}

canvas.addEventListener('click', (e) =>{
	if (isRunning)
		return;

	const rect = canvas.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	const col = Math.floor(x / cellSize);
	const row = Math.floor(y / cellSize);

	if (row >= 0 && row < rows && col >=0 && col < cols)
	{
		grid[row][col] = (grid[row][col] == 1) ? 0 : 1;
		drawGrid();
	}
});

canvas.addEventListener('contextmenu', (e) =>{
	e.preventDefault();
});

function countNeighbords(r, c)
{
	let total = 0;

	for (let i = -1; i <= 1; i++)
	{
		for (let j = -1; j <= 1; j++)
		{
			if (!(i == 0 && j == 0))
			{
				let newRow = r + i;
				let newCol = c + j;

				//console.log(`row: ${newRow} col: ${newCol} ESTADO: ${grid[newRow][newCol]}`);
				if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols)
					total += grid[newRow][newCol];
			}
		}
	}

	return total;
}
initGrid();
drawGrid();