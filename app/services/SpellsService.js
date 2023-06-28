import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { dndApi } from "./AxiosService.js"

class SpellsService {

  async getSpellDetails(spellIndex) {
    const res = await dndApi.get(`api/spells/${spellIndex}`)

    console.log('got spell details', res.data);

    // NOTE our res.data is single object containing all of the relevant info we need, so we don't use map here
    const newSpell = new Spell(res.data)

    AppState.activeSpell = newSpell
  }
  async getSpells() {
    // NOTE we use the axios instance that has the dndApi as its baseURL
    const res = await dndApi.get('api/spells')

    console.log('got spells', res.data);

    // NOTE we don't turn this array of pojos into our class model, since they are fairly simple objects
    AppState.spells = res.data.results
  }

}

export const spellsService = new SpellsService()