import type { ServiceProto } from 'tsrpc-proto';
import type { ReqAddArticle, ResAddArticle } from './PtlAddArticle';
import type { ReqgetArticle, ResgetArticle } from './PtlgetArticle';
import type { ReqgetTag, ResgetTag } from './PtlgetTag';
import type { ReqgetTagCount, ResgetTagCount } from './PtlgetTagCount';

export interface ServiceType {
    api: {
        "AddArticle": {
            req: ReqAddArticle,
            res: ResAddArticle
        },
        "getArticle": {
            req: ReqgetArticle,
            res: ResgetArticle
        },
        "getTag": {
            req: ReqgetTag,
            res: ResgetTag
        },
        "getTagCount": {
            req: ReqgetTagCount,
            res: ResgetTagCount
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 18,
    "services": [
        {
            "id": 4,
            "name": "AddArticle",
            "type": "api"
        },
        {
            "id": 8,
            "name": "getArticle",
            "type": "api"
        },
        {
            "id": 6,
            "name": "getTag",
            "type": "api"
        },
        {
            "id": 7,
            "name": "getTagCount",
            "type": "api"
        }
    ],
    "types": {
        "PtlAddArticle/ReqAddArticle": {
            "type": "Interface",
            "extends": [
                {
                    "id": 5,
                    "type": {
                        "target": {
                            "type": "IndexedAccess",
                            "index": "Article",
                            "objectType": {
                                "type": "Reference",
                                "target": "../db/Schema/Blog"
                            }
                        },
                        "keys": [
                            "ID",
                            "time"
                        ],
                        "type": "Omit"
                    }
                }
            ]
        },
        "../db/Schema/Blog": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "Article",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 4,
                                "name": "ID",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 5,
                                "name": "time",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 0,
                                "name": "title",
                                "type": {
                                    "type": "String"
                                }
                            },
                            {
                                "id": 1,
                                "name": "content",
                                "type": {
                                    "type": "Interface",
                                    "properties": [
                                        {
                                            "id": 0,
                                            "name": "value",
                                            "type": {
                                                "type": "String"
                                            }
                                        },
                                        {
                                            "id": 1,
                                            "name": "type",
                                            "type": {
                                                "type": "String"
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "id": 2,
                                "name": "tag",
                                "type": {
                                    "type": "Array",
                                    "elementType": {
                                        "type": "String"
                                    }
                                }
                            },
                            {
                                "id": 3,
                                "name": "coverImg",
                                "type": {
                                    "type": "String"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "PtlAddArticle/ResAddArticle": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlgetArticle/ReqgetArticle": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "start",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "PtlgetArticle/ResgetArticle": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "Article",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "IndexedAccess",
                            "index": "Article",
                            "objectType": {
                                "type": "Reference",
                                "target": "../db/Schema/Blog"
                            }
                        }
                    }
                }
            ]
        },
        "PtlgetTag/ReqgetTag": {
            "type": "Interface"
        },
        "PtlgetTag/ResgetTag": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "tag",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "PtlgetTagCount/ReqgetTagCount": {
            "type": "Interface"
        },
        "PtlgetTagCount/ResgetTagCount": {
            "type": "Interface",
            "indexSignature": {
                "keyType": "String",
                "type": {
                    "type": "Number"
                }
            }
        }
    }
};