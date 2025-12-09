  import { describe, it, expect } from "vitest";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b06/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b06/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b06/common/InvalidStateException";
import { Name } from "./Name";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    var result = n.insert(1, "cs");
    expect(result.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    let result = n.append("de");
    expect(result.asString()).toBe("oss.cs.fau.de");
    expect(result.getNoComponents()).toBe(4);

  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let result = n.remove(0);
    expect(result.asString()).toBe("cs.fau.de");
    expect(result.getNoComponents()).toBe(3);
  });
  it("test clone", () => {
    let n = new StringName("oss.cs.fau.de");
    let clonedName = n.clone();
    clonedName.asString();
    expect(clonedName.asString()).toBe("oss.cs.fau.de");
  });
  it("test concat", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let result = n.concat(new StringName("com.tv.to"));
    expect(result.asString()).toBe("oss.cs.fau.de.com.tv.to")
    expect(result.getNoComponents()).toBe(7);
  });
    it("test equality", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let otherN: Name = new StringName("oss.cs.fau.de");
    expect(n.isEqual(otherN)).toBe(true);
    expect(n.getHashCode()).toBe(otherN.getHashCode());
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    let result = n.insert(1, "cs");
    expect(result.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    let result = n.append("de");
    expect(result.asString()).toBe("oss.cs.fau.de");
    expect(result.getNoComponents()).toBe(4);
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let result = n.remove(0);
    expect(result.asString()).toBe("cs.fau.de");
  });
    it("test clone", () => {
    let n = new StringArrayName(["oss","cs","fau","de"],".");
    let clonedName = n.clone();
    clonedName.asString();
    expect(clonedName.asString()).toBe("oss.cs.fau.de");
    expect(clonedName.getNoComponents()).toBe(4);
  });
    it("test concat with stringName", () => {
    let n: Name = new StringArrayName(["oss","cs","fau","de"],".");
    let result = n.concat(new StringArrayName(["com","tv","to"]));
    expect(result.asString()).toBe("oss.cs.fau.de.com.tv.to")
    expect(result.getNoComponents()).toBe(7);

  });
  it("test equality", () => {
    let n: Name = new StringArrayName(["oss","cs","fau","de"],".");
    let otherN: Name = new StringArrayName(["oss","cs","fau","de"],".");
    expect(n.isEqual(otherN)).toBe(true);
    expect(n.getHashCode()).toBe(otherN.getHashCode());
  });
});

describe("test compatibility of StringArrayName and StringName", () => {
  it("test concat with stringName", () => {
    let n: Name = new StringArrayName(["oss","cs","fau","de"],".");
    let result = n.concat(new StringName("com.tv.to"));
    expect(result.asString()).toBe("oss.cs.fau.de.com.tv.to")
    expect(result.getNoComponents()).toBe(7);

  });
  it("test equality", () => {
    let n: Name = new StringArrayName(["oss","cs","fau","de"],".");
    let otherN: Name = new StringName("oss.cs.fau.de");
    expect(n.isEqual(otherN)).toBe(true);
    expect(n.getHashCode()).toBe(otherN.getHashCode());
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    let result = n.insert(1, "cs");
    expect(result.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    let result = n.append("people");
    expect(result.asString()).toBe("oss.cs.fau.de#people");
  });

    it("test escaped delimiter in string", () => {
    let n: Name = new StringName("oss\\#cs#fau#de", "#");
    expect(n.getNoComponents()).toBe(3);
    expect(n.asDataString()).toBe("oss\\#cs#fau#de")
    expect(n.asString('.')).toBe("oss#cs.fau.de");
    let result = n.append("people");
    expect(result.asDataString()).toBe("oss\\#cs#fau#de#people");
    expect(result.asString(".")).toBe("oss#cs.fau.de.people");
  });
  it("test escaped delimiter same behavior as with stringarray", () => {
    let n: Name = new StringArrayName(["oss#cs","fau","de"], "#");
    expect(n.getNoComponents()).toBe(3);
    expect(n.asDataString()).toBe("oss\\#cs#fau#de")
    expect(n.asString('.')).toBe("oss#cs.fau.de");
    let result = n.append("people");
    expect(result.asDataString()).toBe("oss\\#cs#fau#de#people");
    expect(result.asString(".")).toBe("oss#cs.fau.de.people");
  });
});




describe("Test preconditions for StringName", () => {
  it("invalid index getComponent()", () => {
    let n = new StringName("fau.de.com");
    expect(() => n.getComponent(5)).toThrow(IllegalArgumentException);
    expect(() => n.getComponent(-1)).toThrow(IllegalArgumentException);
  });

  it("setComponent invalid index", () => {
    let n = new StringName("fau.de.com");
    expect(() => n.setComponent(42, "x")).toThrow(IllegalArgumentException);
  });

  it("setComponent invalid component", () => {
    let n = new StringName("fau.de.com");
    expect(() => n.setComponent(1, " ")).toThrow(IllegalArgumentException);
  });

  it("append invalid component", () => {
    let n = new StringName("fau.de.com");
    expect(() => n.append(" ")).toThrow(IllegalArgumentException);
    expect(() => n.append("")).toThrow(IllegalArgumentException);
  });

  it("invalid delimiter for asString()", () => {
    let n = new StringName("fau.de.com");
    expect(() => n.asString("foo")).toThrow(IllegalArgumentException);
    expect(() => n.asString("")).toThrow(IllegalArgumentException);
  });
});

describe("Preconditions for StringArrayName", () => {
  it("invalid index getComponent()", () => {
    let n = new StringArrayName(["fau", "de", "com"]);
    expect(() => n.getComponent(42)).toThrow(IllegalArgumentException);
  });

  it("setComponent invalid component", () => {
    let n = new StringArrayName(["fau", "de", "com"]);
    expect(() => n.setComponent(0, " ")).toThrow(IllegalArgumentException);
  });

  it("insert invalid index", () => {
    let n = new StringArrayName(["fau", "de"]);
    expect(() => n.insert(10, "com")).toThrow(IllegalArgumentException);
  });

  it("append invalid component throws", () => {
    let n = new StringArrayName(["fau"]);
    expect(() => n.append(" ")).toThrow(IllegalArgumentException);
  });
});

describe("Class invariant violations", () => {
  it("invalid delimiter in letructor should still enforce invariant", () => {
    let n = new StringName("fau.de.com", "###");
    expect(() => n.asString()).toThrow(IllegalArgumentException);
  });

});

describe("Test escaping and masking", () => {
  it("setComponent rejects unmasked delimiters", () => {
    let n = new StringName("fau.de.com", ".");
    expect(() => n.setComponent(1, "x.x")).toThrow(IllegalArgumentException);
  });

  it("append rejects unmasked escape character", () => {
    let n = new StringName("fau.de.com");
    expect(() => n.append("to\\tv")).toThrow(IllegalArgumentException);
  });

  it("insert rejects unescaped char", () => {
    let n = new StringArrayName(["foo", "bar"], ".");
    expect(() => n.insert(1, "bazz.com")).toThrow(IllegalArgumentException);
  });
});

describe("Edge cases", () => {
  it("empty StringArrayName", () => {
    let n = new StringArrayName([]);
    expect(n.asString()).toBe("");
  });

  it("clone", () => {
    let n = new StringArrayName(["foo", "bar"]);
    let c = n.clone();
    expect(c.asString()).toBe("foo.bar");
    expect(c.getNoComponents()).toBe(2);
  });
});

