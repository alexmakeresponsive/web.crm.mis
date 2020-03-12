import manager            from 'nconf';
import path, {dirname}    from 'path';

export default manager.argv()
    .env()
    .file({
        file: path.join(__dirname, "app.config.json")
    });
