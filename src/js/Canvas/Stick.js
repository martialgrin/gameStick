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
