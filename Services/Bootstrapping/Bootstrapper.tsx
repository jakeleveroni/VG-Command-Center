import {IBootstrapper} from "./IBootstrapper";
import {FirebaseBootstrapper} from "./FirebaseBootstrapper";
import {BootstrapStatusEnum} from "./Types/BootstrapStatusEnum";
import {LogService} from "../LogService";
import {AppStatusBootstrapper} from "./AppStatusBootstrapper";

export class Bootstrapper {
    private readonly servicesToBootstrap: Array<IBootstrapper<any>>;
    private bootstrapServiceResults: Map<String, any>;
    private errors: Array<String> = [];

    constructor() {
        // Add services to bootstrap here (no async support, order does matter)
        this.servicesToBootstrap = [
            new AppStatusBootstrapper(),
            new FirebaseBootstrapper()
        ];
        this.bootstrapServiceResults = new Map();
    }

    public async bootstrap() {
        LogService.info('Bootstrapper starting bootstrapping process.');
        for (let service of this.servicesToBootstrap) {
            if (!service.isAsync()) {
                service.bootstrap();
            } else {
                await service.asyncBootstrap();
            }
            this.bootstrapServiceResults.set(service.getName(), service.getResults());
        }

        this.errors = [];

        const isValid = this.validate();
        if (!isValid) {
            throw new Error(this.getErrors().join('\n'));
        } else {
            return true;
        }
    }

    public getServiceResults(serviceName: String): any {
        return this.bootstrapServiceResults.get(serviceName);
    }

    public getErrors() {
        return this.errors;
    }

    private validate() {
        let isValid = true;

        for (let service of this.servicesToBootstrap) {
            if (service.getStatus() === BootstrapStatusEnum.UNHEALTHY) {
                isValid = false;
                this.errors.push(`Service: ${service.getName()} | Status: ${service.getStatus()}`);
            }
        }

        if (!isValid) {
            LogService.error(this.errors.join('\n'));
        }

        return isValid;
    }
}
