// Global store for all async operations identified by a string key.
// Each run gets a random value and sets that value for the key.
// When the operation is done, before executing the mutation,
// we check if the current run is the last run, in which case
// the value will still be the same. If it is not the same, some other
// run of the same process started in the meantime, and the results
// for this run are ignored.
export const apiTaskRepository: Record<string, string> = {};
