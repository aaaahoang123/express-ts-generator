import {Request, Response, Router} from "express";

export class IndexRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routing();
    }

    routing() {
        this.router.get("/", function(req: Request, res: Response) {
            res.render("index", { title: "Express" });
        });
    }
}
