import { Component, ReactNode, createElement } from "react";

import { FileDropperContainerProps } from "../typings/FileDropperProps";

import "./ui/FileDropper.css";
import { DroppingZone } from "./components/DroppingZone";

import { MendixFileHelper } from "./util/MendixFileHelper";
import { MendixActionHelper } from "./util/MendixActionHelper";

export default class FileDropper extends Component<FileDropperContainerProps> {
    onUpload = (files: FileList): void => {
        // const fileEntity = this.props.fileEntity;
        const fileHelpers: Array<Promise<MendixFileHelper>> = Array.from(files).map(file => {
            return new MendixFileHelper().create().then(mfh => mfh.setFileData(file));
        });
        Promise.all(fileHelpers).then(resolvedFileHelpers => {
            const a = new MendixActionHelper(this.props.onUploadMicroflow);
            a.parameterObjects = resolvedFileHelpers;
            a.call().finally();
        });
    };

    // ON COMP.UNMOUNT REMOVE ALL SUBSCRIPTIONS FROM MX DATA
    render(): ReactNode {
        return <DroppingZone content={this.props.content} onUpload={this.onUpload} />;
    }
}
