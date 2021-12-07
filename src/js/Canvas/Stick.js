// Description alogrithme pour les lignes

// Une ligne fait une longueur x
// La se déplace sur un arc de cercle en x et y
// la longueur si elle se définit en 0.3
// le y et le x doivent toujours arriver à la même somme

// Heading

const stick = (ctx, datas, width, height) => {
  for (let i = 0; i < datas.length; i++) {
    if (i == 0) {
      ctx.moveTo(0.5 * width, 0.5 * height);
      ctx.lineTo(datas[i].position.x * width, datas[i].position.y * height);
    } else {
      ctx.moveTo(
        datas[i - 1].position.x * width,
        datas[i - 1].position.y * height
      );
      ctx.lineTo(datas[i].position.x * width, datas[i].position.y * height);
    }
  }
};

export default stick;
