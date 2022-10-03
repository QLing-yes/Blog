import { ServiceProto } from 'tsrpc-proto';
import { ReqTest, ResTest } from './PtlTest';

export interface ServiceType {
    api: {
        "Test": {
            req: ReqTest,
            res: ResTest
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 3,
    "services": [
        {
            "id": 2,
            "name": "Test",
            "type": "api"
        }
    ],
    "types": {
        "PtlTest/ReqTest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "a",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlTest/ResTest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "b",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        }
    }
};