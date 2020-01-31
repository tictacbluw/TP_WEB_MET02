define({ "api": [
  {
    "type": "post",
    "url": "/client",
    "title": "Customer creation",
    "name": "CreateCustomer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname Name of the Customer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname Name of the Customer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the Customer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone of the Customer</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "civility",
            "description": "<p>Civility of the Customer</p>"
          },
          {
            "group": "Parameter",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the Customer</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Body-Example:",
        "content": "{\n    \"firstname\": \"controller\",\n    \"lastname\": \"test\",\n    \"password\": \"mdp\",\n    \"phone\": \"06 00 00 00 00\",\n    \"civility\": 1,\n    \"email\": \"test2@test.com\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Customer",
            "optional": false,
            "field": ".",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n    \"id\": 5,\n    \"nom\": \"controller\",\n    \"prenom\": \"test\",\n    \"phone\": \"06 32 72 62 61\",\n    \"civility\": 1,\n    \"email\": \"test2@test.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Missing mandatory params.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"missing mandatory params 'firstname' in body\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/route/CustomerRoute.php",
    "groupTitle": "Customer"
  },
  {
    "type": "delete",
    "url": "api/client/:id",
    "title": "Customer deletion",
    "name": "DeleteCustomer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the customer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the deleted Custome.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Missing mandatory params.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"invalid 'id' customer not found !\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/route/CustomerRoute.php",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "api/client/:id",
    "title": "Customer information",
    "name": "GetClient",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>of the client</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Client",
            "description": "<p>information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 5,\n  \"nom\": \"controller\",\n  \"prenom\": \"test\",\n  \"phone\": \"06 32 72 62 61\",\n  \"civility\": true,\n  \"email\": \"test2@test.com\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Missing mandatory params.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"missing mandatory params 'id'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/route/CustomerRoute.php",
    "groupTitle": "Customer"
  },
  {
    "type": "put",
    "url": "api/client/:id",
    "title": "Customer update",
    "name": "UpdateCustomer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstname",
            "description": "<p>Firstame of the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastname",
            "description": "<p>Lastname of the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>email of the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>password of the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "civility",
            "description": "<p>civility of the customer</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Body-Example:",
        "content": "{\n  \"email\": \"newemail@email.fr\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Customer",
            "optional": false,
            "field": "Customer",
            "description": "<p>with updated infos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 5,\n  \"nom\": \"controller\",\n  \"prenom\": \"test\",\n  \"phone\": \"06 32 72 62 61\",\n  \"civility\": true,\n  \"email\": \"newemail@email.fr\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Missing mandatory params.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"id doesn't exist !\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/route/CustomerRoute.php",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/product/",
    "title": "Product creation",
    "name": "CreateProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "price",
            "description": "<p>Price of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "quantity",
            "description": "<p>Quantity of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "images",
            "description": "<p>Images of the product</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Body-Example:",
        "content": "{\n  \"name\": \"Product toto\",\n  \"description\": \"Best product ever !\",\n  \"price\" : 10,\n  \"quantity\": 5,\n  \"img\" : \"urlimage1.jpg\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the created Product.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"Product Created\",\n  \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Missing mandatory params.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"missing mandatory params 'name' in body\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/route/ProductRoute.php",
    "groupTitle": "Product"
  },
  {
    "type": "delete",
    "url": "/product/:id",
    "title": "Product deletion",
    "name": "DeleteProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the product</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the deleted Product.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"Product deleted\",\n  \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Missing mandatory params.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"invalid 'id' product not found !\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/route/ProductRoute.php",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/catalog",
    "title": "",
    "name": "GetCatalog",
    "group": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Product",
            "description": "<p>catalog.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  [\n    {\n     \"id\": 2,\n     \"name\": \"fzefzfz\",\n      \"description\": \"sdfsdfs\",\n      \"price\": 1,\n      \"quantity\": 1,\n      \"imgUrl\": \"img_1.jpeg\"\n    },...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "503",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service Unavailable",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/route/ProductRoute.php",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/product/:id",
    "title": "Product information",
    "name": "GetProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>IDS of the products</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Product",
            "description": "<p>information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Product toto\",\n  \"description\": \"Best product ever !\",\n  \"price\" : 10,\n  \"quantity\": 5,\n  \"images\" : [\"urlimage1.jpg\", \"urlimage2.jps\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Missing mandatory params.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"missing mandatory params 'name' in body\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/route/ProductRoute.php",
    "groupTitle": "Product"
  },
  {
    "type": "put",
    "url": "/product/:id",
    "title": "Product update",
    "name": "UpdateProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "price",
            "description": "<p>Price of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "quantity",
            "description": "<p>Quantity of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "images",
            "description": "<p>Images of the product</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Body-Example:",
        "content": "{\n  \"name\": \"New Product toto\",\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Product",
            "optional": false,
            "field": "Product",
            "description": "<p>with updated infos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"Product Updated\",\n  \"Product\": {\n                 \"id\":1,\n                 \"name\": \"New Product toto\",\n                 \"description\": \"Best product ever !\",\n                 \"price\" : 10,\n                 \"quantity\": 5,\n                 \"images\" : [\"urlimage1.jpg\", \"urlimage2.jps\"]\n             }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Missing mandatory params.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"missing at least one param in body\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/route/ProductRoute.php",
    "groupTitle": "Product"
  }
] });
