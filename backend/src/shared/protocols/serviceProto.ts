import { ServiceProto } from 'tsrpc-proto';
import { ReqAddArticle, ResAddArticle } from './PtlAddArticle';
import { ReqgetArticle, ResgetArticle } from './PtlgetArticle';
import { ReqgetTagCount, ResgetTagCount } from './PtlgetTagCount';

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
        "getTagCount": {
            req: ReqgetTagCount,
            res: ResgetTagCount
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 26,
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
                    "id": 7,
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
                            "time",
                            "tag",
                            "brief"
                        ],
                        "type": "Omit"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "tag",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "IndexedAccess",
                            "index": "tag",
                            "objectType": {
                                "type": "Reference",
                                "target": "PtlAddArticle/Article"
                            }
                        }
                    }
                },
                {
                    "id": 1,
                    "name": "brief",
                    "type": {
                        "type": "IndexedAccess",
                        "index": "brief",
                        "objectType": {
                            "type": "Reference",
                            "target": "PtlAddArticle/Article"
                        }
                    },
                    "optional": true
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
                                "id": 6,
                                "name": "brief",
                                "type": {
                                    "type": "String"
                                }
                            },
                            {
                                "id": 2,
                                "name": "tag",
                                "type": {
                                    "type": "String"
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
                },
                {
                    "id": 1,
                    "name": "State",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "tagSize",
                                "type": {
                                    "type": "Interface",
                                    "indexSignature": {
                                        "keyType": "String",
                                        "type": {
                                            "type": "Number"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "PtlAddArticle/Article": {
            "type": "IndexedAccess",
            "index": "Article",
            "objectType": {
                "type": "Reference",
                "target": "../db/Schema/Blog"
            }
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
                },
                {
                    "id": 1,
                    "name": "brief",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "search",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "field",
                    "type": {
                        "type": "String"
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
                            "type": "Intersection",
                            "members": [
                                {
                                    "id": 0,
                                    "type": {
                                        "target": {
                                            "type": "Reference",
                                            "target": "PtlgetArticle/Article"
                                        },
                                        "keys": [
                                            "content"
                                        ],
                                        "type": "Omit"
                                    }
                                },
                                {
                                    "id": 1,
                                    "type": {
                                        "type": "Interface",
                                        "properties": [
                                            {
                                                "id": 0,
                                                "name": "content",
                                                "type": {
                                                    "type": "IndexedAccess",
                                                    "index": "content",
                                                    "objectType": {
                                                        "type": "Reference",
                                                        "target": "PtlgetArticle/Article"
                                                    }
                                                },
                                                "optional": true
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "PtlgetArticle/Article": {
            "type": "IndexedAccess",
            "index": "Article",
            "objectType": {
                "type": "Reference",
                "target": "../db/Schema/Blog"
            }
        },
        "PtlgetTagCount/ReqgetTagCount": {
            "type": "Interface"
        },
        "PtlgetTagCount/ResgetTagCount": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "target": {
                            "type": "IndexedAccess",
                            "index": "State",
                            "objectType": {
                                "type": "Reference",
                                "target": "../db/Schema/Blog"
                            }
                        },
                        "keys": [
                            "tagSize"
                        ],
                        "type": "Pick"
                    }
                }
            ]
        }
    }
};