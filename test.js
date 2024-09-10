function countIslands(map) {
    if (!map || map.length === 0) return 0;  // 检查地图是否为空

    const rows = map.length;
    const cols = map[0].length;
    let islandCount = 0;

    // 辅助函数，用于DFS遍历岛屿
    function dfs(x, y) {
        // 边界条件：坐标超出范围，或位置上是水、null或无效数据
        if (x < 0 || x >= rows || y < 0 || y >= cols || map[x][y] === 0 || map[x][y] === null) {
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
            // 如果找到一个未访问的陆地
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
  [1,1,0,0,0,null,0,0,0,0],
  [1,1,0,0,0,null,0,0,1,1],
  [1,1,0,0,0,0,0,null,1,0],
  [1,null,0,0,0,0,0,0,0,0],
  [1,1,0,0,1,0,null,0,0,0],
  [1,1,0,0,0,0,0,0,1,null],
  [1,1,0,0,null,0,0,1,1,1],
  [1,1,0,0,0,0,0,0,1,0],
];

console.log(countIslands(map)); // 输出：3
