import { statSync } from 'fs';
import debug from 'debug';

const {name} = require('../package.json');
const log = debug(name);

function check(path: string, isFile: boolean, isDirectory: boolean): boolean {
   log(`checking %s`, path);

   try {
      const stat = statSync(path);

      if (stat.isFile() && isFile) {
         log(`[OK] path represents a file`);
         return true;
      }

      if (stat.isDirectory() && isDirectory) {
         log(`[OK] path represents a directory`);
         return true;
      }

      log(`[FAIL] path represents something other than a file or directory`);
      return false;
   } catch (e) {
      if (e.code === 'ENOENT') {
         log(`[FAIL] path is not accessible: %o`, e);
         return false;
      }

      log(`[FATAL] %o`, e);
      throw e;
   }
}

/**
 * Synchronous validation of a path existing either as a file or as a directory.
 *
 * @param {string} path The path to check
 * @param {number} type One or both of the exported numeric constants
 */
export function exists(path: string, type: number = READABLE): boolean {
   return check(path, (type & FILE) > 0, (type & FOLDER) > 0);
}

/**
 * Constant representing a file
 */
export const FILE = 1;

/**
 * Constant representing a folder
 */
export const FOLDER = 2;

/**
 * Constant representing either a file or a folder
 */
export const READABLE = FILE + FOLDER;
