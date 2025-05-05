const colors = {
  RED: "#FF0000",
  BLUE: "#0000FF",
};

export default class Draw {
  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {("ALL"|"LEFT"|"RIGHT"|"TOP"|"BOTTOM"|"MIDDLE")} type
   */
  static drawCellBorder(context, x, y, width, height, type = "ALL") {
    // Dashed lines border
    if (type === "ALL") {
      Draw.drawCellBorder(context, x, y, width, height, "LEFT");
      Draw.drawCellBorder(context, x, y, width, height, "RIGHT");
      Draw.drawCellBorder(context, x, y, width, height, "TOP");
      Draw.drawCellBorder(context, x, y, width, height, "BOTTOM");
      Draw.drawCellBorder(context, x, y, width, height, "MIDDLE");
    }
    // Left border
    if (type === "LEFT") {
      context.beginPath();
      context.strokeStyle = "#E5CCFF";
      context.lineWidth = 2;
      context.setLineDash([5, 5]);
      context.moveTo(x, y);
      context.lineTo(x, y + height);
      context.stroke();
      context.setLineDash([]);
      context.closePath();
    }
    // Right border
    if (type === "RIGHT") {
      context.beginPath();
      context.strokeStyle = "#E5CCFF";
      context.lineWidth = 2;
      context.setLineDash([5, 5]);
      context.moveTo(x + width, y);
      context.lineTo(x + width, y + height);
      context.stroke();
      context.setLineDash([]);
      context.closePath();
    }
    // Top border
    if (type === "TOP") {
      context.beginPath();
      context.strokeStyle = "#E5CCFF";
      context.lineWidth = 2;
      context.setLineDash([5, 5]);
      context.moveTo(x, y);
      context.lineTo(x + width, y);
      context.stroke();
      context.setLineDash([]);
      context.closePath();
    }
    // Bottom border
    if (type === "BOTTOM") {
      context.beginPath();
      context.strokeStyle = "#E5CCFF";
      context.lineWidth = 2;
      context.setLineDash([5, 5]);
      context.moveTo(x, y + height);
      context.lineTo(x + width, y + height);
      context.stroke();
      context.setLineDash([]);
      context.closePath();
    }
    // Middle border
    if (type === "MIDDLE") {
      context.beginPath();
      context.strokeStyle = "#E5CCFF";
      context.lineWidth = 2;
      context.setLineDash([2, 5]);
      context.moveTo(x + width / 2, y);
      context.lineTo(x + width / 2, y + height);
      context.stroke();
      context.setLineDash([]);
      context.closePath();
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {("TOP"|"TOP_MIDDLE"|"BOTTOM"|"BOTTOM_MIDDLE"|"LEFT"|"RIGHT"|"MIDDLE")} type
   * @param {("RED"|"BLUE")} color
   */
  static drawLine(context, x, y, width, height, type, color) {
    // TOP
    if (type === "TOP") {
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = colors[color];
      context.moveTo(x, y);
      context.lineTo(x + width, y);
      context.stroke();
      context.closePath();
    }
    // TOP_MIDDLE
    if (type === "TOP_MIDDLE") {
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = colors[color];
      context.moveTo(x + width / 2, y);
      context.lineTo(x + width / 2, y);
      context.stroke();
      context.closePath();
    }
    // BOTTOM
    if (type === "BOTTOM") {
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = colors[color];
      context.moveTo(x, y + height);
      context.lineTo(x + width, y + height);
      context.stroke();
      context.closePath();
    }
    // BOTTOM_MIDDLE
    if (type === "BOTTOM_MIDDLE") {
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = colors[color];
      context.moveTo(x + width / 2, y + height);
      context.lineTo(x + width / 2, y + height);
      context.stroke();
      context.closePath();
    }
    // LEFT
    if (type === "LEFT") {
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = colors[color];
      context.moveTo(x, y);
      context.lineTo(x, y + height);
      context.stroke();
      context.closePath();
    }
    // RIGHT
    if (type === "RIGHT") {
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = colors[color];
      context.moveTo(x + width, y);
      context.lineTo(x + width, y + height);
      context.stroke();
      context.closePath();
    }
    // MIDDLE
    if (type === "MIDDLE") {
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = colors[color];
      context.moveTo(x + width / 2, y);
      context.lineTo(x + width / 2, y + height);
      context.stroke();
      context.closePath();
    }
  }
}
