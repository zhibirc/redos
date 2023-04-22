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
2. 
