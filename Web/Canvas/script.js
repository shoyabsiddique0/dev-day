window.addEventListener("load", () => {
  const canvas = document.getElementById("drawing-canvas");
  const ctx = canvas.getContext("2d");
  const clearCanvasBtn = document.getElementById("clear-canvas");
  const brushSizeInput = document.getElementById("brush-size");
  const brushColorInput = document.getElementById("brush-color");

  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 150;

  let brushSize = brushSizeInput.value;
  let brushColor = brushColorInput.value;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function draw(e) {
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", () => (isDrawing = false));
  canvas.addEventListener("mouseout", () => (isDrawing = false));

  brushSizeInput.addEventListener("input", () => {
    brushSize = brushSizeInput.value;
  });

  brushColorInput.addEventListener("input", () => {
    brushColor = brushColorInput.value;
  });

  clearCanvasBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
});
