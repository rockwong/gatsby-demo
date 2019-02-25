---
tags: [Notebooks/node]
title: Module 语法
created: '2019-02-25T14:16:04.428Z'
modified: '2019-02-25T14:19:26.461Z'
---

# Module 语法

## export 

```js

export var firstName = 'Michael';
export person from 'person.js'; // 输出外部文件

const year = 1958;
export { year }

export function multiply(x, y) {
  return x * y;
};

// 重命名对外接口
const v1 = '2018-04-01';
export { v1 as date };

```
