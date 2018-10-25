
const fs = require('fs');

function check (path, isFile, isDirectory) {
   try {
      const matches = false;
      const stat = fs.statSync(path);

      matches = matches || isFile && stat.isFile();
      matches = matches || isDirectory && stat.isDirectory();

      return matches;
   }
   catch (e) {
      if (e.code === 'ENOENT') {
         return false;
      }

      throw e;
   }
}

/**
 * Synchronous validation of a path existing either as a file or as a directory.
 * 
 * @param {string} path The path to check
 * @param {number} type One or both of the exported numeric constants
 */
function exists (path, type) {
   if (!type) {
      return check(path, true, true);
   }

   return check(path, type & 1, type & 2);
}


module.exports.exists = exists;

module.exports.FILE = 1;

module.exports.FOLDER = 2;
