function createScript()
{
  return {
    description: "Create a Babylon scene from the current chat",
    title: "Show Babylon",
    exec(args){

        window.client.workbench.showExtension("omni-extension-babylonjs", {roofTexture: args[0]});
        //window.open(`./extensions/omni-extension-flipbook/?images=${encodeURIComponent(JSON.stringify(images))}`, '_blank', 'popup=1,toolbar=0,location=0,menubar=0');
        window.client.sendSystemMessage(`Flipbook created, please check the extensions tab`, "text/markdown",
        {
          commands:
          [
            {
              title: 'Show Flipbook',
              id: 'toggleExtensions',
              args: []
            }
          ]
        });
        return true;
    }
  }
}

