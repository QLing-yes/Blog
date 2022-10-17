import Alias from "module-alias";
const { baseUrl, paths } = require("../tsconfig.json").compilerOptions;
//根据tsconfig.ts配置进行路径别名
const AliasList = {} as Record<string, string>
Object.keys(paths).map((k) => {
    const key = k.replace("/*", '');
    AliasList[key] = __dirname+'/' + paths[k][0].replace("*", '')
})
console.log('已别名路径:',AliasList);

Alias.addAliases(AliasList);