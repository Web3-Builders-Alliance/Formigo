export type Formigo = {
  "version": "0.1.0",
  "name": "formigo",
  "instructions": [
    {
      "name": "createAdmin",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createForm",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "formId",
          "type": "bytes"
        },
        {
          "name": "data",
          "type": "bytes"
        },
        {
          "name": "iv",
          "type": "bytes"
        },
        {
          "name": "ecPubkey",
          "type": "bytes"
        },
        {
          "name": "creator",
          "type": "publicKey"
        },
        {
          "name": "part",
          "type": "u64"
        },
        {
          "name": "totalParts",
          "type": "u64"
        }
      ]
    },
    {
      "name": "takeForm",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "formId",
          "type": "bytes"
        },
        {
          "name": "responseId",
          "type": "bytes"
        },
        {
          "name": "data",
          "type": "bytes"
        },
        {
          "name": "iv",
          "type": "bytes"
        },
        {
          "name": "ecPubkey",
          "type": "bytes"
        },
        {
          "name": "respondent",
          "type": "publicKey"
        },
        {
          "name": "part",
          "type": "u64"
        },
        {
          "name": "totalParts",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "admin",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "CreateFormEvent",
      "fields": [
        {
          "name": "formId",
          "type": "bytes",
          "index": false
        },
        {
          "name": "data",
          "type": "bytes",
          "index": false
        },
        {
          "name": "iv",
          "type": "bytes",
          "index": false
        },
        {
          "name": "creator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "part",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalParts",
          "type": "u64",
          "index": false
        },
        {
          "name": "ecPubkey",
          "type": "bytes",
          "index": false
        }
      ]
    },
    {
      "name": "TakeFormEvent",
      "fields": [
        {
          "name": "formId",
          "type": "bytes",
          "index": false
        },
        {
          "name": "responseId",
          "type": "bytes",
          "index": false
        },
        {
          "name": "data",
          "type": "bytes",
          "index": false
        },
        {
          "name": "iv",
          "type": "bytes",
          "index": false
        },
        {
          "name": "ecPubkey",
          "type": "bytes",
          "index": false
        },
        {
          "name": "respondent",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "part",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalParts",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidBump",
      "msg": "Invalid bump"
    },
    {
      "code": 6001,
      "name": "NotAdmin",
      "msg": "Not admin"
    }
  ]
};

export const IDL: Formigo = {
  "version": "0.1.0",
  "name": "formigo",
  "instructions": [
    {
      "name": "createAdmin",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createForm",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "formId",
          "type": "bytes"
        },
        {
          "name": "data",
          "type": "bytes"
        },
        {
          "name": "iv",
          "type": "bytes"
        },
        {
          "name": "ecPubkey",
          "type": "bytes"
        },
        {
          "name": "creator",
          "type": "publicKey"
        },
        {
          "name": "part",
          "type": "u64"
        },
        {
          "name": "totalParts",
          "type": "u64"
        }
      ]
    },
    {
      "name": "takeForm",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "formId",
          "type": "bytes"
        },
        {
          "name": "responseId",
          "type": "bytes"
        },
        {
          "name": "data",
          "type": "bytes"
        },
        {
          "name": "iv",
          "type": "bytes"
        },
        {
          "name": "ecPubkey",
          "type": "bytes"
        },
        {
          "name": "respondent",
          "type": "publicKey"
        },
        {
          "name": "part",
          "type": "u64"
        },
        {
          "name": "totalParts",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "admin",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "CreateFormEvent",
      "fields": [
        {
          "name": "formId",
          "type": "bytes",
          "index": false
        },
        {
          "name": "data",
          "type": "bytes",
          "index": false
        },
        {
          "name": "iv",
          "type": "bytes",
          "index": false
        },
        {
          "name": "creator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "part",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalParts",
          "type": "u64",
          "index": false
        },
        {
          "name": "ecPubkey",
          "type": "bytes",
          "index": false
        }
      ]
    },
    {
      "name": "TakeFormEvent",
      "fields": [
        {
          "name": "formId",
          "type": "bytes",
          "index": false
        },
        {
          "name": "responseId",
          "type": "bytes",
          "index": false
        },
        {
          "name": "data",
          "type": "bytes",
          "index": false
        },
        {
          "name": "iv",
          "type": "bytes",
          "index": false
        },
        {
          "name": "ecPubkey",
          "type": "bytes",
          "index": false
        },
        {
          "name": "respondent",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "part",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalParts",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidBump",
      "msg": "Invalid bump"
    },
    {
      "code": 6001,
      "name": "NotAdmin",
      "msg": "Not admin"
    }
  ]
};
