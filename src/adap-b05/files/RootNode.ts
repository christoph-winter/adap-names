import { Exception } from "../common/Exception";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";
import { Node } from "./Node";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        // null operation
    }

    protected doSetBaseName(bn: string): void {
        // null operation
    }

    public findNodes(bn: string): Set<Node> {
        let foundNodes: Set<Node> = new Set<Node>();
        try {
            foundNodes = super.findNodes(bn);
        } catch (e) {

            // do something with internal exception Example:
            console.error(`Error finding nodes for bn "${bn}":`, e);

            // client facing exception:
            ServiceFailureException.assert(false, undefined, e as Exception);

        }
        return foundNodes;
    }
    protected assertIsValidNodeInstanceAsClassInvariant() {
        InvalidStateException.assert(this.parentNode != undefined);
    }
}