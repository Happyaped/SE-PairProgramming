// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

// AssemblyScript 入口文件

export function greedy_snake_move(snake: Int32Array, food: Int32Array): i32 {
  const boardSize: i32 = 8;
  const headX: i32 = snake[0], headY: i32 = snake[1];
  const foodX: i32 = food[0], foodY: i32 = food[1];

  // 记录蛇的身体坐标，避免撞到自己
  let snakeBody = new Set<i32>();
  for (let i = 2; i < 8; i += 2) {
      snakeBody.add(snake[i] * boardSize + snake[i + 1]);
  }

  // 方向定义 (上、左、下、右)
  const moves = [
      [0, -1],  // 0: 上 (y - 1)
      [-1, 0],  // 1: 左 (x - 1)
      [0, 1],   // 2: 下 (y + 1)
      [1, 0]    // 3: 右 (x + 1)
  ];

  // 贪心策略：优先朝向果子的方向移动
  let preferredDirections: i32[] = [];
  if (foodX > headX) preferredDirections.push(3); // 右
  if (foodX < headX) preferredDirections.push(1); // 左
  if (foodY > headY) preferredDirections.push(2); // 下
  if (foodY < headY) preferredDirections.push(0); // 上

  // 选择一个合法的方向
  for (let i = 0; i < preferredDirections.length; i++) {
      let dir = preferredDirections[i];
      let newX = headX + moves[dir][0];
      let newY = headY + moves[dir][1];

      // 确保不会撞墙或撞自己
      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize &&
          !snakeBody.has(newX * boardSize + newY)) {
          return dir;
      }
  }

  // 如果贪心方向都无效，尝试任何可行的方向
  for (let dir: i32 = 0; dir < 4; dir++) {
      let newX = headX + moves[dir][0];
      let newY = headY + moves[dir][1];
      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize &&
          !snakeBody.has(newX * boardSize + newY)) {
          return dir;
      }
  }

  // 没有可行的方向（理论上不会发生）
  return 0;
}

