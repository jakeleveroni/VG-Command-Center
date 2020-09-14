import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigation from './navigation';
import {Bootstrapper} from "./Services/Bootstrapping/Bootstrapper";
import {StartupErrorScreen} from "./screens/StartupErrorScreen";
import {AppStatusBootstrapperResults} from "./Services/Bootstrapping/AppStatusBootstrapper";
import {AppLoading} from "expo";

type AppState = {
    colorScheme: 'light' | 'dark';
    isLoadingComplete: boolean;
    hasErrors: boolean;
    errors: Array<String>
}

export default class App extends Component<void, AppState> {
    private bootstrapper: Bootstrapper;
    private appStatusBootstrapperName = 'AppStatusBootstrapper';

    public state: AppState = {
        colorScheme: 'light',
        isLoadingComplete: false,
        hasErrors: false,
        errors: []
    };

    constructor() {
        super();
        this.bootstrapper = new Bootstrapper();
    }

    render() {
        let errorScreen = (
            <SafeAreaProvider>
                <StartupErrorScreen errorMsgs={this.state.errors}/>
            </SafeAreaProvider>
        );

        let homeScreen = (
            <SafeAreaProvider>
                <Navigation colorScheme={this.state.colorScheme}/>
                <StatusBar/>
            </SafeAreaProvider>
        );

        let loader = (
            <AppLoading startAsync={() => this.initializeApp()}
                        onFinish={() => this.setState({isLoadingComplete: true})}
                        onError={(err) => this.setState({hasErrors: true, errors: [err.message]})}
            />
        );

        if (!this.state.isLoadingComplete) {
            return loader;
        } else if (this.state.hasErrors) {
            return errorScreen;
        } else {
            return homeScreen;
        }
    }

    private async initializeApp() {
        await this.bootstrapper.bootstrap();
        let appStatusResults: AppStatusBootstrapperResults =
            this.bootstrapper.getServiceResults(this.appStatusBootstrapperName);
        this.setState({
            colorScheme: appStatusResults.colorScheme
        });
    }
}
