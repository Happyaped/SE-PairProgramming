// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function greedy_snake_step(
    n: number,
    snake: Int32Array,
    snake_num: number,
    other_snakes: Int32Array,
    food_num: number,
    foods: Int32Array,
    round: number
  ): number {
    
    const directions = [
      [0, 1],  // 上 (y)
      [-1, 0], // 左 (-x)
      [0, -1], // 下 (-y)
      [1, 0]   // 右 (x)
    ];
    
    const isOccupied = (x: number, y: number,snake:Int32Array,other_snakes:Int32Array,n:number): boolean => {
      if (x < 0 || x >= n || y < 0 || y >= n) return true; // 边界检查
      for (let i = 0; i < snake.length - 2; i += 2) {
        const sx = snake[i];
        const sy = snake[i + 1];
        if (sx === x && sy === y) return true; // 自己的身体
      }
      for (let i = 0; i < other_snakes.length; i += 2) {
        const ox = other_snakes[i];
        const oy = other_snakes[i + 1];
        if (ox === x && oy === y && ((i+2)%8 !== 0)) return true; // 其他蛇
      }

      //检查是否与其他蛇头可能的移动方向冲突
    // const directions = [
    // [0, 1],  // 上
    // [-1, 0], // 左
    // [0, -1], // 下
    // [1, 0]   // 右
    //  ];
    // for (let i = 0; i < other_snakes.length; i += 8) {
    // const headX = other_snakes[i];
    // const headY = other_snakes[i + 1];
    // for (let dir = 0; dir < 4; dir++) {
    //   const newX = headX + directions[dir][0];
    //   const newY = headY + directions[dir][1];
    //   if (newX === x && newY === y) return true; // 预判其他蛇头可能的移动方向
    // }
    // }
      
      return false;
    };
    
    let bestMove = -1;
    let minDistance = Infinity;
    let hasMinDistance = false;
    // 遍历每个食物，计算当前蛇和其他蛇到该食物的距离
    for (let j = 0; j < food_num; j++) {
        const fx = foods[j * 2];
        const fy = foods[j * 2 + 1];

        // 计算当前蛇到该食物的距离
        const headX = snake[0];
        const headY = snake[1];
        const currentSnakeDistance = Math.abs(headX - fx) + Math.abs(headY - fy);

        // 计算其他蛇到该食物的最短距离
        let otherMinDistance = Infinity;
        for (let i = 0; i < snake_num; i++) {
            const otherHeadX = other_snakes[i * 8];
            const otherHeadY = other_snakes[i * 8 + 1];
            const otherDistance = Math.abs(otherHeadX - fx) + Math.abs(otherHeadY - fy);
            if (otherDistance < otherMinDistance) {
                otherMinDistance = otherDistance;
            }
        }

        // 如果当前蛇的距离比其他蛇的最短距离更短，则尝试移动到该食物
        if (currentSnakeDistance < otherMinDistance) {
            hasMinDistance = true;
            for (let i = 0; i < 4; i++) {
                const dx = directions[i][0];
                const dy = directions[i][1];
                const newX = headX + dx;
                const newY = headY + dy;

                if (!isOccupied(newX, newY, snake, other_snakes, n)) {
                    const distance = Math.abs(newX - fx) + Math.abs(newY - fy);
                    if (distance < minDistance) {
                        minDistance = distance;
                        bestMove = i;
                    }
                }
            }
        }
    }
    if (hasMinDistance) {
        // 如果找到一个有效的移动方向，直接返回
        return bestMove !== -1 ? bestMove : 0;
    }
    bestMove = -1;
    minDistance = Infinity;
    for (let i = 0; i < 4; i++) {
      //const [dx, dy] = directions[i];
      const dx = directions[i][0];
      const dy = directions[i][1];
      //const [headX, headY] = snake[0];
      const headX = snake[0];
      const headY = snake[1];
      const newX = headX + dx;
      const newY = headY + dy;
      
      if (!isOccupied(newX, newY,snake,other_snakes,n)) {
        for (let j = 0; j < foods.length; j += 2) {
          const fx = foods[j];
          const fy = foods[j + 1];
          const distance = Math.abs(newX - fx) + Math.abs(newY - fy);
          if (distance < minDistance) {
            minDistance = distance;
            bestMove = i;
          }
        }
      }
    }
    //return 0;
    console.log(`bestMove: ${bestMove}`);
    return bestMove !== -1 ? bestMove : 0; // 若无可行步，则默认向上
  } 