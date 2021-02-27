import { Application, Router, viewEngine, engineFactory, adapterFactory } from "./deps.js";
import { getData } from "./final-solution.js";

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
	render('root.ejs')
}

const data_api = async ({response}) => {
	try{
		response.body = await getData()
	}catch(e) {
		console.log(e)
	}
}

router.get('/', get_root)
router.get('/api/products', data_api)

app.use(router.routes());

app.listen({ port: port });

export default app;