/* eslint-disable @typescript-eslint/camelcase */
import { rawBrewery, transformedBrewery } from "./transform.spec.fixtures";
import { breweryTransformer } from "./transform";

describe("Brewery Transformer", () => {
  it("transform a raw brewery to the internal format", () => {
    expect(breweryTransformer(rawBrewery)).toStrictEqual(transformedBrewery);
  });

  /*it("returns an error for an ill formed brewery", () => {
    expect(
      isLeft(breweryCodec.decode({ ...wellFormedBrewery, updated_at: "bar" }))
    ).toBe(true);
  });*/
});
