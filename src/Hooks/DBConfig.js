export const DBConfig = {
    name: "MyDB",
    version: 1,
    objectStoresMeta: [
      {
        store: "users",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "name", keypath: "name", options: { unique: false } },
          { name: "email", keypath: "email", options: { unique: true } },
          { name: "password", keypath: "password", options: { unique: false } },
          { name: "addedUsers", keypath: "addedUsers", options: { unique: false, multiEntry: true  } },
        ],
      },
      {
        store: "blockedList",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "email", keypath: "email", options: { unique: true } },
          { name: "list", keypath: "list", options: { unique: false, multiEntry: true } },
        ],
      }
    ]
  };