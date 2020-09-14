import * as firebaseApp from 'firebase';
import {IBootstrapper} from "./IBootstrapper";
import {BootstrapStatusEnum} from "./Types/BootstrapStatusEnum";
import {LogService} from "../LogService";
import config from '../../config';

export class FirebaseBootstrapper implements IBootstrapper<void> {
    private status: BootstrapStatusEnum;

    constructor() {
        this.status = BootstrapStatusEnum.NOT_STARTED;
    }

    public bootstrap() {
        LogService.info('Start firebase app bootstrapping');
        // Initialize Firebase
        const firebaseConfig = {
            apiKey: config.API_KEY,
            authDomain: config.AUTH_DOMAIN,
            databaseURL: config.DATABASE_URL,
            projectId: config.PROJECT_ID,
            storageBucket: config.STORAGE_BUCKET,
            messagingSenderId: config.MESSAGING_SENDER_ID,
            appId: config.APP_ID,
            measurementId: config.MEASUREMENT_ID
        };

        const app: firebaseApp.app.App = firebaseApp.initializeApp(firebaseConfig);

        if (!app.name) {
            this.status = BootstrapStatusEnum.UNHEALTHY;
            LogService.error('Firebase init failed, firebase app not initialized');
            return false;
        } else {
            this.status = BootstrapStatusEnum.HEALTHY;
            LogService.info('End firebase app bootstrapping');
            return true;
        }
    }

    public asyncBootstrap = () => Promise.resolve(true);
    public getName = () => 'FirebaseBootstrapper';
    public getStatus = () => this.status;
    public getResults = () => null;
    public isAsync = () => false;
    public release = () => true;
}
