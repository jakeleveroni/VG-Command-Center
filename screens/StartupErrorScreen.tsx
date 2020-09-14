import * as React from 'react';
import {Component} from "react";
import {StyleSheet, Text} from "react-native";

type StartupErrorScreenProps = {
    errorMsgs: Array<String>
}

export class StartupErrorScreen extends Component<StartupErrorScreenProps, {}> {
    constructor(props: StartupErrorScreenProps) {
        super(props);
    }


    render() {
        return (
            <div>
                {this.props.errorMsgs.map((x, ndx) => {
                    return <Text key={ndx} style={styles.errorMsg}>{x}</Text>
                })}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    errorMsg: {
        color: 'red',
        fontWeight: 'bold'
    }
});
