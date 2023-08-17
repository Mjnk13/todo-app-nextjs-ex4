export default function db () {
  const keys = {
    user: [{name: "fullname", unique: false},
          {name: "email", unique: true},
          {name: "password", unique: false}
        ],
    todoTask: [
      {name: "userId", unique: false},
      {name: "content", unique: false},
      {name: "done", unique: false},
    ]
  }

  let db: IDBDatabase;
  const openDatabase = () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('TodoApp', 1);
            request.onerror = (err) => {
                console.error('IndexedDB error:', request.error, err);
                reject(err);
            };
        
            request.onsuccess = () => {
                db = request.result;
                resolve(db);
            };
            
            //run once
            request.onupgradeneeded = () => {
                db = request.result;
                let usersStore = db.createObjectStore('users', { keyPath: "id", autoIncrement: true });
                let todoTasksStore = db.createObjectStore('todoTasks', { keyPath: "id",autoIncrement: true });
                keys.user.forEach((key) => usersStore.createIndex(key.name, [ key.name ], { unique: key.unique }));
                keys.todoTask.forEach((key) => todoTasksStore.createIndex(key.name, [ key.name ], { unique: key.unique }));
            };
        });
    };
    
    async function initializeDatabase() {
      try {
        db = await openDatabase() as IDBDatabase ;
        return db;
      } catch (error) {
          console.log(error);
      }
    }
    
  return initializeDatabase();
}