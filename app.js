import { Application, Router, send } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "https://raw.githubusercontent.com/deligenius/view-engine/master/mod.ts";
import { getData } from "./getData.js";

const app = new Application();
let port = 7777;
if (Deno.args.length > 0) {
	const lastArgument = Deno.args[Deno.args.length - 1];
	port = Number(lastArgument);
}

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine));

const router = new Router();

const get_root = async ({ render }) => {
	render('index.ejs')
}


var product_data = {}
const updateData = async() => {
	console.log("Updating local data")
	product_data = await getData()
	setTimeout(updateData, 5*60*1000) // Update local data every 5 mins
}
await updateData()

const data_api = async ({response}) => {
	try{
		response.body = product_data
	}catch(e) {
		console.log(e)
	}
}

router.get('/', get_root)
router.get('/api/products', data_api)

app.use(router.routes());

app.listen({ port: port });
console.log("Site is now running")

export default app;