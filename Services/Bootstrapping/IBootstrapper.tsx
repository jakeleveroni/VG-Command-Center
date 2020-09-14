import {BootstrapStatusEnum} from "./Types/BootstrapStatusEnum";

export interface IBootstrapper<T> {
    asyncBootstrap: () => Promise<boolean>;
    bootstrap: () => boolean;
    release: () => boolean;
    getStatus: () => BootstrapStatusEnum;
    getName: () => String;
    isAsync: () => boolean;
    getResults: () => T;
}
