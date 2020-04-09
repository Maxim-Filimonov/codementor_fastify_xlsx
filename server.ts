// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
import xlsx from "node-xlsx";

// Declare a route
fastify.get("/", async (_request: any, reply: any) => {
  const projectId = "prj_id";
  const suppliers = await getData(projectId);
  const header = ["Id", "SupplierName"];
  const data = convertToExcelData(transformSupplier, suppliers, header);
  const buffer = createExcelFile(data, data);

  reply.header("Content-Disposition", "attachment;filename=supplies.xlsx");
  reply.send(buffer);
});

// Transform function to determine how to map supplier to a row in excel
function transformSupplier(supplier: Supplier): any[] {
  return [supplier.id, supplier.name];
}

// Generic function which will take an array of objects and
// convert them to rows for excel file using supplied transform function
function convertToExcelData<T>(
  transformFn: (sup: T) => any[],
  items: T[],
  header: string[]
) {
  return items.reduce(
    (acc: any[][], item: T) => {
      acc.push(transformFn(item));
      return acc;
    },
    [header]
  );
}

// Creates In-memory excel file with data provided
function createExcelFile(suppliers: any[][], edges: any[][]) {
  console.debug("WRITING TO EXCEL", suppliers);
  return xlsx.build([
    { name: "Nodes", data: suppliers },
    { name: "Edges", data: edges },
  ]);
}

//
type Supplier = {
  id: string;
  name: string;
};
function getData(projectId: string): Promise<Supplier[]> {
  return Promise.resolve([
    {
      id: "123",
      name: "magic",
    },
    {
      id: "345",
      name: "other",
    },
  ]);
}

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
