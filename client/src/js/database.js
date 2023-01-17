import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content)  => {
  console.log('PUT to the database');

  // Establish a connection to the desired database and version.
  const contactDb = await openDB('jate', 1);

  // Specify the database and data privileges when creating a new transaction.
  const tx = contactDb.transaction('jate', 'readwrite');

  // Get the desired object storage open.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Obtain a response to the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Establish a connection to the desired database and version.
  const contactDb = await openDB('jate', 1);

  // The database and data privileges must be specified when creating a new transaction.
  const tx = contactDb.transaction('jate', 'readonly');

  // Get the desired object storage open.
  const store = tx.objectStore('jate');

  // To access all the data in the database, use the.getAll() method.
  const request = store.getAll();

  // Obtain a response to the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};


initdb();
