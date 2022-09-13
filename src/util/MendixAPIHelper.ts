import MxObject = mendix.lib.MxObject;

export class MendixAPIHelper {
    MxObjectPromise(
        callMe: (resolve: (value: MxObject) => void, reject: (e: Error) => void) => void
    ): Promise<MxObject> {
        return new Promise<MxObject>((resolve: (value: MxObject) => void, reject: (e: Error) => void) => {
            callMe(resolve, reject);
        });
    }

    VoidPromise(callMe: (resolve: () => void, reject: (e: Error) => void) => void): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (e: Error) => void) => {
            callMe(resolve, reject);
        });
    }
}
