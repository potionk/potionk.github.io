---
title: 모각코 6주차 결과
author: potion
date: 2020-08-04 22:50:00 +0900
categories: [cnu, mogagko]
tags: [mogagko]
---

## 결과
https://github.com/potionk/baekjoon/blob/master/src/bj10331/Main.java
후위연산으로 변환 후 결과값을 계산하여 비교하였다. 다른사람들의 풀이도 찾아봐야겠다.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String expr = br.readLine();
        int m = calExpr(expr, 'm');
        int l = calExpr(expr, 'l');
        int tc = Integer.parseInt(br.readLine());
        if (tc == m) {
            if (tc == l) {
                System.out.println("U");
            } else {
                System.out.println("M");
            }
        } else if (tc == l) {
            System.out.println("L");
        } else {
            System.out.println("I");
        }
    }

    public static int calExpr(String expr, char mode) {
        Stack<Character> result = new Stack<>();
        Stack<Character> operator = new Stack<>();
        for (int i = 0; i < expr.length(); i++) {
            char c = expr.charAt(i);
            if (mode == 'm') {
                switch (c) {
                    case '+':
                        while (!operator.isEmpty()) {
                            result.push(operator.pop());
                        }
                        operator.push(c);
                        break;
                    case '*':
                        while (!operator.isEmpty() && operator.peek() == '*') {
                            result.push(operator.pop());
                        }
                        operator.push(c);
                        break;
                    default:
                        result.push(c);
                }
            } else {
                if (c == '+' || c == '*') {
                    while (!operator.isEmpty()) {
                        result.push(operator.pop());
                    }
                    operator.push(c);

                } else {
                    result.push(c);
                }
            }
            if (i == expr.length() - 1) {
                while (operator.size() != 0)
                    result.push(operator.pop());
            }
        }
        Object[] result2Array = result.toArray();
        Stack<Integer> resultStack = new Stack<>();
        for (Object o : result2Array) {
            int b;
            int a;
            switch ((char) o) {
                case '+':
                    b = resultStack.pop();
                    a = resultStack.pop();
                    resultStack.push(a + b);
                    break;
                case '*':
                    b = resultStack.pop();
                    a = resultStack.pop();
                    resultStack.push(a * b);
                    break;
                default:
                    resultStack.push((char) o - 48);
            }
        }
        return resultStack.get(0);
    }
}
```