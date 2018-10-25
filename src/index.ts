
import fs from 'fs';

function check (path: string, isFile: boolean, isDirectory: boolean): boolean {
   try {
      const stat = fs.statSync(path);
      let matches = false;

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
export function exists (path: string, type: number): boolean {
   if (!type) {
      return check(path, true, true);
   }

   return check(path, (type & 1) > 0, (type & 2) > 0);
}

/**
 * Constant representing a file
 */
export const FILE = 1;

/**
 * Constant representing a folder
 */
export const FOLDER = 2;
