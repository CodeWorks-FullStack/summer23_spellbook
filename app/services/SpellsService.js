import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { dndApi } from "./AxiosService.js"

class SpellsService {
  async getSpellDetails(spellIndex) {
    const res = await dndApi.get(`api/spells/${spellIndex}`)
    console.log('got spell details', res.data);

    const newSpell = new Spell(res.data)

    AppState.activeSpell = newSpell
  }
  async getSpells() {
    const res = await dndApi.get('api/spells')
    console.log('got spells', res.data);
    AppState.spells = res.data.results
  }

}

export const spellsService = new SpellsService()