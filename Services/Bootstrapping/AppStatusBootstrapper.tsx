import {ColorSchemeName, useColorScheme} from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";

import {IBootstrapper} from "./IBootstrapper";
import {BootstrapStatusEnum} from "./Types/BootstrapStatusEnum";
import React from "react";
import {LogService} from "../LogService";

export type AppStatusBootstrapperResults = {
    resourceLoadingComplete: boolean;
    colorScheme: 'light' | 'dark';
};

export class AppStatusBootstrapper implements IBootstrapper<AppStatusBootstrapperResults> {
    private status: BootstrapStatusEnum;
    private results: AppStatusBootstrapperResults;

    constructor() {
        this.status = BootstrapStatusEnum.NOT_STARTED;
        this.results = {
            resourceLoadingComplete: false,
            colorScheme: 'dark'
        };
    }

    public async asyncBootstrap() {
        this.results.resourceLoadingComplete = await AppStatusBootstrapper.loadResourcesAndDataAsync();
        this.results.colorScheme = AppStatusBootstrapper.getColorScheme();
        this.status = BootstrapStatusEnum.COMPLETE;
        return true;
    }

    public getResults = () => this.results;
    public bootstrap = () => true;
    public getName = () => 'AppStatusBootstrapper';
    public getStatus = () => this.status;
    public isAsync = () => true;
    public release = () => true;

    private static async loadResourcesAndDataAsync() {
        try {
            await SplashScreen.preventAutoHideAsync();

            // Load fonts
            await Font.loadAsync({
                ...Ionicons.font,
                'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
            });
            return true;
        } catch (e) {
            // We might want to provide this error information to an error reporting service
            LogService.error(e);
            return false;
        } finally {
            await SplashScreen.hideAsync();
        }
    }

    private static getColorScheme = (): 'light' | 'dark' => 'dark';
}
