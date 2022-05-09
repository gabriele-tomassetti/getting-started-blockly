Blockly.defineBlocksWithJsonArray([{
    "type": "scoring_block",
    "message0": "Minimum Score %1 %2",
    "args0": [
      {
        "type": "field_number",
        "name": "minimum_score",
        "value": 0
      },
      {
        "type": "input_statement",
        "name": "algorithm"
      }
    ],
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  },  
  {
    "type": "condition_block",
    "message0": "if element %1 add the value %2 else add the value %3",
    "args0": [
      {
        "type": "input_value",
        "name": "condition",
        "check": "Boolean"
      },
      {
        "type": "input_value",
        "name": "do_this",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "else_do",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
  },  
  {
    "type": "features_list",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "feature",
        "options": [
          [
            "Age",
            "AGE"
          ],
          [
            "Sales",
            "SALES"
          ],
          [
            "Click rate",
            "CLICKRATE"
          ]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "comparison",
        "options": [
          [
            "<",
            "LESS"
          ],
          [
            ">",
            "GREATER"
          ],
          [
            "=",
            "EQUALS"
          ],
          [
            "≠",
            "DIFFERENT"
          ]
        ]
      },
      {
        "type": "field_number",
        "name": "feature_value",
        "value": 0
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "has_tag",
    "message0": "has tag %1 add value %2",
    "args0": [     
      {
        "type": "input_dummy",
        "name": "tag",
      },
      {
        "type": "field_number",
        "name": "tag_value",
        "value": 0
      }
    ],
    "extensions": ["dynamic_menu_extension"],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "user_block",
    "message0": "Sales %1 $ %2 Click Rate %3 %% %4 Last Activity %5 days ago %6 Tags %7",
    "args0": [
      {
        "type": "field_number",
        "name": "SALES",
        "value": 0
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_number",
        "name": "CLICKRATE",
        "value": 0
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_number",
        "name": "AGE",
        "value": 0
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "Tags",
        "check": "Array"
      }
    ],
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "block_tag",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "tag",
        "text": "default"
      },
      {
        "type": "input_value",
        "name": "input_tags"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

  Blockly.Extensions.register('dynamic_menu_extension',
  function() {
    this.getInput('tag')
      .appendField(new Blockly.FieldDropdown(
        function() {
          var options = [];
          options.push(["parsing", "PARSING"]);
          options.push(["DSL", "DSL"]);
          return options;
        }), 'tag');
  });

  Blockly.JavaScript['scoring_block'] = function(block) {
    var number_minimum_score = block.getFieldValue('minimum_score');
    var statements_algorithm = Blockly.JavaScript.statementToCode(block, 'algorithm');
    var code = 'function scoreUser(user) {\n' + 
               'var score = 0;\n' +
               statements_algorithm +
               'if (score >= ' +
               number_minimum_score + ')\n' +
               "return true;\n else\n return false;\n" +
               '}\n';
    return code;
  };
  
  Blockly.JavaScript['condition_block'] = function(block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var value_do_this = Blockly.JavaScript.valueToCode(block, 'do_this', Blockly.JavaScript.ORDER_ATOMIC);
    var value_else_do = Blockly.JavaScript.valueToCode(block, 'else_do', Blockly.JavaScript.ORDER_ATOMIC);    
    var code = 'if (' + value_condition + ') {\n score += ' + value_do_this + '; }\n' +
                'else {\n score += ' + value_else_do + '; }\n';    
    return code;
  };

  Blockly.JavaScript['features_list'] = function(block) {
    var dropdown_feature = block.getFieldValue('feature');
    var dropdown_comparison = block.getFieldValue('comparison');

    var dropdown_comparison_text = '';
    switch (dropdown_comparison) {
        case 'LESS':
            dropdown_comparison_text = "<";
            break;
        case 'GREATER':
            dropdown_comparison_text = ">";
            break;
        case 'EQUALS':
            dropdown_comparison_text = "==";
            break;
        case 'DIFFERENT':
            dropdown_comparison_text = "!=";
            break;        
      }
      

    var number_feature_value = block.getFieldValue('feature_value');    
    var code = 'user.' + dropdown_feature + ' ' + dropdown_comparison_text + ' ' 
                + number_feature_value;                    
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript['has_tag'] = function(block) {
    var dropdown_tag = block.getFieldValue('tag');
    var number_tag_value = block.getFieldValue('tag_value');
    var code = 'if (user.hasTag("' + dropdown_tag + '")) {\n score += ' + number_tag_value + '; }\n';    
    return code;
  };  

  Blockly.JavaScript['user_block'] = function(block) {
    var number_sales = block.getFieldValue('SALES');
    var number_clickrate = block.getFieldValue('CLICKRATE');    
    var number_age = block.getFieldValue('AGE');        
    var value_tags = Blockly.JavaScript.valueToCode(block, 'Tags', Blockly.JavaScript.ORDER_NONE);
    
    var code =  'var user = {\n' +
                '    SALES: ' + number_sales + ',\n' + 
                '    CLICKRATE: ' + number_clickrate + ',\n' + 
                '    AGE: ' + number_age + ',\n' + 
                '    TAGS: ' + "[" + value_tags.split(',').filter(tag => tag.length > 2) + "]" + ',\n' + 
                '    hasTag: function(tag) {\n' +
                '        return this.TAGS.includes(tag.toLowerCase());\n' +
                '    }\n' +
                '};\n';
    return code;    
  };

  function getTag(text) {
    return '"' + text.toLowerCase() + '"';
  }

  function getTags(text) {
    let tags = [];
    
    let textInputTag = text.substring(text.indexOf("text_input_tag=") + 16,
                                      text.indexOf('"', text.indexOf("text_input_tag=") + 16));
    let valueTag = text.substring(text.indexOf("value_tag=") + 11,
                                  text.length - 2);
	  if(valueTag.length != 0) {
      tags.push(...getTags(valueTag));	  
    }
	
	  tags.push(getTag(textInputTag));

    return tags;
  }

  Blockly.JavaScript['block_tag'] = function(block) {
    var tag = block.getFieldValue('tag');
    var input_tags = Blockly.JavaScript.valueToCode(block, 'input_tags', Blockly.JavaScript.ORDER_NONE);
    
    //var code = 'tag="' + tag + '" input_tags="' + input_tags + '"';    
    var code = [ "'" + tag + "'" , (input_tags || "''") ];
    return [code, Blockly.JavaScript.ORDER_NONE];
  };