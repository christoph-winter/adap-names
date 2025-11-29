import { stringify } from "querystring";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if(delimiter != undefined)
        {
            this.delimiter = delimiter;
        }    
    }

    
    public asString(delimiter: string = this.delimiter): string {

        //precondition
        IllegalArgumentException.assert(this.isValidDelimiter(delimiter));

        var outString: string = "";
        for(var i = 0; i < this.getNoComponents()-1; i++)
        {
           outString =  outString+this.getComponent(i)+delimiter;
        }
        outString = outString+this.getComponent(this.getNoComponents()-1);
        outString = outString.replace(ESCAPE_CHARACTER, "");
        
        // postcondition
        MethodFailedException.assert(outString.indexOf(delimiter) == -1);

        // classInvariant
        this.assertIsValidNameInstanceAsClassInvariant();

        return outString;   
    }
    
    public toString(): string {
        // contracts checks are done on asDataString()
        return this.asDataString();
    }

    public asDataString(): string {
        // no preconditions necessary
        var outString: string = "";
        for(var i = 0; i < this.getNoComponents()-1; i++)
        {
            outString = outString+this.getComponent(i)+this.delimiter;
        }
        outString = outString+this.getComponent(this.getNoComponents()-1);
        
        // postcondition for checking escaping can't be done after outstring is created

        // classInvariant
        this.assertIsValidNameInstanceAsClassInvariant()

        return outString;
    }
    
    public isEqual(other: Name): boolean {
        //no precondition necessary as "other" is of type name and already checked for conditions
        return this.asDataString() == other.asDataString();
    }
    
    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;    
    }
    
    public isEmpty(): boolean {
        // no conditions necessary. Contract is ensured classInvariant
        return this.getNoComponents() == 0;
    }
    
    public getDelimiterCharacter(): string {
        // no conditions necessary. No client obligations, no mutations by contractor.
        return this.delimiter;
    }
    
    abstract getNoComponents(): number;
    
    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;
    
    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;
    abstract clone(): Name;
    
    public concat(other: Name): void {
        //no precondition necessary as "other" is of type name and already checked for conditions
        
        var prevNoComponents = this.getNoComponents();

        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }

        // postcondition
        MethodFailedException.assert(this.getNoComponents() == prevNoComponents + other.getNoComponents());

        // classInvariant
        this.assertIsValidNameInstanceAsClassInvariant();
    }
    

    protected isValidIndex(i: number): boolean {
        var maxIndex = this.getNoComponents()-1;
        return i <= maxIndex && i >= 0; 
    }

    protected isValidComponent(c: string): boolean {
        if (c == undefined || c == null|| c.trim().length == 0) return false;
        else return true
    }

    protected isValidDelimiter(d: string): boolean {
        if(d == undefined || d == null || d.length != 1) return false;
        else return true;
    }

    protected isValidNoComponents(n: number): boolean {
        if(n < 0) return false;
        else return true;
    }

    protected isComponentMasked(c: string){
        return this.checkIsControlCharEscaped(c, this.getDelimiterCharacter()) && this.checkIsControlCharEscaped(c, ESCAPE_CHARACTER);
    }

    private checkIsControlCharEscaped(str: string, controlChar: string){
        let posInStr = str.indexOf(controlChar);
        if(posInStr > -1)
        {
            var prePos = str.at(posInStr - 1);
            if(prePos == undefined || prePos != ESCAPE_CHARACTER) return false
        }
        return true
    }

    protected assertIsValidNameInstanceAsClassInvariant() {
        InvalidStateException.assert(this.isValidDelimiter(this.getDelimiterCharacter()));
        InvalidStateException.assert(this.isValidNoComponents(this.getNoComponents()));
    }
}