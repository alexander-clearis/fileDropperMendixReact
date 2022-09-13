import MxObject = mendix.lib.MxObject;
import { MendixAPIHelper } from "./MendixAPIHelper";

interface iMendixObjectHelper {
    mxOBJ: MxObject;

    create(entityName: string): Promise<this>;
}

export class MendixObjectHelper extends MendixAPIHelper implements iMendixObjectHelper {
    private _mxOBJ!: MxObject;

    create(entityName: string): Promise<this> {
        return new Promise<this>((resolve, reject) => {
            this.createMxObject(entityName)
                .then(obj => {
                    this._mxOBJ = obj;
                    resolve(this);
                })
                .catch(re => reject(re));
        });
    }

    get mxOBJ(): MxObject {
        return this._mxOBJ;
    }

    get GUID(): string {
        return this._mxOBJ.getGuid();
    }

    private createMxObject(entityName: string): Promise<MxObject> {
        return this.MxObjectPromise((resolve, reject) => {
            mx.data.create({ entity: entityName, callback: resolve, error: reject });
        });
    }
}
