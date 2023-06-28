import { AppState } from "../AppState.js";
import { spellsService } from "../services/SpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawSpells() {
  const spells = AppState.spells

  let template = ''

  // NOTE I am storing pojos in the AppState.spells, so they do not have their own HTML templates stored on the objects. I just build out a simple one inside the forEach loop instead
  spells.forEach(spell => {
    template += `
    <li onclick="app.SpellsController.getSpellDetails('${spell.index}')" class="mb-2 selectable fs-4" role="button">${spell.name}</li>
    `
  })

  setHTML('spellList', template)
}

function _drawActiveSpell() {
  const spell = AppState.activeSpell
  setHTML('spellDetails', spell.DetailsTemplate)
}

export class SpellsController {
  constructor () {
    // SECTION page load
    console.log('spells controller loaded');
    this.getSpells()


    // SECTION state changes
    AppState.on('spells', _drawSpells)
    AppState.on('activeSpell', _drawActiveSpell)
  }

  async getSpells() {
    try {
      await spellsService.getSpells()
    } catch (error) {
      console.error(error);
      Pop.error(error.message);
    }
  }

  async getSpellDetails(spellIndex) {
    try {
      await spellsService.getSpellDetails(spellIndex)
    } catch (error) {
      console.error(error);
      Pop.error(error.message);
    }
  }
}