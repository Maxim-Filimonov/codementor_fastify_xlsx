// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
import xlsx from "node-xlsx";

// Declare a route
fastify.get("/", async (_request: any, reply: any) => {
  const projectId = "prj_id";
  const suppliers = await getData(projectId);
  const data = suppliers.map((sup: Supplier) => [sup.id, sup.name]);
  console.log("DATA:", data);
  const buffer = createExcel(data);

  reply.header("Content-Disposition", "attachment;filename=supplies.xlsx");
  reply.send(buffer);
});

function createExcel(data: any) {
  return xlsx.build([{ name: "Nodes", data }]);
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
