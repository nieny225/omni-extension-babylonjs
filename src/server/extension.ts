

import { OAIBaseComponent, type WorkerContext, OmniComponentMacroTypes , BlockCategory as Category } from 'omni-sockets'

const NS_OMNI = 'omni-extension-babylonjs'

// SharpRotationComponent
const component = OAIBaseComponent
  .create(NS_OMNI, "sceneDefinition")
  .fromScratch()
  .set('description', 'Create a babylonjs scene')
  .set('title', 'Create Babylon Scene')
  .set('category', Category.TESTING)
  .setMethod('X-CUSTOM')

component
  .addInput(
    component.createInput('json', 'object', 'json')
      .set('description', 'The image(s) to rotate')
      .setRequired(true)
      .setControl({
        controlType: 'AlpineCodeMirrorComponent'
      })
      .toOmniIO()
  )

  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {


    ctx.app.sendMessageToSession (
      ctx.sessionId,
      "Press button to view" + JSON.stringify(payload.jsons, null, 2),
      'text/markdown',
      {
        commands: [
          {
            title: 'View Scene',
            id: 'showBabylonScene',
            args: payload.json
          }
        ]
      })



    return {...payload}
  })

const SceneComponent = component.toJSON()

let components = [SceneComponent];

export default {
  createComponents: () => ({
    blocks: components,
    patches: []
  })
}