import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }
    
    public findNodes(bn: string): Set<Node> {
        IllegalArgumentException.assert(bn.length > 0, "search string must be non-empty")
        let nodeSet = new Set<Node>();
        for(let child of this.childNodes){
            var foundNodes = child.findNodes(bn);
            for(let found of foundNodes){
                if(!nodeSet.has(found)){
                    nodeSet.add(found);
                }
            }
        }
        this.assertIsValidNodeInstanceAsClassInvariant();
        return nodeSet;
    }
}