import { HttpClient } from 'tsrpc-browser';
import { serviceProto } from '@/shared/protocols/serviceProto';

// 创建 HttpClient 实例，可全局共享
export const client = new HttpClient(serviceProto, {
    // server: '//blog.ling-in.top:3000',
    server: '//175.178.87.234:3000',
    // server: '//127.0.0.1:3000',
    json: true
});