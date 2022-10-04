let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;

let rightCharInput		: HTMLInputElement | null;
let wrongCharInput		: HTMLInputElement | null;
let horizontalLengthInput	: HTMLInputElement | null;
let verticalLengthInput		: HTMLInputElement | null;

let errMsgBox: HTMLElement | null;
let generateButton: HTMLButtonElement | null;

onload = () => {
	canvas = document.querySelector<HTMLCanvasElement>("#c");
	if(canvas != null){
		ctx = canvas.getContext("2d");
	}
	rightCharInput		= document.querySelector<HTMLInputElement>("#right");
	wrongCharInput		= document.querySelector<HTMLInputElement>("#wrong");
	horizontalLengthInput	= document.querySelector<HTMLInputElement>("#horizontal");
	verticalLengthInput		= document.querySelector<HTMLInputElement>("#vertical");
	
	errMsgBox = document.querySelector<HTMLElement>("#errMsgBox");
	generateButton = document.querySelector<HTMLButtonElement>("#generate");
	if(generateButton) generateButton.onclick = generate;

	initCanvas();
};
function initCanvas(){
	if(!ctx) return;
	ctx.fillStyle = "#f0f0f0";
	ctx.fillRect(0,0,9999,9999);

	ctx.fillStyle = "#000000";
	const FONT_FAMILY = "'Avenir','Helvetica Neue','Helvetica','Arial','Hiragino Sans','ヒラギノ角ゴシック',YuGothic,'Yu Gothic','メイリオ', Meiryo,'ＭＳ Ｐゴシック','MS PGothic',monospace";
	ctx.font = "16px " + FONT_FAMILY;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	
	ctx.fillText("項目を入力して「生成！」をクリック！",320 / 2,180 / 2);
	ctx.textAlign = "start";
	ctx.textBaseline = "top";
}

function generate(){
	deleteErrorMsg();
	if(!(rightCharInput && wrongCharInput && horizontalLengthInput && verticalLengthInput))
		return;
	const rightChar = rightCharInput.value;
	const wrongChar = wrongCharInput.value;
	const horizontalLength	= parseInt(horizontalLengthInput.value);
	const verticalLength	= parseInt(verticalLengthInput.value);

	if(!(rightChar && wrongChar && horizontalLength && verticalLength)){
		showErrorMsg("入力されていない項目があります：<br>" +
					(!rightChar ? "・正しい文字　<br>" : "") +
					(!wrongChar ? "・間違い文字　<br>" : "") +
					(!horizontalLength ? "・サイズ（横）<br>" : "") +
					(!verticalLength ? "・サイズ（縦）<br>" : "")
		);
		return;
	}
	
	const text = makeText(rightChar,wrongChar,horizontalLength,verticalLength);
	resizeCanvas(text);
	drawTextToCanvas(text);
}
function makeText(right: string,wrong: string,h: number,v: number){
	const wrongCharPlaceX = Math.floor(Math.random() * h);
	const wrongCharPlaceY = Math.floor(Math.random() * v);
	let resultTexts = [];
	for(let i = 0;i < v;i++){
		let line = "";
		for(let j = 0;j < h;j++){
			const isWrongPlace = 
				(j === wrongCharPlaceX && i === wrongCharPlaceY);
			line += isWrongPlace ? wrong : right;
		}
		resultTexts.push(line);
	}
	
	return resultTexts;
}
function resizeCanvas(text: string[]){
	if(!canvas || !ctx) return;

	ctx.fillStyle = "#000000";
	const FONT_FAMILY = "'Avenir','Helvetica Neue','Helvetica','Arial','Hiragino Sans','ヒラギノ角ゴシック',YuGothic,'Yu Gothic','メイリオ', Meiryo,'ＭＳ Ｐゴシック','MS PGothic',monospace";
	ctx.font = "16px " + FONT_FAMILY;
	ctx.textAlign = "start";
	ctx.textBaseline = "top";

	let metrics = ctx.measureText(text[0]);
	canvas.width = Math.floor(metrics.width) + 1;
	canvas.height = 16 * text.length;
}

function drawTextToCanvas(text: string[]){
	if(!canvas || !ctx) return;

	ctx.fillStyle = "#000000";
	const FONT_FAMILY = "'Avenir','Helvetica Neue','Helvetica','Arial','Hiragino Sans','ヒラギノ角ゴシック',YuGothic,'Yu Gothic','メイリオ', Meiryo,'ＭＳ Ｐゴシック','MS PGothic',monospace";
	ctx.font = "16px " + FONT_FAMILY;
	ctx.textAlign = "start";
	ctx.textBaseline = "top";

	for(const [i,line] of text.entries()){
		ctx.fillText(line,0,i * 16);
	}
}

function showErrorMsg(message: string){
	if(!errMsgBox){
		alert(message);
		return
	}
	errMsgBox.innerHTML = message;
}

function deleteErrorMsg(){
	if(!errMsgBox){
		return
	}
	errMsgBox.innerHTML = "";
}