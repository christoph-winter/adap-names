import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.noComponents = this.splitStringIntoComponents(source).length;
        this.name = source;
    }

    public getNoComponents(): number {
        // no precondition necessary, no obligations for client, no mutations
        return this.noComponents;
    }

    public getComponent(i: number): string {
        // precondition
        IllegalArgumentException.assert(this.isValidIndex(i));
        
        var component = this.splitStringIntoComponents(this.name).at(i);

        if(component == undefined)
        {
            // redundant and probably impossible to reach
            throw new RangeError("no valid element found at position: "+i);
        }
        return component;

        // no postconditions necessary
    }

    public setComponent(i: number, c: string) {
        // precondition
        IllegalArgumentException.assert(this.isValidIndex(i));
        IllegalArgumentException.assert(this.isValidComponent(c));
        IllegalArgumentException.assert(this.isComponentMasked(c));

        var prevNoComponents = this.getNoComponents();


        var arrayName = this.splitStringIntoComponents(this.name);
        arrayName[i] = c;
        this.name = arrayName.join(this.delimiter);
        
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


        var arrayName = this.splitStringIntoComponents(this.name);
        arrayName.splice(i, 0, c)
        this.name = arrayName.join(this.delimiter);
        this.noComponents++;

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

        this.name = this.name+this.delimiter+c;
        this.noComponents++;
        
        // postcondition
        MethodFailedException.assert(this.getNoComponents() == (prevNoComponents + 1));
        const newComponent = this.getComponent(this.getNoComponents()-1);
        MethodFailedException.assert(newComponent == c);

        // classInvariant
        this.assertIsValidNameInstanceAsClassInvariant();
    }

    public remove(i: number) {

        //precondition
        IllegalArgumentException.assert(this.isValidIndex(i),"invalid index");
        var prevNoComponents = this.getNoComponents();


        var arrayName = this.splitStringIntoComponents(this.name);
        arrayName.splice(i, 1);
        this.name = arrayName.join(this.delimiter);
        this.noComponents--;

        //postcondition
        MethodFailedException.assert(this.getNoComponents() == prevNoComponents-1);

        // classInvariant
        this.assertIsValidNameInstanceAsClassInvariant();
    }
    
    private splitStringIntoComponents(str: string): string[]
    {
        // Escape any regex meta-characters in delimiter
        const escapedDelim = this.delimiter.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
        
        // Escape control characters. 
        const regex = new RegExp(`(?<!\\\\)[${escapedDelim}]`);
        return str.split(regex);
    }
    public clone(): StringName
    {
        //no conditions necessary. It is implied by checking classInvariant that cloning happens from valid name instance.
        return new StringName(this.name, this.delimiter);
    }
}