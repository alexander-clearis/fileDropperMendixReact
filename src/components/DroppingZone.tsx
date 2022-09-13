import React, { Component, ReactNode, createElement } from "react";

export interface DroppingZoneProps {
    content: ReactNode;
    onUpload: (files: FileList) => void;
}

export class DroppingZone extends Component<DroppingZoneProps> {
    private readonly ref: React.RefObject<HTMLInputElement>;

    constructor(props: DroppingZoneProps) {
        super(props);
        this.ref = React.createRef();
    }

    handleDrop = (e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        const files: FileList | undefined = e.dataTransfer?.files;

        if (files && files.length) {
            this.props.onUpload(files);
        }
    };

    handleDragOver = (e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    };

    componentDidMount(): void {
        this.ref.current?.addEventListener("drop", this.handleDrop);
        this.ref.current?.addEventListener("dragover", this.handleDragOver);
    }

    componentWillUnmount(): void {
        this.ref.current?.removeEventListener("drop", this.handleDrop);
        this.ref.current?.removeEventListener("dragover", this.handleDragOver);
    }

    render(): ReactNode {
        return (
            <div ref={this.ref} className="widget-droppingZone">
                {this.props.content}
            </div>
        );
    }
}
