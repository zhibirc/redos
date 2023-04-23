# ReDoS

ReDoS in Node.js land with demo, side notes and fun.

![screenshot](/assets/images/screenshot.png)

## Usage

```shell
# node index.js CHARACTER_LIST [DELAY]
# where CHARACTER_LIST is JSON Array and DELAY is number of milliseconds
node index.js '["a", "([a-z]+)"]'
```

## Testing algorithm

1. Start from the entrypoint described in [usage](#usage) section with mandatory **character list** and **optional delay**.
2. If **delay** number of milliseconds was given then use it, otherwise use delay of **120** seconds.
3. Check for CPU cores number to setting up parallel execution.
4. Also validate for arguments and if **character list** is absent or malformed throw an error.
5. Generate all possible valid regular expressions from given character list and meta-characters `(`, `)`, `|`, `+`, `*`.
6. Generate random string from given alphabet characters of length **20** (default) with one different symbol at the end.
7. For each thread create a Promise-based job which have the following responsibility:
   - fork worker process and add it to worker pool
   - listen for message (IPC) from corresponding worker and do the following:
     - save given statistics
     - if there are no regular expressions for matching (nothing to do) kill this worker and resolve the job
     - otherwise send to worker new portion of data to handle
8. Send portion of data to handle to each worker in worker pool to start computations.
9. 
