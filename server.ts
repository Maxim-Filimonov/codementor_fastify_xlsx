// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
import xlsx from "node-xlsx";

// Declare a route
fastify.get("/", async (_request: any, reply: any) => {
  const projectId = "prj_id";
  const suppliers = await getData(projectId);
  const header = ["Id", "SupplierName"];
  const data = convertToExcelData(suppliers, header);
  const buffer = createExcelFile(data);

  reply.header("Content-Disposition", "attachment;filename=supplies.xlsx");
  reply.send(buffer);
});

// function transformSupplier(supplier: Supplier): any[] {
//   return [

//   ]
// }

function convertToExcelData(suppliers: Supplier[], header: string[]) {
  return suppliers.reduce(
    (acc: any[][], sup: Supplier) => {
      acc.push([sup.id, sup.name]);
      return acc;
    },
    [header]
  );
}

function createExcelFile(data: any[][]) {
  console.log("WRITING TO EXCEL", data);
  return xlsx.build([{ name: "Nodes", data: data }]);
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
