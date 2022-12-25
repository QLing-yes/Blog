import { HttpClient } from 'tsrpc-browser';
import { serviceProto } from '@/shared/protocols/serviceProto';

// 创建 HttpClient 实例，可全局共享
export const client = new HttpClient(serviceProto, {
    server: '//ling-in.top:3000',
    json: true
});