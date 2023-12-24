console.log('Module.js')
async function start() {
    console.log('Starting...');
    await Promise.resolve();
    console.log('Done.');
}

start();
