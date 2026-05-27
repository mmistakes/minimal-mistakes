var nodes = null;
var edges = null;
var network = null;

// Called when the Visualization API is loaded.
function draw() {
	// create people.
	// value corresponds with the age of the person
	var DIR = "/assets/images/network/";
	nodes = [
        // Anos
        // {
		// 	id: 2009,
		// 	shape: "diamond",
		// 	//image: DIR + "bruno.png",
		// 	label: "2009"
		// },

        //Pessoas
        {
			id: "eu",
			shape: "circularImage",
			image: DIR + "bruno.png",
			label: "Eu (UFBA/UFOP/UFMG/UESC)",
            color: "#FB7E81",
            size: 70,
		},
		{
			id: "dany",
			shape: "circularImage",
			image: DIR + "dany.png",
			label: "Dany Sanchez (UESC)"
		},
		{
			id: "esbel",
			shape: "circularImage",
			image: DIR + "esbel.png",
			label: "Esbel Orellana (UESC)"
		},
		{
			id: "flip",
			shape: "circularImage",
			image: DIR + "luiz.png",
			label: "Luiz Filipe (UFMG)",
		},
		{
			id: "flop",
			shape: "circularImage",
			image: DIR + "marcos.png",
			label: "Marcos Augusto (UFMG)",
		},
		{
			id: "jussara",
			shape: "circularImage",
			image: DIR + "jussara.png",
			label: "Jussara Almeida (UFMG)",
		},
		{
			id: "olga",
			shape: "circularImage",
			image: DIR + "olga.png",
			label: "Olga Goussevskaia (UFMG)",
		},
		{
			id: "heitor",
			shape: "circularImage",
			image: DIR + "heitor.png",
			label: "Heitor Ramos (UFMG/UFAL)",
		},
		{
			id: "guilherme",
			shape: "circularImage",
			image: DIR + "guilherme.png",
			label: "Guilherme Maia (UFMG)",
		},
		{
			id: "raquel",
			shape: "circularImage",
			image: DIR + "raquel.png",
			label: "Raquel Mini (PUC Minas/UFMG)",
		},
		{
			id: "pedro",
			shape: "circularImage",
			image: DIR + "pedro.png",
			label: "Pedro Olmo (UFMG)",
		},
		{
			id: "paulo",
			shape: "circularImage",
			image: DIR + "paulo.png",
			label: "Paulo Rettore (Fraunhofer)",
		},
		{
			id: "ekler",
			shape: "circularImage",
			image: DIR + "ekler.png",
			label: "Ekler Mattos (UFMS)",
		},
		{
			id: "lorenco",
			shape: "circularImage",
			image: DIR + "lorenco.png",
			label: "Lorenço Pereira (ITA)",
		},
		{
			id: "augusto",
			shape: "circularImage",
			image: DIR + "augusto.png",
			label: "Augusto  Domingues (UFMG)",
		},
		{
			id: "carlos",
			shape: "circularImage",
			image: DIR + "carlos.png",
			label: "Carlos Ferreira (UFOP)",
		},
		{
			id: "mellia",
			shape: "circularImage",
			image: DIR + "mellia.png",
			label: "Marco Mellia (Polito)",
		},
		{
			id: "gabriel",
			shape: "circularImage",
			image: DIR + "gabriel.png",
			label: "Gabriel Reis (UFOP)",
		},
		{
			id: "thiago",
			shape: "circularImage",
			image: DIR + "thiago.png",
			label: "Thiago Silva (UFOP)",
		},
		{
			id: "jamisson",
			shape: "circularImage",
			image: DIR + "jamisson.png",
			label: "Jamisson Junior (UFOP)",
		},
		{
			id: "bambirra",
			shape: "circularImage",
			image: DIR + "bambirra.png",
			label: "Luiz Bambirra (UFOP)",
		},
		{
			id: "roberto",
			shape: "circularImage",
			image: DIR + "roberto.png",
			label: "Roberto Lopes (Fraunhofer)",
		},
		{
			id: "jose",
			shape: "circularImage",
			image: DIR + "jose.png",
			label: "Jose Marcos (UFMG)",
		},
		{
			id: "pantuza",
			shape: "circularImage",
			image: DIR + "pantuza.png",
			label: "Gustavo Pantuza (UFMG)",
		},
		{
			id: "erik",
			shape: "circularImage",
			image: DIR + "erik.png",
			label: "Erik Britto (UFMG)",
		},
		{
			id: "loureiro",
			shape: "circularImage",
			image: DIR + "loureiro.png",
			label: "Antonio Loureiro (UFMG)",
		},
		{
			id: "bruna",
			shape: "circularImage",
			image: DIR + "bruna.png",
			label: "Bruna Peres (Google)",
		},
		{
			id: "otavio",
			shape: "circularImage",
			image: DIR + "otavio.png",
			label: "Otavio Augusto (UFMG)",
		},
		{
			id: "andre",
			shape: "circularImage",
			image: DIR + "andre.png",
			label: "Andre Campolina (UFMG)",
		},
		{
			id: "guidone",
			shape: "circularImage",
			image: DIR + "guidone.png",
			label: "Daniel Guidone (UFSJ)",
		},
		{
			id: "sumika",
			shape: "circularImage",
			image: DIR + "sumika.png",
			label: "Fernanda Sumika (UFSJ)",
		},
		{
			id: "clayson",
			shape: "circularImage",
			image: DIR + "clayson.png",
			label: "Clayson Celes  (Uottawa/UFMG)",
		},
		{
			id: "felipe",
			shape: "circularImage",
			image: DIR + "felipe.png",
			label: "Felipe Cunha  (PUC Minas)",
		},
		{
			id: "leandro",
			shape: "circularImage",
			image: DIR + "leandro.png",
			label: "Leandro Vilas  (Unicamp)",
		},
		{
			id: "susana",
			shape: "circularImage",
			image: DIR + "susana.png",
			label: "Susana  Iglesias  (UESC)",
		},
		{
			id: "ramon",
			shape: "circularImage",
			image: DIR + "ramon.png",
			label: "Ramon Lopes  (UFRB)",
		},
		{
			id: "daniel",
			shape: "circularImage",
			image: DIR + "daniel.png",
			label: "Daniel Macedo  (UFMG)",
		},
		// { id: 5, shape: "circularImage", image: DIR + "5.png" },
		// { id: 6, shape: "circularImage", image: DIR + "6.png" },
		// { id: 7, shape: "circularImage", image: DIR + "7.png" },
		// { id: 8, shape: "circularImage", image: DIR + "8.png" },
		// { id: 9, shape: "circularImage", image: DIR + "9.png" },
		// { id: 10, shape: "circularImage", image: DIR + "10.png" },
		// { id: 11, shape: "circularImage", image: DIR + "11.png" },
		// { id: 12, shape: "circularImage", image: DIR + "12.png" },
		// { id: 13, shape: "circularImage", image: DIR + "13.png" },
		// { id: 14, shape: "circularImage", image: DIR + "ufmg.png" },
		// {
		//   id: 15,
		//   shape: "circularImage",
		//   image: DIR + "missing.png",
		//   brokenImage: DIR + "missingBrokenImage.png",
		//   label: "when images\nfail\nto load",
		// },
		// {
		//   id: 16,
		//   shape: "circularImage",
		//   image: DIR + "anotherMissing.png",
		//   brokenImage: DIR + "9.png",
		//   label: "fallback image in action",
		// },
	];

    nodes.push({ id: "2009-12", label: "2009-12", shape: "box" });
    nodes.push({ id: "2013-15", label: "2013-15", shape: "box" });
    nodes.push({ id: "2014", label: "2014", shape: "box" });
    nodes.push({ id: "2015-19", label: "2015-19", shape: "box" });
    nodes.push({ id: "2016", label: "2016", shape: "box" });
    nodes.push({ id: "2017", label: "2017", shape: "box" });
    nodes.push({ id: "2018", label: "2018", shape: "box" });
    nodes.push({ id: "2019", label: "2019", shape: "box" });
    nodes.push({ id: "2020", label: "2020-2022", shape: "box" });


    nodes.push({ id: "advising", label: "Advising", shape: "box" });
	
    // create connections between people
	// value corresponds with the amount of contact between two people
	edges = [
        {from: "eu", to: "2009-12"},
        {from: "2009-12", to: "dany"},
        {from: "2009-12", to: "esbel"},
        {from: "2009-12", to: "susana"},

        {from: "eu", to: "2013-15"},
        {from: "2013-15", to: "flip"},
        {from: "2013-15", to: "flop"},
        {from: "2013-15", to: "jose"},
        {from: "2013-15", to: "2014"},
        {from: "2014", to: "pantuza"},
        {from: "2014", to: "erik"},

        {from: "eu", to: "2015-19"},
        {from: "2015-19", to: "2016"},
        {from: "2015-19", to: "2017"},
        {from: "2015-19", to: "2018"},
        {from: "2015-19", to: "2019"},
        {from: "2015-19", to: "loureiro"},
        {from: "2015-19", to: "flip"},

        {from: "2016", to: "otavio"},
        {from: "2016", to: "olga"},
        {from: "2016", to: "bruna"},
        {from: "2016", to: "raquel"},
        {from: "2016", to: "leandro"},

        {from: "2017", to: "paulo"},
        {from: "2017", to: "andre"},
        {from: "2017", to: "pedro"},
        {from: "2017", to: "guilherme"},
        {from: "2017", to: "guidone"},
        {from: "2017", to: "sumika"},
        {from: "2017", to: "clayson"},
        {from: "2017", to: "felipe"},
        

        {from: "2018", to: "heitor"},
        {from: "2018", to: "daniel"},

        {from: "2019", to: "augusto"},
        {from: "2019", to: "ekler"},

        {from: "eu", to: "2020"},
        {from: "2020", to: "carlos"},
        {from: "2020", to: "bambirra"},
        {from: "2020", to: "roberto"},
        {from: "2020", to: "jussara"},
        {from: "2020", to: "mellia"},
        {from: "2020", to: "lorenco"},
        {from: "2020", to: "ramon"},

        
        {from: "eu", to: "advising"},
        {from: "advising", to: "gabriel"},
        {from: "advising", to: "thiago"},
        {from: "advising", to: "jamisson"},

	];

	// create a network
	var container = document.getElementById("mynetwork");
	var data = {
		nodes: nodes,
		edges: edges,
	};
	var options = {
        autoResize: true,
        height: '100%',
        width: '100%',
		nodes: {
			borderWidth: 4,
			size: 35,
            shadow: true,
			color: {
				border: "#222222",
				background: "#9AB8FF",
                highlight: {
                    border: '#2B7CE9',
                    background: '#D2E5FF'
                  },
                  hover: {
                    border: '#2B7CE9',
                    background: '#D2E5FF'
                  }
			},
			font: {
				color: "#eeeeee"
			},
		},
		edges: {
			color: "lightgray",
		}
	};
	network = new vis.Network(container, data, options);
}

window.addEventListener("load", () => {
	draw();
});