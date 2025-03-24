// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

let pathIndex = -1;
let finalpath: Int32Array = new Int32Array(0);
export function greedySnakeMoveBarriers(snake: Int32Array, food: Int32Array, obstacles: Int32Array): i32 {
    const boardSize: i32 = 8;
    const headX: i32 = snake[0], headY: i32 = snake[1];
    const foodX: i32 = food[0], foodY: i32 = food[1];

    // console.log(`Snake Coordinates: ${snake}`);
    // console.log(`Food Coordinates: ${food}`);
    // console.log(`Obstacle Coordinates: ${obstacles}`);

    // 记录蛇的身体
    let snakeBody = new Map<i32, bool>();
    for (let i = 2; i < 6; i += 2) {
        snakeBody.set(snake[i] * boardSize + snake[i + 1], true);
    }

    // 记录障碍物
    let obstaclesSet = new Map<i32, bool>();
    for (let i = 0; i < obstacles.length; i += 2) {
        obstaclesSet.set(obstacles[i] * boardSize + obstacles[i + 1], true);
    }

    // 方向定义 (上、左、下、右)
    const moves = [
        [0, 1],   // 0: 上 (y - 1)
        [-1, 0],  // 1: 左 (x - 1)
        [0, -1],  // 2: 下 (y + 1)
        [1, 0]    // 3: 右 (x + 1)
    ];

    // DFS 搜索路径
    function dfs(startX: i32, startY: i32, foodX: i32, foodY: i32, obstaclesSet: Map<i32,bool>, snakeBody: Map<i32,bool>): Int32Array {
        const moves = [
            [0, 1],   // 0: 上 (y - 1)
            [-1, 0],  // 1: 左 (x - 1)
            [0, -1],  // 2: 下 (y + 1)
            [1, 0]    // 3: 右 (x + 1)
        ];
        let stack = new Array<i32>(); // 模拟栈
        let visited = new Map<i32, i32>(); // 记录访问的节点，值存储上一步方向
        stack.push(startX * boardSize + startY);
        visited.set(startX * boardSize + startY, -1);

        while (stack.length > 0) {
            let current = stack.pop();
            let currentX: i32 = current / boardSize;
            let currentY: i32 = current % boardSize;

            if (currentX == foodX && currentY == foodY) {
                // 找到果子，回溯获取完整路径
                let path = new Array<i32>();
                let traceX = foodX, traceY = foodY;
                while (visited.get(traceX * boardSize + traceY) != -1) {
                    let moveDir = visited.get(traceX * boardSize + traceY);
                    path.unshift(moveDir);
                    traceX -= moves[moveDir][0];
                    traceY -= moves[moveDir][1];
                }
                let result = new Int32Array(path.length);
                for (let i = 0; i < path.length; i++) {
                    result[i] = path[i];
                }
                return result;
            }

            for (let dir: i32 = 0; dir < 4; dir++) {
                let newX: i32 = currentX + moves[dir][0];
                let newY: i32 = currentY + moves[dir][1];
                let newPos = newX * boardSize + newY;

                if (newX >= 1 && newX <= boardSize && newY >= 1 && newY <= boardSize &&
                    !visited.has(newPos) &&
                    !obstaclesSet.has(newPos) &&
                    !snakeBody.has(newPos)) {
                    visited.set(newPos, dir);
                    stack.push(newPos);
                }
            }
        }

        return new Int32Array(0); // 果子不可达，返回空数组
    }
    if (pathIndex == -1) {
        finalpath = dfs(headX, headY,foodX, foodY,obstaclesSet, snakeBody);
    }
    // let path = dfs(headX, headY,foodX, foodY,obstaclesSet, snakeBody);
    if (finalpath.length == 0) {
        console.log("Food is unreachable due to obstacles.");
        return -1;
    } else if(pathIndex == finalpath.length - 1){
        console.log("Path is finished.");
        return -1;
    }
    else {
        console.log(`Path found: ${finalpath}`);
        pathIndex++;
        if(pathIndex == finalpath.length - 1){
            pathIndex = -1;
            return finalpath[finalpath.length - 1];
        }
        return finalpath[pathIndex];
    }
    
}

