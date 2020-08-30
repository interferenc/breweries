/* eslint-disable @typescript-eslint/camelcase */
import { rawBrewery, transformedBrewery } from "./transform.spec.fixtures";
import { breweryTransformer } from "./transform";

describe("Brewery Transformer", () => {
  it("transforms a raw brewery to the internal format", () => {
    expect(breweryTransformer(rawBrewery)).toStrictEqual(transformedBrewery);
  });

  it("fails to transform a raw brewery to the internal format", () => {
    expect(
      breweryTransformer({ ...rawBrewery, name: "bad bad name" })
    ).not.toStrictEqual(transformedBrewery);
  });
});
