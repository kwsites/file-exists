
let statSyncMocks: any[] = [];

export function statSync(...args: any[]) {
   const  mock = statSyncMocks.shift();
   if (typeof mock !== 'function') {
      throw new Error(`fs.statSync called without configuring a mock`);
   }

   return mock(...args);
}

export function addStatSyncMock(fn: any) {
   statSyncMocks.push(fn);
}

export function assertMocksUsed() {
   if (statSyncMocks.length) {
      throw new Error(`fs.afterEach: statSync has ${statSyncMocks.length} unused mocks`);
   }
}

const mockFs = {
   statSync,
}

export default mockFs;
