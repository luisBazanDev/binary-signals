import Draw from "./draw.js";

const input = document.getElementById("binary");
const select = document.getElementById("start_on");

let START_DOWN = select.value === "true" ? true : false;

const CodeTypes = {
  normal: "normal",
  nrzL: "nrz-l",
  nrzI: "nrz-i",
  manchester: "manchester",
  differentialManchester: "differential-manchester",
};

function checkInput() {
  const value = input.value.split(" ").join("");
  const regex = /^[01]+$/;

  if (value.length === 0) {
    alert("Please enter a binary string.");
    return false;
  }

  if (!regex.test(value)) {
    alert("Please enter a valid binary string (only 0s and 1s).");
    return false;
  }

  return true;
}

/**
 * @param {string} value
 */
function drawNormal(value) {
  const canvas = document.getElementById("normal");
  const size = value.length;
  const cellWidth = 60;
  const cellHeight = 100;

  canvas.width = cellWidth * size;
  canvas.height = cellHeight;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, cellWidth * size, cellHeight);

  let lastDown = value[0] === "1" ? false : true;

  for (let i = 0; i < size; i++) {
    const x = i * cellWidth;
    const y = 0;

    Draw.drawCellBorder(context, x, y, cellWidth, cellHeight, "ALL");

    const nowValue = value[i];

    if ((nowValue === "1" && lastDown) || (nowValue === "0" && !lastDown)) {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "LEFT", "RED");
    }

    if (nowValue === "1") {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "TOP", "BLUE");
    } else {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "BOTTOM", "BLUE");
    }

    lastDown = nowValue === "1" ? false : true;
  }
}

/**
 * @param {string} value
 */
function drawNrzL(value) {
  const canvas = document.getElementById("nrz-l");
  const size = value.length;
  const cellWidth = 60;
  const cellHeight = 100;

  canvas.width = cellWidth * size;
  canvas.height = cellHeight;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, cellWidth * size, cellHeight);

  let lastDown = value[0] === "1" ? true : false;

  for (let i = 0; i < size; i++) {
    const x = i * cellWidth;
    const y = 0;

    Draw.drawCellBorder(context, x, y, cellWidth, cellHeight, "ALL");

    const nowValue = value[i];

    if ((nowValue === "1" && !lastDown) || (nowValue === "0" && lastDown)) {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "LEFT", "RED");
    }

    if (nowValue === "0") {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "TOP", "BLUE");
    } else {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "BOTTOM", "BLUE");
    }

    lastDown = nowValue === "1" ? true : false;
  }
}

/**
 * @param {string} value
 */
function drawNrzI(value) {
  const canvas = document.getElementById("nrz-i");
  const size = value.length;
  const cellWidth = 60;
  const cellHeight = 100;
  const startWidth = cellWidth / 2;

  canvas.width = cellWidth * size + startWidth;
  canvas.height = cellHeight;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, cellWidth * size + startWidth, cellHeight);

  if (START_DOWN)
    Draw.drawLine(context, 0, 0, startWidth, cellHeight, "BOTTOM", "BLUE");
  else Draw.drawLine(context, 0, 0, startWidth, cellHeight, "TOP", "BLUE");

  let down = START_DOWN;

  for (let i = 0; i < size; i++) {
    const x = i * cellWidth + startWidth;
    const y = 0;

    Draw.drawCellBorder(context, x, y, cellWidth, cellHeight, "ALL");

    const nowValue = value[i];

    if (nowValue === "1") {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "LEFT", "RED");
      down = !down;
    }

    if (down) {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "BOTTOM", "BLUE");
    } else {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "TOP", "BLUE");
    }
  }
}

/**
 * @param {string} value
 */
function drawManchester(value) {
  const canvas = document.getElementById("manchester");
  const size = value.length;
  const cellWidth = 60;
  const cellHeight = 100;

  canvas.width = cellWidth * size;
  canvas.height = cellHeight;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, cellWidth * size, cellHeight);

  let lastValue = value[0] === "1" ? "0" : "1";

  for (let i = 0; i < size; i++) {
    const x = i * cellWidth;
    const y = 0;

    Draw.drawCellBorder(context, x, y, cellWidth, cellHeight, "ALL");

    const nowValue = value[i];

    if (lastValue === nowValue) {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "LEFT", "RED");
    }

    if (nowValue === "1") {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "MIDDLE", "RED");
      Draw.drawLine(context, x, y, cellWidth / 2, cellHeight, "BOTTOM", "BLUE");
      Draw.drawLine(
        context,
        x + cellWidth / 2,
        y,
        cellWidth / 2,
        cellHeight,
        "TOP",
        "BLUE"
      );
    } else {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "MIDDLE", "RED");
      Draw.drawLine(context, x, y, cellWidth / 2, cellHeight, "TOP", "BLUE");
      Draw.drawLine(
        context,
        x + cellWidth / 2,
        y,
        cellWidth / 2,
        cellHeight,
        "BOTTOM",
        "BLUE"
      );
    }

    lastValue = nowValue;
  }
}

/**
 * @param {string} value
 */
function differentialManchester(value) {
  const canvas = document.getElementById("differential-manchester");
  const size = value.length;
  const cellWidth = 60;
  const cellHeight = 100;
  const startWidth = cellWidth / 2;

  canvas.width = cellWidth * size + startWidth;
  canvas.height = cellHeight + startWidth;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, cellWidth * size, cellHeight);

  if (START_DOWN)
    Draw.drawLine(context, 0, 0, startWidth, cellHeight, "BOTTOM", "BLUE");
  else Draw.drawLine(context, 0, 0, startWidth, cellHeight, "TOP", "BLUE");

  let isDown = START_DOWN;

  for (let i = 0; i < size; i++) {
    const x = i * cellWidth + startWidth;
    const y = 0;

    Draw.drawCellBorder(context, x, y, cellWidth, cellHeight, "ALL");

    const nowValue = value[i];

    if (nowValue === "0") {
      Draw.drawLine(context, x, y, cellWidth, cellHeight, "LEFT", "RED");
      if (isDown) {
        Draw.drawLine(context, x, y, cellWidth / 2, cellHeight, "TOP", "BLUE");
        Draw.drawLine(context, x, y, cellWidth, cellHeight, "MIDDLE", "RED");
        Draw.drawLine(
          context,
          x + cellWidth / 2,
          y,
          cellWidth / 2,
          cellHeight,
          "BOTTOM",
          "BLUE"
        );
      } else {
        Draw.drawLine(
          context,
          x,
          y,
          cellWidth / 2,
          cellHeight,
          "BOTTOM",
          "BLUE"
        );
        Draw.drawLine(context, x, y, cellWidth, cellHeight, "MIDDLE", "RED");
        Draw.drawLine(
          context,
          x + cellWidth / 2,
          y,
          cellWidth / 2,
          cellHeight,
          "TOP",
          "BLUE"
        );
      }
    } else {
      if (isDown) {
        Draw.drawLine(
          context,
          x,
          y,
          cellWidth / 2,
          cellHeight,
          "BOTTOM",
          "BLUE"
        );
        Draw.drawLine(context, x, y, cellWidth, cellHeight, "MIDDLE", "RED");
        Draw.drawLine(
          context,
          x + cellWidth / 2,
          y,
          cellWidth / 2,
          cellHeight,
          "TOP",
          "BLUE"
        );
      } else {
        Draw.drawLine(context, x, y, cellWidth / 2, cellHeight, "TOP", "BLUE");
        Draw.drawLine(context, x, y, cellWidth, cellHeight, "MIDDLE", "RED");
        Draw.drawLine(
          context,
          x + cellWidth / 2,
          y,
          cellWidth / 2,
          cellHeight,
          "BOTTOM",
          "BLUE"
        );
      }
      isDown = !isDown;
    }
  }
}

function drawMain() {
  if (!checkInput()) return;

  const value = input.value.split(" ").join("");

  drawNormal(value);
  drawNrzL(value);
  drawNrzI(value);
  drawManchester(value);
  differentialManchester(value);
}

// Listeners
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (checkInput()) drawMain();
  }
});

select.addEventListener("change", (event) => {
  START_DOWN = event.target.value === "true" ? true : false;
});

if (checkInput()) drawMain();

function download(canva_id) {
  const canvas = document.getElementById(canva_id);
  const link = document.createElement("a");
  link.download = `${canva_id}.png`;
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
  link.delete();
  link.remove();
}

document.getElementById("download-normal").addEventListener("click", () => {
  download("normal");
});

document.getElementById("download-nrz-l").addEventListener("click", () => {
  download("nrz-l");
});

document.getElementById("download-nrz-i").addEventListener("click", () => {
  download("nrz-i");
});

document.getElementById("download-manchester").addEventListener("click", () => {
  download("manchester");
});

document
  .getElementById("download-differential-manchester")
  .addEventListener("click", () => {
    download("differential-manchester");
  });
