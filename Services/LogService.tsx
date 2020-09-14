/*
 TODO this is a wrapper around the normal console logging but in the
 future i want to replace these logs with an actual logging library for react native
 but i cant seem to find one i like at this time
*/
export class LogService {
    public static log(msg: String) {
        console.log(msg);
    }

    public static debug(msg: String) {
        console.log(msg);
    }

    public static info(msg: String) {
        console.log(msg);
    }

    public static warn(msg: String) {
        console.warn(msg);
    }

    public static error(msg: String) {
        console.error(msg);
    }
}

