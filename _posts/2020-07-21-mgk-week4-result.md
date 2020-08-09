---
title: 모각코 4주차 결과
author: potion
date: 2020-07-21 22:50:00 +0900
categories: [cnu, mogagko]
tags: [mogagko]
---

## 결과
https://github.com/potionk/baekjoon/blob/master/src/bj1520/Main.java
역시 분류가 dp로 되있는 이유가 있었다. 일반 dfs로 풀이하면 시간 내에 통과하지 못하여 dp+dfs로 풀이하였다.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    static int[][] graph, dp;
    static int xSize, ySize, count;
    static int[] xArrow, yArrow;
    static boolean[][] dfsIsVisited;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] size = br.readLine().split(" ");
        ySize = Integer.parseInt(size[0]);
        xSize = Integer.parseInt(size[1]);
        graph = new int[ySize][xSize];
        dp = new int[ySize][xSize];
        dfsIsVisited = new boolean[ySize][xSize];
        xArrow = new int[]{-1, 1, 0, 0};
        yArrow = new int[]{0, 0, -1, 1};
        count = 0;
        for (int i = 0; i < ySize; i++) {
            String[] input = br.readLine().split(" ");
            for (int j = 0; j < xSize; j++) {
                graph[i][j] = Integer.parseInt(input[j]);
                dp[i][j] = -1;
            }
        }
        System.out.println(dfs(0, 0));
    }

    public static int dfs(int y, int x) {
        if (y == ySize - 1 && x == xSize - 1) {
            return 1;
        }
        if (dp[y][x] != -1) {
            return dp[y][x];
        }
        dp[y][x] = 0;
        for (int i = 0; i < 4; i++) {
            if (!(x + xArrow[i] >= xSize) && !(x + xArrow[i] < 0) && !(y + yArrow[i] >= ySize) && !(y + yArrow[i] < 0) && graph[y + yArrow[i]][x + xArrow[i]] < graph[y][x] && !dfsIsVisited[y + yArrow[i]][x + xArrow[i]]) {
                dfsIsVisited[y][x] = true;
                dp[y][x] += dfs(y + yArrow[i], x + xArrow[i]);
                dfsIsVisited[y][x] = false;
            }
        }
        return dp[y][x];
    }
}
```