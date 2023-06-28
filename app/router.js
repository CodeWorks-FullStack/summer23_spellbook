import { AboutController } from "./controllers/AboutController.js";
import { HomeController } from "./controllers/HomeController.js";
import { SandboxSpellsController } from "./controllers/SandboxSpellsController.js";
import { SpellsController } from "./controllers/SpellsController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";
import { DnDSpellsView } from "./views/DnDSpellsView.js";

/**
 * Register your routes for the application here
 * @type {Route[]}
 */
export const router = [
  {
    path: '',
    controller: [SpellsController, SandboxSpellsController],
    view: DnDSpellsView
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  },
  {
    path: '#/mySpells',
    controller: SandboxSpellsController,
    view: ''
  },
]






/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */