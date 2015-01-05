$(document).ready(function() {
  vimrc.init();
});


var vimrc = {};

vimrc.init = function() {
  vimrc.colors();
  vimrc.settings();
  vimrc.boxplots();
};

vimrc.colors = function() {
  var $el = $("#color-distribution");
  var colors = [["solarized",69],["desert",22],["molokai",18],["ir_black",15],["railscasts",14],["jellybeans",12],["vividchalk",11],["zenburn",10],["desert256",6],["wombat256",5],["torte",4],["lucius",4],["evening",4],["wombat",3],["koehler",3],["blue",3],["herald",3],["goerz",3],["topfunky-light",3],["twilight",2],["gredark",2],["mustang",2],["slate",2],["anotherdark",2],["hybrid",2],["delek",2],["inkpot",2],["xoria256",2],["darkblue",2],["ir_black_mod",2],["blackboard",2],["256-grayvim",2],["idleFingers",1],["pablo",1],["peaksea",1],["pyte",1],["oceanblack",1],["rdark",1],["rkadeColor",1],["ron",1],["rues",1],["sand",1],["mydefault",1],["elflord",1],["mycolors",1],["softlight",1],["my",1],["default",1],["mustangpp",1],["sunburst",1],["flux",1],["textmate",1],["moria",1],["tir_black_infinity",1],["molokai_mod",1],["tomorrow",1],["getafe",1],["darkspectrum",1],["mlessnau",1],["darkZ",1],["mdskinner",1],["dante",1],["maroloccio",1],["vibrantink",1],["Mustang",1],["candycode",1],["herald_JeffCustom",1],["calmar256-dark",1],["leo",1],["wombat-256",1],["lanai",1],["bensday",1],["kraihlight",1],["wombat256mod",1],["herald_pc",1],["badwolf",1],["kamakou",1],["ydream",1],["jellyx",1],["lucius-transparent",1],["elise",1]];

  for (var i = 0, len = colors.length; i < len; i++) {
    var height = colors[i][1]*2;
    var bar = $('<div>');
    bar.css('height', height);
    bar.html(colors[i][0]);

    $el.append(bar);
  }
};

vimrc.settings = function() {
  var settings = [{"name":"autoindent","value":657},{"name":"number","value":643},{"name":"backup","value":612},{"name":"list","value":606},{"name":"nocompatible","value":574},{"name":"incsearch","value":557},{"name":"ru","value":538},{"name":"sc","value":524},{"name":"hls","value":520},{"name":"expandtab","value":495},{"name":"hlsearch","value":493},{"name":"ignorecase","value":491},{"name":"wrap","value":488},{"name":"ruler","value":481},{"name":"ic","value":476},{"name":"eol","value":469},{"name":"smartcase","value":434},{"name":"ai","value":420},{"name":"wildmenu","value":415},{"name":"complete","value":410},{"name":"showmatch","value":392},{"name":"nobackup","value":339},{"name":"showcmd","value":326},{"name":"hid","value":321},{"name":"visualbell","value":314},{"name":"cin","value":305},{"name":"smarttab","value":295},{"name":"showmode","value":274},{"name":"hidden","value":265},{"name":"wildmode","value":252},{"name":"paste","value":249},{"name":"noerrorbells","value":245},{"name":"autoread","value":226},{"name":"cursorline","value":220},{"name":"smartindent","value":205},{"name":"vb","value":201},{"name":"nowrap","value":196},{"name":"swapfile","value":181},{"name":"noswapfile","value":175},{"name":"title","value":164},{"name":"novisualbell","value":162},{"name":"clipboard","value":158},{"name":"modeline","value":158},{"name":"copyindent","value":145},{"name":"more","value":143},{"name":"foldenable","value":112},{"name":"lazyredraw","value":97},{"name":"mh","value":94},{"name":"shellslash","value":94},{"name":"gdefault","value":86},{"name":"linebreak","value":85},{"name":"shiftround","value":82},{"name":"ttyfast","value":77},{"name":"writebackup","value":76},{"name":"autowrite","value":75},{"name":"fen","value":75},{"name":"cindent","value":72},{"name":"wb","value":72},{"name":"modelines","value":71},{"name":"spell","value":69},{"name":"warn","value":68},{"name":"nowritebackup","value":66},{"name":"bin","value":63},{"name":"nolist","value":54},{"name":"timeout","value":54},{"name":"magic","value":52},{"name":"cpo","value":51},{"name":"splitright","value":50},{"name":"cursorcolumn","value":47},{"name":"splitbelow","value":46},{"name":"undofile","value":45},{"name":"autochdir","value":41},{"name":"nofoldenable","value":41},{"name":"noex","value":40},{"name":"nomodeline","value":39},{"name":"nowb","value":38},{"name":"lbr","value":36},{"name":"noexpandtab","value":36},{"name":"nohls","value":32},{"name":"wrapscan","value":28},{"name":"confirm","value":26},{"name":"nocp","value":25},{"name":"nohlsearch","value":25},{"name":"cst","value":24},{"name":"mousehide","value":24},{"name":"startofline","value":23},{"name":"equalalways","value":22},{"name":"nostartofline","value":22},{"name":"bomb","value":21},{"name":"nolazyredraw","value":20},{"name":"exrc","value":18},{"name":"relativenumber","value":17},{"name":"ttimeout","value":17},{"name":"autowriteall","value":16},{"name":"secure","value":15},{"name":"anti","value":12},{"name":"binary","value":12},{"name":"noequalalways","value":11},{"name":"infercase","value":10},{"name":"nosmartindent","value":10},{"name":"notimeout","value":10},{"name":"joinspaces","value":9},{"name":"noautowrite","value":9},{"name":"rnu","value":9},{"name":"showfulltag","value":9},{"name":"cul","value":8},{"name":"esckeys","value":8},{"name":"noautoindent","value":8},{"name":"nocursorline","value":8},{"name":"noeb","value":8},{"name":"noeol","value":8},{"name":"nonu","value":7},{"name":"noshowmatch","value":7},{"name":"nosmarttab","value":7},{"name":"backupcopy","value":6},{"name":"nojoinspaces","value":6},{"name":"nowrapscan","value":6},{"name":"sb","value":6},{"name":"tildeop","value":6},{"name":"cf","value":5},{"name":"lz","value":5},{"name":"nonumber","value":5},{"name":"nospell","value":5},{"name":"preserveindent","value":5},{"name":"scs","value":5},{"name":"antialias","value":4},{"name":"cscopetag","value":4},{"name":"noautochdir","value":4},{"name":"nobomb","value":4},{"name":"nocursorcolumn","value":4},{"name":"noet","value":4},{"name":"noignorecase","value":4},{"name":"noshowmode","value":4},{"name":"notitle","value":4},{"name":"noautowriteall","value":3},{"name":"nobk","value":3},{"name":"nocindent","value":3},{"name":"noexrc","value":3},{"name":"noic","value":3},{"name":"noincsearch","value":3},{"name":"tagbsearch","value":3},{"name":"noai","value":2},{"name":"noautoread","value":2},{"name":"nobinary","value":2},{"name":"nocscopeverbose","value":2},{"name":"nohidden","value":2},{"name":"nopaste","value":2},{"name":"norelativenumber","value":2},{"name":"noscrollbind","value":2},{"name":"notagbsearch","value":2},{"name":"writeany","value":2},{"name":"cursorrow","value":1},{"name":"noantialias","value":1},{"name":"noar","value":1},{"name":"nocul","value":1},{"name":"nodigraph","value":1},{"name":"noea","value":1},{"name":"noesckeys","value":1},{"name":"nofen","value":1},{"name":"nofsync","value":1},{"name":"nogdefault","value":1},{"name":"noicon","value":1},{"name":"noimdisable","value":1},{"name":"noinfercase","value":1},{"name":"nomore","value":1},{"name":"noruler","value":1},{"name":"noshowcmd","value":1},{"name":"nosmartcase","value":1},{"name":"nosplitbelow","value":1},{"name":"notbs","value":1},{"name":"notildeop","value":1},{"name":"nottimeout","value":1},{"name":"restorescreen","value":1},{"name":"spr","value":1},{"name":"wildignorecase","value":1}];
  var $el = $("#settings table");
  var className;

  for (var i = 0, len = settings.length; i < len; i++) {
    className = i > 20 && i < settings.length - 20 ? 'hide' : '';
    $el.append("<tr class='"+className+"'><td><code>" + settings[i].name + "</code></td><td>" + settings[i].value + "</td></tr>");
  }

};

vimrc.boxplots = function() {
  var defaults = {type: 'box', width: '200px', disableHiddenCheck: true};

  var history = ["1000","50","50","1000","200","50","1000","500","100","1000","50","500","1000","50","100","1000","50","1000","1000","1000","1000","200","1000","1000","50","700","100","50","1000","50","50","50","100","1000","3000","1000","50","1000","50","10000","50","1000","1000","500","1000","300","100","1000","1000","1500","50","700","1000","1000","50","50","700","50","50","32","400","500","300","1000","10000","50","1000","500","50","500","50","100","1000","50","400","700","1000","1000","50","50","500","50","1000","1000","1000","1000","500","50","1000","100","1000","700","1000","1000","100","1000","500","50","200","50","50","100","50","50","50","100","50","500","100","1000","500","50","1000","768","700","50","100","1000","50","1000","1000","50","50","100","50","700","1000","100","10000","50","700","1000","1000","50","50","1000","50","500","50","1000","700","50","100","1000","50","500","100","100","50","500","1000","1000","400","50","1000","50","100","1000","500","50","1000","1000","50","500","1000","700","500","100","1000","2000","1000","50","1000","50","1000","50","1000","50","1000","10000","1000","500","0","50","50","700","50","1000","500","1000","50","500","1000","1000","256","50","1000","50","50","1000","1000","50","50","1000","10000","1000","700","50","50","50","50","50","500","40","1000","1000","1000","500","50","1000","200","50","50","50","50","50","50","500","200","500","50","700","100","1000","1000","1000","50","1000","1000","256","50","128","700","50","1000","1000","700","100","500","1000","50","100","50","50","1000","1000","1000","50","1000","300","100","50","500","50","2000","50","50","50","1000","1000","1000","50","1000","50","50","50","50","700","50","50","300","1000","50","1000","1000","1000","50","50","10000","1000","50","10000","500","10000","50","300","50","1000","256","100","50","1000","1000","1000","1000","50","1000","500","200","200","50","50","400","1000","1000","50","1000","50","1000","1000","1000","1000","50","50","50","50","50","100","50","100","2000","1000","1000","500","50","1000","1000","1000","200","50","1000","1000","1000","256","50","50","200","50","50","50","768","700","800","50","100","1000","400","50","500","1000","500","50","200","1000","50","50","1000","10000","50","500","1000","1000","50","50","50","128","50","1000","400","1000","200","50","50","500","1000","50","50","1000","1000","1024","1000","50","1000","50","1000","50","400"];
  var tabstop = [null, 142, null, 287, null, null, null, 29];
  var scrolloff = ["3","4","8","3","3","5","3","3","8","3","3","5","2","5","3","4","3","3","3","2","3","3","3","3","5","3","10","3","3","3","5","3","12","3","10","3","4","4","3","4","3","3","5","4","3","3","3","10","3","3","5","2","3","3","5","8","3","7","3","2","10","3","5","3","3","5","3","5","3","4","2","5","4","3","3","3","3","5","3","3","4","3","4","3","4","3","3","4","3","3","4","3","2","4","3","2","8","3","4","3","3","5","5","3","3","3","4","5","5","3","7","3","4","4","2","3","10","3","3","2","4","7","4","5","4","3","0","3","5","10","4","4","2","5","3","3","10","1","4","3","3","4","3","10","3","1","3","3","3","5","3","2","7","4","4","2","4","3","3","5","10","8","4","8","10","3","7","3","4","5","5","3","5","10","4","3","20","3","4","6","2","3","3","2","3","3","8","2","3","2","5","3","3","8","8","3","3","4","3","3","3","3","5","5","3","3","10","3","3","3","3","3","5","3","3","3","3","3","3","5","5","3","3","3","3","1","3","3","3","3","4","3","4","5","2","4","7","3","6","2","3","3","2","3","4","4","4","4","3"];
  var codewidth = [ 24, 1, 3, 9, 35, 15, 2, 3, 4, 1, 1, 1];
  var fonts = [1,4,5,1,2,1,13,1,1,13,1,19,1,5,1,1,1,1,1,1];

  $('.spark-history').sparkline(history, defaults);

  $('.spark-tabstop').sparkline(tabstop, {
    type: 'bar',
    tooltipFormat: '<span>{{offset:names}} - {{value}}</span>',
    tooltipValueLookups: {
      names: {
          1: '2 Spaces',
          3: '4 Spaces',
          7: '8 Spaces'
      }
    }
  });

  $('.spark-scrolloff').sparkline(scrolloff, defaults);

  $('.spark-codewidth').sparkline(codewidth, {
    type: 'bar',
    tooltipFormat: '<span>{{offset:names}} - {{value}}</span>',
    tooltipValueLookups: {
      names: {
        0:"0 characters",
        1:"70 characters",
        2:"72 characters",
        3:"78 characters",
        4:"79 characters",
        5:"80 characters",
        6:"85 characters",
        7:"100 characters",
        8:"120 characters",
        9:"137 characters",
        10:"255 characters",
        11:"500 characters"
      }
    }
  });

  $('.spark-fonts').sparkline(codewidth, {
    type: 'bar',
    tooltipFormat: '<span>{{offset:names}} - {{value}}</span>',
    tooltipValueLookups: {
      names: {
        0: "anonymous",
        1: "bitstream",
        2: "consolas",
        3: "courier",
        4: "dejavu",
        5: "droid",
        6: "inconsolata",
        7: "liberation",
        8: "lucida_console",
        9: "menlo",
        10: "microsoft",
        11: "monaco",
        12: "mono",
        13: "monospace",
        14: "nimbus",
        15: "osaka",
        16: "oxygenmono",
        17: "pragmatapro",
        18: "terminus",
        19: "ubuntu"
      }
    }
  });

}