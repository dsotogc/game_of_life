const patterns = {
	none: [],
	glider: [
		[0,0,1],
		[1,0,1],
		[0,1,1]
	],
	blinker: [
		[1,1,1]
	],
	aforall: [
		[0,0,0,0,1,1,0,0,0,0],
		[0,0,0,1,0,0,1,0,0,0],
		[0,0,0,1,1,1,1,0,0,0],
		[0,1,0,1,0,0,1,0,1,0],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[0,1,0,1,0,0,1,0,1,0],
		[0,0,0,1,1,1,1,0,0,0],
		[0,0,0,1,0,0,1,0,0,0],
		[0,0,0,0,1,1,0,0,0,0]
	],
	light_spcs: [
		[0,1,1,1,1],
		[1,0,0,0,1],
		[0,0,0,0,1],
		[1,0,0,1,0]
	],
	beacon: [
		[1,1,0,0],
		[1,1,0,0],
		[0,0,1,1],
		[0,0,1,1]
	],
	toad: [
		[0,0,1,0],
		[1,0,0,1],
		[1,0,0,1],
		[0,1,0,0]
	]
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

function insertPattern(r, c, pat)
{
	let p_heigth = pat.length;
	let p_width = pat[0].length;

	let auxr = Math.floor(p_heigth / 2);
	let auxc = Math.floor(p_width / 2);

	for (let i = 0; i < p_heigth; i++)
	{
		for (let j = 0; j < p_width; j++)
		{
			let p_row = r - auxr + i;
			let p_col = c - auxc + j;

			if (p_row >= 0 && p_row < rows && p_col >= 0 && p_col < cols)
				grid[p_row][p_col] = pat[i][j];
		}
	}
}

canvas.addEventListener('contextmenu', (e) =>{
	e.preventDefault();

	if (isRunning)
		return;

	let selectedPattern = pattern.value;

	if (selectedPattern == 'none' || !(patterns[selectedPattern]))
		return;

	let rect = canvas.getBoundingClientRect();
	let x = e.clientX - rect.left;
	let y = e.clientY - rect.top;
	let col = Math.floor(x / cellSize);
	let row = Math.floor(y / cellSize);

	insertPattern(row, col, patterns[selectedPattern]);
	drawGrid();
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

function nextGen()
{
	let newGrid = [];

	for (let i = 0; i < rows; i++)
	{
		newGrid[i] = [];
		for (let j = 0; j < cols; j++)
			newGrid[i][j] = 0;
	}

	for (let x = 0; x < rows; x++)
	{
		for (let y = 0; y < cols; y++)
		{
			let currentCel = grid[x][y];
			let neighbords = countNeighbords(x, y);

			if (currentCel == 0)
			{
				if (neighbords == 3)
					newGrid[x][y] = 1;
			}
			else
			{
				if (neighbords == 2 || neighbords == 3)
					newGrid[x][y] = 1;
			}
		}

	}
	grid = newGrid;
	generation++;
	updateInfo();
	drawGrid();
}

startButton.addEventListener('click', () =>{
	if (isRunning)
		return;

	isRunning = true;
	let intervalo = 1000 / parseInt(fps.value);
	console.log(intervalo);
	let startTime = Date.now() - (elapsedTime * 1000);

	intervalId = setInterval(() => {
		nextGen();
		elapsedTime = (Date.now() - startTime) / 1000;
		updateInfo();
	}, intervalo);

	startButton.disabled = true;
	apply.disabled = true;
});

stopButton.addEventListener('click', () =>{
	if (!isRunning)
		return;

	isRunning = false;
	clearInterval(intervalId);
	intervalId = null;

	startButton.disabled = false;
	apply.disabled = false;
});

clearButton.addEventListener('click', () =>{
	if (isRunning)
	{
		isRunning = false;
		clearInterval(intervalId);
		intervalId = null;
	}

	initGrid();
	drawGrid();

	startButton.disabled = false;
	apply.disabled = false;
});

apply.addEventListener('click', ()=>{
	if (isRunning)
	{
		alert("Detenga el juego para cambiar la configuración");
		return;
	}

	let newSize = size.value.split('x');
	let newW = parseInt(newSize[0]);
	let newH = parseInt(newSize[1]);

	let newFps = parseInt(fps.value);
	if (newFps < 1 || newFps > 30)
	{
		alert("FPS debe estar entre 1 y 30");
		fps.value = Math.max(1, Math.min(30, newFps));
		return;
	}

	canvas.width = newW;
	canvas.height = newH;

	initGrid();
	drawGrid();
});

fps.addEventListener('input', () =>{
    let value = parseInt(fps.value);
    if (value < 1) fps.value = 1;
    if (value > 30) fps.value = 30;
});

/*
document.addEventListener('keypress', (e) =>{
	if (e.key == ' ') 
		nextGen();
});
*/

initGrid();
drawGrid();
