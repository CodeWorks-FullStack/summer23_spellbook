export class Spell {
  constructor (data) {
    this.id = data.id || ''

    this.name = data.name

    this.prepared = data.prepared || false

    this.description = data.description || data.desc.join('\n')

    this.range = data.range
    this.duration = data.duration
    this.damage = data.damage ? typeof (data.damage) == 'string' ? data.damage : data.damage.damage_type.name : 'Does no damage'
    this.level = data.level || 0
    this.material = data.material || 'No material needed'
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.casting_time
    this.components = data.components || []
  }

  get DetailsTemplate() {
    return `
    <div>
      <h2>${this.name}</h2>
      <p>${this.description}</p>
      <h3>Range: ${this.range}</h3>
      <div class="d-flex">
        <h4 class="me-5">Duration: ${this.duration}</h4>
        <h4>Damage: ${this.damage}</h4>
      </div>
      <div class="d-flex mb-3">
        <h5 class="me-5">Level: ${this.level}</h5>
        <h5>Material: ${this.material}</h5>
      </div>
      <button onclick="app.SandboxSpellsController.createSpell()" class="btn btn-outline-dark fs-2">Save to Sandbox</button>
    </div>
    `
  }

  get MySpellListItemTemplate() {
    return `
     <li class="mb-2 fs-4">
        <input ${this.prepared ? 'checked' : ''} onchange="app.SandboxSpellsController.toggleSpellPreparation('${this.id}')" type="checkbox" id="spellPreparation">
        <span class="selectable" onclick="app.SandboxSpellsController.setActiveSpell('${this.id}')" role="button">${this.name}</span> 
      </li>
    `
  }
}

// let spellData = {
//   "higher_level": [],
//   "desc": [
//     "Your magic turns others into beasts. Choose any number of willing creatures that you can see within range. You transform each target into the form of a Large or smaller beast with a challenge rating of 4 or lower. On subsequent turns, you can use your action to transform affected creatures into new forms.",
//     "The transformation lasts for the duration for each target, or until the target drops to 0 hit points or dies. You can choose a different form for each target. A target's game statistics are replaced by the statistics of the chosen beast, though the target retains its alignment and Intelligence, Wisdom, and Charisma scores. The target assumes the hit points of its new form, and when it reverts to its normal form, it returns to the number of hit points it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form. As long as the excess damage doesn't reduce the creature's normal form to 0 hit points, it isn't knocked unconscious. The creature is limited in the actions it can perform by the nature of its new form, and it can't speak or cast spells.",
//     "The target's gear melds into the new form. The target can't activate, wield, or otherwise benefit from any of its equipment."
//   ],
//   "components": [
//     "V",
//     "S"
//   ],
//   "ritual": false,
//   "concentration": true,
//   "casting_time": "1 action",
//   "level": 8,
//   "school": {
//     "index": "transmutation",
//     "name": "Transmutation",
//     "url": "/api/magic-schools/transmutation"
//   },
//   "classes": [
//     {
//       "index": "druid",
//       "name": "Druid",
//       "url": "/api/classes/druid"
//     }
//   ],
//   "subclasses": [],
//   "url": "/api/spells/animal-shapes"
// }