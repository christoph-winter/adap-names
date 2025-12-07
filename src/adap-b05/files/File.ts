import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        //precondition
        IllegalArgumentException.assert(this.doGetFileState() != FileState.DELETED, "Cannot open deleted file");
        IllegalArgumentException.assert(this.doGetFileState() == FileState.OPEN, "Cannot open an open file");
        // do something
    }

    public read(noBytes: number): Int8Array {
        //precondition
        IllegalArgumentException.assert(this.doGetFileState() == FileState.OPEN, "File must be open to be read");
        IllegalArgumentException.assert(noBytes > 0);
        let result: Int8Array = new Int8Array(noBytes);
        // do something

        let tries: number = 0;
        for (let i: number = 0; i < noBytes; i++) {
            try {
                result[i] = this.readNextByte();
            } catch(ex) {
                tries++;
                if (ex instanceof MethodFailedException) {
                    MethodFailedException.assert(tries < 3);
                }
            }
        }

        return result;
    }

    protected readNextByte(): number {
        return 0; // @todo
    }

    public close(): void {
        IllegalArgumentException.assert(this.doGetFileState() == FileState.OPEN, "Only an open file can be closed");
        // do something    
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}