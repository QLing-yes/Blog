// npm i --save @types/glob
// npm i --save glob
import glob from "glob"
import fs from "fs"
import { parse, basename } from "path";

/** 文件查找 */
export function Find(pattern: string, Callback: (Files: string[]) => void) {
    glob(pattern, (er, files) => {
        if (er) {
            console.error("Error: " + er.message);
            return;
        };
        Callback(files);
    })
}
/** 写入文件 */
export function writeFile(out: string, date: string) {
    fs.writeFileSync(out, date);
}
/** 批量字符串替换 */
export function batchReplace(o: string[], searchValue: string | RegExp, str: string) {
    return o.map((v) => v.replace(searchValue, str))
}
/** 构建文件路径表
 * @param Files 路径列表
 * @param name string:自定入口文件名; true:以父目录名称作为入口文件名; 默认:不作修改
 */
export function buildRoute(Files: string[], name?: string | true) {
    let o = {} as Record<string, string>
    Files.forEach((v) => {
        const { dir, ext } = parse(v);
        const key = basename(dir) as keyof typeof o;

        if (name == true) o[key] = dir + '/' + key + ext;
        else if (name) o[key] = dir + '/' + name + ext;
        else o[key] = v;

    })
    return o;
}
/** 构建vueRoute@4.x简单路由表 */
export function BuildVueRoute(Files: string[], RemoveBase?: string) {
    let o: any[] = []
    Files.forEach((v) => {
        const { dir, base, ext } = parse(v);
        const key = basename(dir) as keyof typeof o;
        o.push({
            path: v.replace(RemoveBase || '', '').replace('/' + base, ''),
            component: v.replace('./', '/')
        })
    })
    console.log(o);

    return o;
}

// Find("./src/page/*/*.vue", (files) => {
//     let l = Route(batchReplace(files, /.\/src/, ''))
//     writeFile("./src/r.json", JSON.stringify(l))
// })