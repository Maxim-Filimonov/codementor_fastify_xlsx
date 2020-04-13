import { getEdges } from "./excel_creator";
describe("a simple case", () => {
  it("works", async () => {
    const mockGetEdges = jest.fn((filter) =>
      filter === "PurchasedFrom"
        ? Promise.resolve(["purchase1", "purchase2"])
        : Promise.resolve(["supplierEdge1", "supplierEdge2"])
    );

    const result = await getEdges({ getEdges: mockGetEdges });

    expect(result).toEqual([
      "purchase1",
      "purchase2",
      "supplierEdge1",
      "supplierEdge2",
    ]);
  });
  it("works for emptry filter result", async () => {
    const mockGetEdges = jest.fn((filter) =>
      filter === "PurchasedFrom"
        ? Promise.resolve([])
        : Promise.resolve(["supplierEdge1", "supplierEdge2"])
    );

    const result = await getEdges({ getEdges: mockGetEdges });

    expect(result).toEqual(["supplierEdge1", "supplierEdge2"]);
  });
});
