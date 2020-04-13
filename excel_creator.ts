type Edge = {};
interface Api {
  getEdges(filter: string): Promise<Edge[]>;
}
async function getEdgesForPurchases(api: Api) {
  const purchased = await api.getEdges("PurchasedFrom");
  if (purchased.length === 1) {
    return [];
  }
  return purchased;
}
function getEdgesForSupplier(api: Api) {
  return api.getEdges("HasSupplier");
}
class RealApi implements Api {
  getEdges(filter: string): Promise<Edge[]> {
    return Promise.resolve([1, 2, 3]);
  }
}
export async function getEdges(api: Api = new RealApi()): Promise<Edge[]> {
  const purchasedEdges = await getEdgesForPurchases(api);
  const supplierEdges = await getEdgesForSupplier(api);
  return purchasedEdges.concat(supplierEdges);
}
