 (function() {    

  function executeScoring(event, userWorkspace, workspace) {
    
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(userWorkspace);
    code += Blockly.JavaScript.workspaceToCode(workspace);
    // Eval can be dangerous. For more controlled execution, check
    // https://github.com/NeilFraser/JS-Interpreter.
    try {
      var resultContent = document.getElementById("result");
      eval(code);
      if (scoreUser(user)) {
        resultContent.innerHTML = "Example user passes.";
        resultContent.className = "notification is-success";
      }
      else {
        resultContent.innerHTML = "Example user does not passes.";
        resultContent.className = "notification is-danger";
      }
      
    } catch (error) {
      console.log(error);
    }
  }           
  
    // Load Main Block

    var toolbox = document.getElementById("toolbox");

    var workspace = Blockly.inject('blocklyDiv', {
      toolbox: toolbox,
      scrollbars: false,
    });      

    var workspaceBlocks = document.getElementById("workspaceBlocks"); 
    
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);

    // Load User Data Block

    var userToolbox = document.getElementById("userToolbox");

    var userWorkspace = Blockly.inject('blocklyUser', {
      toolbox: userToolbox,
      scrollbars: false,
    });      

    var userBlocks = document.getElementById("userWorkspace"); 
    
    Blockly.Xml.domToWorkspace(userBlocks, userWorkspace);

    document.querySelector('#test').addEventListener('click', function(event){
      executeScoring(event, userWorkspace, workspace)
    });
  })();  