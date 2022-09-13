import { MendixObjectHelper } from "./MendixObjectHelper";

export class MendixFileHelper extends MendixObjectHelper {
    create(entityName?: string): Promise<this> {
        console.log(entityName);
        return super.create(entityName ? entityName : "System.FileDocument");
    }
    createAndSetFileData(file: File, entityName?: string): Promise<this> {
        return new Promise<this>((resolve, reject) => {
            super
                .create(entityName ? entityName : "System.FileDocument")
                .then(() => {
                    this.setFileData(file)
                        .then(() => {
                            resolve(this);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
    setFileData(file: File): Promise<this> {
        return new Promise<this>((resolve, reject) => {
            this.setFile(this, file)
                .then(() => resolve(this))
                .catch(e => reject(e));
        });
    }

    // FileAPI
    private setFile(mendixFileHelper: MendixFileHelper, file: File): Promise<void> {
        return this.VoidPromise((resolve, reject) => {
            mx.data.saveDocument(mendixFileHelper.GUID, file.name, {}, file, resolve, reject);
        });
    }
}
