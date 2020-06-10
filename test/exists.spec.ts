
jest.mock('fs');

//@ts-ignore
import { addStatSyncMock, assertMocksUsed } from 'fs';
import { exists, FILE, FOLDER, READABLE } from '../src';

describe(`exists`, () => {

   let statSync: any;
   let statSyncMock: any;
   let path: string;

   beforeEach(() => {
      path = `./path/${Math.random()}`;
      addStatSyncMock(statSyncMock = jest.fn(() => statSync()));
   });

   afterEach(() => {
      assertMocksUsed();
      statSync = statSyncMock = undefined;
   });

   describe('known errors', () => {
      beforeEach(() => givenStatSyncThrows({code: 'ENOENT'}));

      it('with type', () => {
         expect(exists(path, READABLE)).toBe(false);
      });

      it('with type omitted', () => {
         expect(exists(path)).toBe(false);
      })
   });

   describe('unknown errors', () => {
      let err: Error;
      beforeEach(() => err = givenStatSyncThrows(new Error('something')));

      it('with type', () => {
         expect(() => exists(path, READABLE)).toThrow(err);
      });

      it('with type omitted', () => {
         expect(() => exists(path)).toThrow(err);
      })
   });

   describe('path is a file', () => {
      beforeEach(() => givenStatSyncIsA('file'));
      existsReturns(true, false, true);
   });

   describe('path is a folder', () => {
      beforeEach(() => givenStatSyncIsA('folder'));
      existsReturns(false, true, true);
   });

   describe('path is unknown', () => {
      beforeEach(() => givenStatSyncIsA('unknown'));
      existsReturns(false, false, false);
   });

   function existsReturns (file: boolean, folder: boolean, readable: boolean) {
      it('when searching for a file', () => {
         expect(exists(path, FILE)).toBe(file);
      });
      it('when searching for a folder', () => {
         expect(exists(path, FOLDER)).toBe(folder);
      });
      it('when searching for either', () => {
         expect(exists(path, READABLE)).toBe(readable);
      });
      it('when searching without a type', () => {
         expect(exists(path)).toBe(readable);
      });
   }

   function givenStatSyncThrows (err: any) {
      statSync = () => { throw err; };
      return err;
   }

   function givenStatSyncIsA (type: 'file' | 'folder' | 'unknown') {
      const mockStat = {
         isFile () { return type === 'file' },
         isDirectory () { return type === 'folder' },
      };
      statSync = () => mockStat;
      return mockStat;
   }

});
