import { MendixAPIHelper } from "./MendixAPIHelper";
import { MendixObjectHelper } from "./MendixObjectHelper";

interface iMendixActionHelper {
    action_name: string;
    call(): Promise<this>;
    parameterObjects: MendixObjectHelper[];
}

export class MendixActionHelper extends MendixAPIHelper implements iMendixActionHelper {
    private readonly _action_name!: string;
    private _parameterObjects!: MendixObjectHelper[];

    constructor(action_name: string) {
        super();
        this._action_name = action_name;
    }

    call(): Promise<this> {
        return new Promise<this>(resolve => {
            console.log("called microflow: " + this.action_name);
            if (typeof this._parameterObjects === undefined || this._parameterObjects === null) {
                console.log("without any parameters");
            } else {
                console.log("With paramters ", this._parameterObjects);
            }
            resolve(this);
        });
    }

    get action_name(): string {
        return this._action_name;
    }

    set parameterObjects(value: MendixObjectHelper[]) {
        this._parameterObjects = value;
    }
}
