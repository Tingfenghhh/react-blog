// 随机生成渐变色（冷色调或暖色调）
function getRandomWarmGradient(warm: boolean) {
  function getRandomWarmColor() {
    const red = !warm ? 135 : Math.floor(Math.random() * 10 + 242);
    const green = Math.floor(Math.random() * 100 + 100);
    const blue = !warm ? Math.floor(Math.random() + 160 + 50) : 107;

    return `rgb(${red}, ${green}, ${blue})`;
  }
  const color1 = getRandomWarmColor();
  const color2 = getRandomWarmColor();

  return `linear-gradient(120deg, ${color1} 0%, ${color2} 100%)`;
}

export { getRandomWarmGradient };
