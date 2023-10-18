// extension.ts
import { OAIBaseComponent, OmniComponentMacroTypes, BlockCategory as Category } from "omni-sockets";

var NS_OMNI = "omni-extension-babylonjs";
var component = OAIBaseComponent.create(NS_OMNI, "sceneDefinition").fromScratch().set("description", "Create a babylonjs scene").set("title", "Create Babylon Scene").set("category", Category.TESTING).setMethod("X-CUSTOM");
component.addInput(
  component.createInput("json", "object", "json").set("description", "The image(s) to rotate").setRequired(true).setControl({
    controlType: "AlpineCodeMirrorComponent"
  }).toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  ctx.app.sendMessageToSession(
    ctx.sessionId,
    "Press button to view" + JSON.stringify(payload.jsons, null, 2),
    "text/markdown",
    {
      commands: [
        {
          title: "View Scene",
          id: "showBabylonScene",
          args: payload.json
        }
      ]
    }
  );
  return { ...payload };
});
var SceneComponent = component.toJSON();
var components = [SceneComponent];
var extension_default = {
  createComponents: () => ({
    blocks: components,
    patches: []
  })
};
export {
  extension_default as default
};
