import { Component, ReactNode, createElement } from "react";
import { FileDropperPreviewProps } from "../typings/FileDropperProps";
import { DroppingZone } from "./components/DroppingZone";

export class preview extends Component<FileDropperPreviewProps> {
    onUpload = (files: FileList) => {
        console.log(files);
    };

    render(): ReactNode {
        return <DroppingZone content={this.props.content} onUpload={this.onUpload} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/FileDropper.css");
}
