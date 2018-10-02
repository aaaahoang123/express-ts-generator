import {Request, Response, Router} from "express";
import Axios from "axios";
import {JSDOM} from "jsdom";

export class IndexRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routing();
    }

    routing() {
        this.router.get("/", async (req: Request, res: Response) => {
            const response: any[] = [];
            for (let i=9; i>=0; i--) {
                let promises = [];
                for (let j = 10; j>0; j--) {
                    promises.push(Axios.get(`https://xem.vn/new/${i*10 + j}`));
                }

                for (let p of promises) {
                    try {
                        const dom = new JSDOM((await p).data);
                        let blocks = dom.window.document.querySelectorAll('.photoListItem > .thumbnail');
                        for (let b of blocks) {
                            let b1: Element = b;
                            response.push({
                                img: b1.querySelector('img').src,
                                title: b1.querySelector('img').alt
                            })
                        }
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }

            res.send(response);
        });
    }
}
