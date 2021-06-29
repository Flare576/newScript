const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (path) {
    const {execSync, spawnSync} = originalRequire('child_process');

    const scriptFlag = '--fsl';
    const depFlag = 42;
    try {
        return originalRequire.apply(this, arguments);
    } catch (e) {
        console.log(`Installing ${path}`);
        const { argv, exit, cwd } = process;
        execSync(`npm -g install ${path}`, { encoding: 'utf8' });
        const len = argv.length;
        if (len > 2 && argv[len - 1] === scriptFlag) {
            exit(depFlag);
        }
        argv.shift();
        const executable = argv.shift();
        argv.push(scriptFlag);

        let result = null;
        while (result === null || result === depFlag) {
            result = spawnSync(executable, argv, {
                cwd: cwd(),
                detached : true,
                stdio: "inherit"
            });
            result = result.status;
        }
        exit();
    }
}
