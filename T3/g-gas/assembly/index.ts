// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function greedy_snake_step(
    n: i32,
    snake: Int32Array,
    snake_num: number,
    other_snakes: Int32Array,
    food_num: number,
    foods: Int32Array,
    round: number
  ): number {
    //console.log(`snake: ${snake_num} foods: ${food_num} round: ${round}`);
    const directions = [
      [0, 1],  // 上 (y)
      [-1, 0], // 左 (-x)
      [0, -1], // 下 (-y)
      [1, 0]   // 右 (x)
    ];
    // if (snake_num == 0) {
    //   return greedy_snake_move(snake,foods,n); // 没有身体，默认向上
    // }
    function isOccupied(x: number, y: number, snake: Int32Array, other_snakes: Int32Array, n: number): boolean {
      if (x <= 0 || x > n || y <= 0 || y > n) return true; // 边界检查
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
    const directions = [
    [0, 1],  // 上
    [-1, 0], // 左
    [0, -1], // 下
    [1, 0]   // 右
     ];
    for (let i = 0; i < other_snakes.length; i += 8) {
    const headX = other_snakes[i];
    const headY = other_snakes[i + 1];
    for (let dir = 0; dir < 4; dir++) {
      const newX = headX + directions[dir][0];
      const newY = headY + directions[dir][1];
      if (newX === x && newY === y) return true; // 预判其他蛇头可能的移动方向
    }
    }
      
      return false;
    };
    
    function isOccupied1(x: number, y: number,snake:Int32Array,other_snakes:Int32Array,n:number): boolean{
        if (x <= 0 || x > n || y <= 0 || y > n) return true; // 边界检查
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
    //   const directions = [
    //   [0, 1],  // 上
    //   [-1, 0], // 左
    //   [0, -1], // 下
    //   [1, 0]   // 右
    //    ];
    //   for (let i = 0; i < other_snakes.length; i += 8) {
    //   const headX = other_snakes[i];
    //   const headY = other_snakes[i + 1];
    //   for (let dir = 0; dir < 4; dir++) {
    //     const newX = headX + directions[dir][0];
    //     const newY = headY + directions[dir][1];
    //     if (newX === x && newY === y) return true; // 预判其他蛇头可能的移动方向
    //   }
    //   }
        
        return false;
      };
    
    let bestMove = -1;
    let minDistance = Infinity;
    let hasMinDistance = false;
    let markMinDistance = Infinity;
    //console.log(`snake: ${snake_num} foods: ${food_num} round: ${round}`);
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
        if (currentSnakeDistance < otherMinDistance && markMinDistance > currentSnakeDistance) {
            markMinDistance = currentSnakeDistance;
            hasMinDistance = true;
            minDistance = Infinity; // 重置最小距离
            
            for (let i = 0; i < 4; i++) {
                const dx = directions[i][0];
                const dy = directions[i][1];
                const newX = headX + dx;
                const newY = headY + dy;

                if (!isOccupied(newX, newY, snake, other_snakes, n)) {
                    //console.log(`newX: ${newX} newY: ${newY} fx: ${fx} fy: ${fy}`);
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
        //console.log(`bestMove: ${bestMove} round: ${round} !`);
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
      
      if (!isOccupied1(newX, newY,snake,other_snakes,n)) {
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
    //console.log(`bestMove: ${bestMove} round: ${round}`);
    return bestMove !== -1 ? bestMove : 0; // 若无可行步，则默认向上
  } 

  export function greedy_snake_move(snake: Int32Array, food: Int32Array,size:i32): i32 {
  
    const boardSize: number = size;
    const headX: i32 = snake[0], headY: i32 = snake[1];
    const foodX: i32 = food[0], foodY: i32 = food[1];
  
    //console.log(`Snake Coordinates: ${snake}`);
    //console.log(`Food Coordinates: ${food}`);
  
    // 记录蛇的身体坐标，避免撞到自己
    let snakeBody = new Set<i32>();
    for (let i = 2; i < 6; i += 2) {
      snakeBody.add(<i32>(snake[i] * boardSize + snake[i + 1]));
    }
  
    // 方向定义 (上、左、下、右)
    const moves = [
        [0, 1],  // 0: 上 (y - 1)
        [-1, 0],  // 1: 左 (x - 1)
        [0, -1],   // 2: 下 (y + 1)
        [1, 0]    // 3: 右 (x + 1)
    ];
  
    // 贪心策略：优先朝向果子的方向移动
    let preferredDirections: i32[] = [];
    if (foodX > headX) preferredDirections.push(3); // 右
    if (foodX < headX) preferredDirections.push(1); // 左
    if (foodY > headY) preferredDirections.push(0); // 上
    if (foodY < headY) preferredDirections.push(2); // 下
    //console.log(`Snake1 Coordinates: ${headX}, ${headY}`);
    //console.log(`Food1 Coordinates: ${foodX}, ${foodY}`);
  
    // 选择一个合法的方向
    for (let i = 0; i < preferredDirections.length; i++) {
        let dir = preferredDirections[i];
        let newX = headX + moves[dir][0];
        let newY = headY + moves[dir][1];
        //console.log(`New Snake Coordinates: ${newX}, ${newY}`);
        
        // 确保不会撞墙或撞自己
        if (newX >= 1 && newX <= boardSize && newY >= 1 && newY <= boardSize &&
          !snakeBody.has(<i32>(newX * boardSize + newY))) {
            //console.log(`Choosing direction: ${dir}`);  // 输出方向
            return dir;
        }
    }
  
    // 如果贪心方向都无效，尝试任何可行的方向
    for (let dir: i32 = 0; dir < 4; dir++) {
        let newX = headX + moves[dir][0];
        let newY = headY + moves[dir][1];
        if (newX >= 1 && newX <= boardSize && newY >= 1 && newY <= boardSize &&
          !snakeBody.has(<i32>(newX * boardSize + newY))) {
            //console.log(`!Choosing direction: ${dir}`);  // 输出方向
            return dir;
        }
    }
  
    // 没有可行的方向（理论上不会发生）
    //console.log('No valid direction, defaulting to 0');
    return 0;
  }