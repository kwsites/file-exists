# file-exists

Synchronous validation of a path existing either as a file or as a directory.

```
const { exists, FILE, FOLDER } = require('@steveukx/file-exists');

assert(exists(__dirname)); // when no type is specified, both folders and files are allowed
assert(exists(__dirname, FOLDER)); // it's a folder so will match
assert(!exists(__dirname, FILE));  // it's not a file so won't match

assert(exists(__filename)); // when no type is specified, both folders and files are allowed
assert(!exists(__filename, FOLDER)); // it's not a folder so won't match
assert(exists(__filename, FILE));  // it's a file so will match

// the type is bit checked, so supplying both matches both files and folders
assert(exists(__dirname, FILE + FOLDER));
assert(exists(__filename, FILE + FOLDER));
```