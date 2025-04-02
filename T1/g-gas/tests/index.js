import assert from "assert";
import { greedy_snake_move } from "../build/debug.js";
// [Write your own "import" for other PLs.]

function greedy_snake_fn_checker (snake, food) {
    let now_snake = [
        snake[0], snake[1], snake[2], snake[3], snake[4], snake[5], snake[6], snake[7]
    ];
    let turn = 1;
    while (true) {
        let result = greedy_snake_move(now_snake, food);
        let new_snake = [
            now_snake[0] + (result == 3) - (result == 1),
            now_snake[1] + (result == 0) - (result == 2),
            now_snake[0],
            now_snake[1],
            now_snake[2],
            now_snake[3],
            now_snake[4],
            now_snake[5],
        ];
        if (new_snake[0] < 1 || new_snake[0] > 8 || new_snake[1] < 1 || new_snake[1] > 8) {
            return -1;
        }
        if (new_snake[0] == new_snake[4] && new_snake[1] == new_snake[5]) {
            return -2;
        }
        if (new_snake[0] == food[0] && new_snake[1] == food[1]) {
            console.log("Total turn: " + turn);
            return turn;
        }
        now_snake = [
            new_snake[0], new_snake[1], new_snake[2], new_snake[3], new_snake[4], new_snake[5], new_snake[6], new_snake[7]
        ];
        if (turn > 200) {
            return -3;
        }
        turn += 1;
    }
}

// 边界条件测试
assert.strictEqual(greedy_snake_fn_checker([1,1,1,2,1,3,1,4], [8,8], greedy_snake_move) >= 0, true);
assert.strictEqual(greedy_snake_fn_checker([8,8,8,7,8,6,8,5], [1,1], greedy_snake_move) >= 0, true);

// 复杂路径测试
assert.strictEqual(greedy_snake_fn_checker([4,4,4,5,5,5,5,4], [6,6], greedy_snake_move) >= 0, true);
assert.strictEqual(greedy_snake_fn_checker([3,3,3,4,4,4,4,3], [5,5], greedy_snake_move) >= 0, true);

// 角落测试
assert.strictEqual(greedy_snake_fn_checker([1,8,1,7,1,6,1,5], [8,1], greedy_snake_move) >= 0, true);
assert.strictEqual(greedy_snake_fn_checker([8,1,8,2,8,3,8,4], [1,8], greedy_snake_move) >= 0, true);

// 中心测试
assert.strictEqual(greedy_snake_fn_checker([4,4,4,3,4,2,4,1], [5,5], greedy_snake_move) >= 0, true);
assert.strictEqual(greedy_snake_fn_checker([5,5,5,6,5,7,5,8], [4,4], greedy_snake_move) >= 0, true);

// 环绕测试
assert.strictEqual(greedy_snake_fn_checker([2,2,2,3,2,4,2,5], [3,3], greedy_snake_move) >= 0, true);
assert.strictEqual(greedy_snake_fn_checker([6,6,6,5,6,4,6,3], [5,5], greedy_snake_move) >= 0, true);

// 障碍物测试
assert.strictEqual(greedy_snake_fn_checker([3,3,3,4,3,5,3,6], [7,7], greedy_snake_move) >= 0, true);
assert.strictEqual(greedy_snake_fn_checker([5,5,5,4,5,3,5,2], [1,1], greedy_snake_move) >= 0, true);

// 逆向测试
assert.strictEqual(greedy_snake_fn_checker([8,8,8,7,8,6,8,5], [1,1], greedy_snake_move) >= 0, true);
assert.strictEqual(greedy_snake_fn_checker([1,1,1,2,1,3,1,4], [8,8], greedy_snake_move) >= 0, true);

console.log("🎉 You have passed all the tests provided.");

