const sep = ';';

/* Renvoie sous forme d'une liste les valeurs contenues 
 dans une chaîne de caractère en utilisant le séparateur
 défini en constante.
Param :   line : String
return :  values : list of String 
*/
function getCsvValuesFromLine(line) {
  var values = line.split(sep);
  value = values.map(function(value) {
    return value.replace(/\"/g, '');
  });
  return values;
}

/*Renvoie sous forme d'une liste d'Object 
 (voir doc : Object key-values)les informations
 contenues dans un fichier CSV passé sous la forme
 d'une liste de chaînes de caractères.
Param :   lines : list of String
return :  people : list of String 
*/
function getLinesFromHTML(lines) {
  //on récupère la première ligne comme header et on la retire
  var headers = getCsvValuesFromLine(lines[0]);
  lines.shift();
  //On crée un tableau pour contenir les individus du dataset
  var people = [];
  for (var i = 0; i < lines.length; i += 1) {
    //chaque case est un Object rempli avec les paires clé/valeur
    people[i] = {};
    var lineValues = getCsvValuesFromLine(lines[i]);
    for (var j = 0; j < lineValues.length; j += 1) {
      people[i][headers[j]] = lineValues[j];
    }
  }
  return people;
}

//variable globale pour le contenu (texte) du CSV
var CSVcontent;

//Filereader pour le flux de lecture
const fileInput = document.getElementById('csv')
const readFile = () => {
  const reader = new FileReader()
  reader.onload = () => {
    CSVcontent = reader.result;
  }
  // lit le fichier et appelle l'événement "onload" ensuite
  reader.readAsText(fileInput.files[0])
}

//Définition de la fonction associé au bouton "load"

var tableau = [];
var btn = document.querySelector('button');
btn.onclick = function() {
  var lines = CSVcontent.split('\n');
  tableau = ret();
}

fileInput.addEventListener('change', readFile)

var ret = function() {
  var K = CSVcontent.split('\n');
  for (let i = 0; i < K.length; i++) {
    tableau[i] = K[i].split(',');
  }
  run();
}




PieChartHF = function() {
  var Femme = 0;
  var Homme = 0;
  for (let i = 1; i < tableau.length; i++) {
    if (tableau[i][3] === "Femme") {
      Femme = Femme + 1;
    }
    else if (tableau[i][3] === "Homme") {
      Homme = Homme + 1;
    }
  }
  var data = [{
    values: [Homme, Femme], // Example data: 50 men, 30 women
    labels: ['Homme', 'Femme'],
    type: 'pie'
  }];
  var layout = {
    height: 400,
    width: 400,
    margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
    showlegend: true
  };

  // Plot the chart
  Plotly.newPlot('HF', data, layout);

}


FiliereChoisie = function() {
  var Droit = 0, CS = 0, Lettre = 0, Sante = 0, Staps = 0;
  for (let i = 1; i < tableau.length; i++) {
    if (tableau[i][8] === "Droit") {
      Droit = Droit + 1;
    }
    else if (tableau[i][8] === "Sciences et informatiques") {
      CS = CS + 1;
    }
    else if (tableau[i][8] === "Lettres et sciences humaines") {
      Lettre = Lettre + 1;
    }
    else if (tableau[i][8] === "Staps") {
      Staps = Staps + 1;
    }
    else if (tableau[i][8] === "Sante") {
      Sante = Sante + 1;
    }
  }
  var data = [{
    y: [Droit, CS, Lettre, Sante, Staps], // Example data: 50 men, 30 women
    x: ['Droit Sciences Eco-Gest', 'Sciences et Info', 'Lettres&SH', 'Staps', 'Sante'],
    type: 'bar'
  }];
  var layout = {
    height: 400,
    width: 400
  };

  // Plot the chart
  Plotly.newPlot('filiere', data, layout);

}


Alternance = function() {
  var Oui = 0, Non = 0;
  for (let i = 1; i < tableau.length; i++) {
    if (tableau[i][5] === "Oui") {
      Oui = Oui + 1;
    }
    else {
      Non = Non + 1;
    }
  }
  var data = [

    {

      domain: { x: [0, 1], y: [0, 1] },

      value: (Oui / tableau.length) * 100,

      type: "indicator",

      mode: "gauge+number",

      delta: { reference: 100 },

      gauge: { axis: { range: [null, 100] } }

    }
  ];
  var layout = {
    height: 400,
    width: 400
  };

  // Plot the chart
  Plotly.newPlot('alternance', data, layout);

}

PublicPriv = function() {
  var Public = 0, Prive = 0;
  for (let i = 1; i < tableau.length; i++) {
    if (tableau[i][12] === "PU") {
      Public = Public + 1;
    }
    else {
      Prive = Prive + 1;
    }
  }

  var trace1 = {
    x: ['Etablissement privé/public'],
    y: [Public],
    name: 'Public',
    type: 'bar'
  };


  var trace2 = {
    x: ['Etablissement privé/public'],
    y: [Prive],
    name: 'Privé',
    type: 'bar'
  };
  var data = [trace1, trace2];
  var layout = {
    barmode: 'stack',
    height: 400,
    width: 400
  };
  Plotly.newPlot('etablissement', data, layout);
}


Typeetab = function() {
  var Universite = 0, Autre = 0, EcoleInge = 0, Lycee = 0, EESPIG = 0;
  for (let i = 1; i < tableau.length; i++) {
    if (tableau[i][11] === "Universites") {
      Universite = Universite + 1;
    }
    else if (tableau[i][11] === "Lycee") {
      Lycee = Lycee + 1;
    }
    else if (tableau[i][11] === "Autres etablissements") {
      Autre = Autre + 1;
    }
    else if (tableau[i][11] === "ecoles d'ingenieurs") {
      EcoleInge = EcoleInge + 1;
    }
    else if (tableau[i][11] === "EESPIG") {
      EESPIG = EESPIG + 1;
    }
  }
  var data = [{
    y: [Universite, EcoleInge, Lycee, EESPIG, Autre],
    x: ['Universités', "École d'ingénieurs", 'Lycée', 'EESPIG', 'Autres établissements'],
    type: 'bar'
  }];
  var layout = {
    height: 400,
    width: 400
  };
  Plotly.newPlot('typeetablissement', data, layout);
}



formation = function() {
  var BUT = 0, Autre = 0, EcoleInge = 0, Doctorat = 0, STS = 0, Sante = 0, CPGE = 0, daes = 0, Master = 0, Licence = 0;
  for (let i = 1; i < tableau.length; i++) {
    if (tableau[i][6] === "BUT") {
      BUT++;
    } else if (tableau[i][7] === "Diplemes d'etablissement ou d'acces aux etudes universitaires") {
      daes++;
    } else if (tableau[i][7] === "ecoles d'ingenieurs") {
      EcoleInge++;
    } else if (tableau[i][7] === "Doctorat") {
      Doctorat++;
    } else if (tableau[i][7] === "STS") {
      STS++;
    } else if (tableau[i][7] === "Sante") {
      Sante++;
    } else if (tableau[i][7] === "CPGE") {
      CPGE++;
    } else if (tableau[i][7] === "Master (dont MEEF)") {
      Master++;
    } else if (tableau[i][7] === "Licence (dont professionnelle et acces sante)") {
      Licence++;
    } else {
      Autre++;
    }
  }
  var data = [{
    values: [BUT, Autre, EcoleInge, Doctorat, STS, Sante, CPGE, daes, Master, Licence],
    labels: ['BUT', 'Autre', 'EcoleInge', 'Doctorat', 'STS', 'Sante', 'CPGE', 'daes', 'Master', 'Licence'],
    type: 'pie'
  }];

  var layout = {
    height: 400,
    width: 400,
    margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
    showlegend: true
  };

  Plotly.newPlot('formation', data, layout);
}







var run = function() {
  PieChartHF();
  FiliereChoisie();
  Alternance();
  PublicPriv();
  Typeetab();
  formation();
}
