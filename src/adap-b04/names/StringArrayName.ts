import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }

    public getNoComponents(): number {
        // no precondition necessary, no obligations for client, no mutations, valid state is ensured by classInvariant
        return this.components.length;
    }

    public getComponent(i: number): string {
        // precondition
        IllegalArgumentException.assert(this.isValidIndex(i));

        return this.components[i].replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER)
            .replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter);
    }

    public setComponent(i: number, c: string) {
        // precondition
        IllegalArgumentException.assert(this.isValidIndex(i));
        IllegalArgumentException.assert(this.isValidComponent(c));
        IllegalArgumentException.assert(this.isComponentMasked(c));
        
        var prevNoComponents = this.getNoComponents();


        this.components[i] = c;

        // postcondition
        const newComponent = this.getComponent(i);
        MethodFailedException.assert(newComponent == c);
        MethodFailedException.assert(prevNoComponents == this.getNoComponents());
        
        // classInvariant
        this.assertIsValidNameInstanceAsClassInvariant();
    }

    public insert(i: number, c: string) {
        // precondition
        IllegalArgumentException.assert(this.isValidIndex(i));
        IllegalArgumentException.assert(this.isValidComponent(c));
        IllegalArgumentException.assert(this.isComponentMasked(c));

        var prevNoComponents = this.getNoComponents();

        this.components.splice(i, 0, c); 

        // postcondition
        const newComponent = this.getComponent(i);
        MethodFailedException.assert(newComponent == c);
        MethodFailedException.assert(this.getNoComponents() == (prevNoComponents + 1))

        // classInvariant
        this.assertIsValidNameInstanceAsClassInvariant()
    }

    public append(c: string) {

        // precondition
        IllegalArgumentException.assert(this.isValidComponent(c));
        IllegalArgumentException.assert(this.isComponentMasked(c));

        var prevNoComponents = this.getNoComponents();
        this.components.push(c);

        // postcondition
        MethodFailedException.assert(this.getNoComponents() == (prevNoComponents + 1));
        const newComponent = this.getComponent(this.getNoComponents()-1);
        MethodFailedException.assert(newComponent == c);

        // classInvariant
        this.assertIsValidNameInstanceAsClassInvariant()
    }

    public remove(i: number) {
        //precondition
        IllegalArgumentException.assert(this.isValidIndex(i));
        var prevNoComponents = this.getNoComponents();

        this.components.splice(i, 1);

        //postcondition
        MethodFailedException.assert(this.getNoComponents() == prevNoComponents+1);

        // classInvariant
        this.assertIsValidNameInstanceAsClassInvariant()
    }
    public clone(): StringArrayName {
        //no conditions necessary. It is implied by checking classInvariant that cloning happens from valid name instance.
        return new StringArrayName([...this.components], this.delimiter);
    }
}