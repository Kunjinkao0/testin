function countIslands(map) {
    const rows = map.length;
    const cols = map[0].length;
    let islandCount = 0;

    // 辅助函数，用于DFS遍历岛屿
    function dfs(x, y) {
        // 边界条件判断：坐标超出网格范围或当前位置不是陆地（即不是1）
        if (x < 0 || x >= rows || y < 0 || y >= cols || map[x][y] === 0) {
            return;
        }

        // 将当前陆地标记为已访问（置为0）
        map[x][y] = 0;

        // 继续递归访问上下左右四个方向
        dfs(x - 1, y); // 上
        dfs(x + 1, y); // 下
        dfs(x, y - 1); // 左
        dfs(x, y + 1); // 右
    }

    // 遍历整个网格
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // 如果找到一个未访问的岛屿
            if (map[i][j] === 1) {
                islandCount++;
                dfs(i, j); // 用DFS访问整个岛屿
            }
        }
    }

    return islandCount;
}

// 示例用法
const map = [
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
];

console.log(countIslands(map)); // 输出: 4
