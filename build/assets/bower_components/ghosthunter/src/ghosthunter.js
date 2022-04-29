/**
* ghostHunter - 0.6.0
 * Copyright (C) 2014 Jamal Neufeld (jamal@i11u.me)
 * MIT Licensed
 * @license
*/
(function( $ ) {

	/* LUNR */

	/* LEVENSHTEIN */

	//This is the main plugin definition
	$.fn.ghostHunter 	= function( options ) {

		//Here we use jQuery's extend to set default values if they weren't set by the user
		var opts 		= $.extend( {}, $.fn.ghostHunter.defaults, options );
		if( opts.results )
		{
			pluginMethods.init( this , opts );
			return pluginMethods;
		}
	};
	// If the Ghost instance is in a subpath of the site, set subpath
	// as the path to the site with a leading slash and no trailing slash
	// (i.e. "/path/to/instance").
	$.fn.ghostHunter.defaults = {
		resultsData			: false,
		onPageLoad			: false,
		onKeyUp				: false,
		result_template 	: "<a id='gh-{{ref}}' class='gh-search-item' href='{{link}}'><p><h2>{{title}}</h2><h4>{{pubDate}}</h4></p></a>",
		info_template		: "<p>Number of posts found: {{amount}}</p>",
		displaySearchInfo	: true,
		zeroResultsInfo		: true,
		before				: false,
		onComplete			: false,
		filterfields		: false,
		subpath				: "",
		item_preprocessor	: false,
		indexing_start		: false,
		indexing_end		: false,
		includebodysearch	: false
	};
	var prettyDate = function(date) {
		var d = new Date(date);
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			return d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();
	};

	var getSubpathKey = function(str) {
		return str.replace(/^\//, "").replace(/\//g, "-")
	};

	var lastTimeoutID = null;

	// We add a prefix to new IDs and remove it after a set of
	// updates is complete, just in case a browser freaks over
	// duplicate IDs in the DOM.
	var settleIDs = function() {
		$('.gh-search-item').each(function(){
			var oldAttr = this.getAttribute('id');
			var newAttr = oldAttr.replace(/^new-/, "");
			this.setAttribute('id', newAttr);
		});
	};
	var updateSearchList = function(listItems, apiData, steps) {
		for (var i=0,ilen=steps.length;i<ilen;i++) {
			var step = steps[i];
			if (step[0] == "delete") {
				listItems.eq(step[1]-1).remove();
			} else {
				var lunrref = apiData[step[2]-1].ref;
				var postData = this.blogData[lunrref];
				var html = this.format(this.result_template,postData);
				if (step[0] === "substitute") {
					listItems.eq(step[1]-1).replaceWith(html);
				} else if (step[0] === "insert") {
					var pos;
					if (step[1] === 0) {
						pos = null;
					} else {
						pos = (step[1]-1)
					}
					listItems.eq(pos).after(html);
				}
			}
		}
		settleIDs();
	}

	var grabAndIndex = function(){
		// console.log('ghostHunter: grabAndIndex');
		this.blogData = {};
		this.latestPost = 0;
    var url = "/ghost/api/v2/content/posts/?key=" + ghosthunter_key + "&limit=all&include=tags";

		var params = {
			limit: "all",
			include: "tags",
		};
		if ( this.includebodysearch ){
			params.formats=["plaintext"]
      url += "&formats=plaintext"
		} else {
			params.formats=[""]
		}
		var me = this;
    $.get(url).done(function(data){
			var idxSrc = data.posts;
			// console.log("ghostHunter: indexing all posts")
			me.index = lunr(function () {
				this.ref('id');
				this.field('title');
				this.field('description');
				if (me.includebodysearch){
				this.field('plaintext');
				}
				this.field('pubDate');
				this.field('tag');
				idxSrc.forEach(function (arrayItem) {
					// console.log("start indexing an item: " + arrayItem.id);
					// Track the latest value of updated_at,  to stash in localStorage
					var itemDate = new Date(arrayItem.updated_at).getTime();
					var recordedDate = new Date(me.latestPost).getTime();
					if (itemDate > recordedDate) {
						me.latestPost = arrayItem.updated_at;
					}
					var tag_arr = arrayItem.tags.map(function(v) {
						return v.name; // `tag` object has an `name` property which is the value of tag. If you also want other info, check API and get that property
					})
					if(arrayItem.meta_description == null) { arrayItem.meta_description = '' };
					var category = tag_arr.join(", ");
					if (category.length < 1){
						category = "undefined";
					}
					var parsedData 	= {
						id 			: String(arrayItem.id),
						title 		: String(arrayItem.title),
						description	: String(arrayItem.custom_excerpt),
						pubDate 	: String(arrayItem.published_at),
						tag 		: category
					}
					if  ( me.includebodysearch ){
						parsedData.plaintext=String(arrayItem.plaintext);
					}
					this.add(parsedData)
					var localUrl = me.subpath + arrayItem.url
					me.blogData[arrayItem.id] = {
						title: arrayItem.title,
						description: arrayItem.custom_excerpt,
						pubDate: prettyDate(parsedData.pubDate),
						link: localUrl,
						tags: tag_arr
					};
					// If there is a metadata "pre"-processor for the item, run it here.
					if (me.item_preprocessor) {
						Object.assign(me.blogData[arrayItem.id], me.item_preprocessor(arrayItem));
					}
					// console.log("done indexing the item");
				}, this);
			});
			try {
				var subpathKey = getSubpathKey(me.subpath);
				localStorage.setItem(("ghost_" + subpathKey + "_lunrIndex"), JSON.stringify(me.index));
				localStorage.setItem(("ghost_" + subpathKey + "_blogData"), JSON.stringify(me.blogData));
				localStorage.setItem(("ghost_" + subpathKey + "_latestPost"), me.latestPost);
			} catch (e) {
				console.warn("ghostHunter: save to localStorage failed: " + e);
			}
			if (me.indexing_end) {
				me.indexing_end();
			}
			me.isInit = true;
		});
	}

	var pluginMethods	= {

		isInit			: false,

		init			: function( target , opts ){
			var that = this;
			that.target = target;
			Object.assign(this, opts);
			// console.log("ghostHunter: init");
			if ( opts.onPageLoad ) {
				function miam () {
					that.loadAPI();
				}
				window.setTimeout(miam, 1);
			} else {
				target.focus(function(){
					that.loadAPI();
				});
			}

			target.closest("form").submit(function(e){
				e.preventDefault();
				that.find(target.val());
			});

			if( opts.onKeyUp ) {
				// In search-as-you-type mode, the Enter key is meaningless,
				// so we disable it in the search field. If enabled, some browsers
				// will save data to history (even when autocomplete="false"), which
				// is an intrusive headache, particularly on mobile.
				target.keydown(function(event){
					if (event.which === 13) {
						return false;
					}
				});
				target.keyup(function(event) {
					that.find(target.val());
				});

			}

		},

		loadAPI			: function(){
			// console.log('ghostHunter: loadAPI');
			if(!this.isInit) {
				// console.log('ghostHunter: this.isInit is true');
				if (this.indexing_start) {
					this.indexing_start();
				}
				// If isInit is falsy, check for data in localStore,
				// parse into memory, and declare isInit to be true.
				try {
					var subpathKey = getSubpathKey(this.subpath);
					this.index = localStorage.getItem(("ghost_" + subpathKey + "_lunrIndex"));
					this.blogData = localStorage.getItem(("ghost_" + subpathKey + "_blogData"));
					this.latestPost = localStorage.getItem(("ghost_" + subpathKey + "_latestPost"));
					if (this.latestPost && this.index && this.blogData) {
						this.latestPost = this.latestPost;
						this.index = lunr.Index.load(JSON.parse(this.index));
						this.blogData = JSON.parse(this.blogData);
						this.isInit = true;
					}
				} catch (e){
					console.warn("ghostHunter: retrieve from localStorage failed: " + e);
				}
			}
			if (this.isInit) {
				// console.log('ghostHunter: this.isInit recheck is true');
				// Check if there are new or edited posts
				var params = {
					limit: "all",
					filter: "updated_at:>\'" + this.latestPost.replace(/\..*/, "").replace(/T/, " ") + "\'",
					fields: "id"
				};

        var url = "/ghost/api/v2/content/posts/?key=" + ghosthunter_key + "&limit=all&fields=id" + "&filter=" + "updated_at:>\'" + this.latestPost.replace(/\..*/, "").replace(/T/, " ") + "\'";

				var me = this;
        $.get(url).done(function(data){
					if (data.posts.length > 0) {
						grabAndIndex.call(me);
					} else {
						if (me.indexing_end) {
							me.indexing_end();
						}
						me.isInit = true;
					}
				});
			} else {
				// console.log('ghostHunter: this.isInit recheck is false');
				grabAndIndex.call(this)
			}
		},


		find 		 	: function(value){
			clearTimeout(lastTimeoutID);
			if (!value) {
				value = "";
			};
			value = value.toLowerCase();
			lastTimeoutID = setTimeout(function() {
				// Query strategy is lifted from comments on a lunr.js issue: https://github.com/olivernn/lunr.js/issues/256
				var thingsFound = [];
				// The query interface expects single terms, so we split.
				var valueSplit = value.split(/\s+/);
				for (var i=0,ilen=valueSplit.length;i<ilen;i++) {
					// Fetch a list of matches for each term.
					var v = valueSplit[i];
					if (!v) continue;
					thingsFound.push(this.index.query(function (q) {
						// For an explanation of lunr indexing options, see the lunr.js
						// documentation at https://lunrjs.com/docs/lunr.Query.html#~Clause

						// look for an exact match and apply a large positive boost
						q.term(v, {
							usePipeline: true,
							boost: 100,
						});
						// look for terms that match the beginning of this queryTerm and apply a medium boost
						q.term(v, {
							usePipeline: false,
							boost: 10,
							wildcard: lunr.Query.wildcard.TRAILING
						});
						// look for terms that match with an edit distance of 1 and apply a small boost
						q.term(v, {
							usePipeline: false,
							editDistance: 1,
							boost: 1
						});
					}));
				}
				var searchResult;
				if (thingsFound.length > 1) {
					// If we had multiple terms, we'll have multiple lists. We filter
					// them here to use only items that produce returns for all
					// terms. This spoofs an AND join between terms, which lunr.js can't
					// yet do internally.
					// By using the first list of items as master, we get weightings
					// based on the first term entered, which is more or less
					// what we would expect.
					var searchResult = thingsFound[0];
					thingsFound = thingsFound.slice(1);
					for (var i=searchResult.length-1;i>-1;i--) {
						var ref = searchResult[i].ref;
						for (j=0,jlen=thingsFound.length;j<jlen;j++) {
							var otherRefs = {}
							for (var k=0,klen=thingsFound[j].length;k<klen;k++) {
								otherRefs[thingsFound[j][k].ref] = true;
							}
							if (!otherRefs[ref]) {
								searchResult = searchResult.slice(0, i).concat(searchResult.slice(i+1));
								break;
							}
						}
					}
				} else if (thingsFound.length === 1) {
					// If we had just one term and one list, return that.
					searchResult = thingsFound[0];
				} else {
					// If there was no search result, return an empty list.
					searchResult = [];
				}

				var results 		= $(this.results);
				var resultsData 	= [];
				if (searchResult.length === 0) {
					results.empty();
					if (this.displaySearchInfo && this.zeroResultsInfo) {
						results.append(this.format(this.info_template,{"amount":0}));
					}
				} else if (this.displaySearchInfo) {
					if (results.length > 0) {
						results.children().eq(0).replaceWith(this.format(this.info_template,{"amount":searchResult.length}));
					} else {
						results.append(this.format(this.info_template,{"amount":searchResult.length}));
					}
				}

				if(this.before) {
					this.before();
				};

				// Get the blogData for the full set, for onComplete
				for (var i = 0; i < searchResult.length; i++) {
					var lunrref		= searchResult[i].ref;
					var postData  	= this.blogData[lunrref];
					if (postData) {
						postData.ref = lunrref;
						resultsData.push(postData);
					} else {
						console.warn("ghostHunter: index/data mismatch. Ouch.");
					}
				}
				// Get an array of IDs present in current results
				var listItems = $('.gh-search-item');
				var currentRefs = listItems
					.map(function(){
						return this.id.slice(3);
					}).get();
				if (currentRefs.length === 0) {
					for (var i=0,ilen=resultsData.length;i<ilen;i++) {
						results.append(this.format(this.result_template,resultsData[i]));
					}
					settleIDs();
				} else {
					// Get an array of IDs present in searchResult
					var newRefs = [];
					for (var i=0,ilen=searchResult.length;i<ilen;i++) {
						newRefs.push(searchResult[i].ref)
					}
					// Get the Levenshtein steps needed to transform current into searchResult
					var levenshtein = new Levenshtein(currentRefs, newRefs);
					var steps = levenshtein.getSteps();
					// Apply the operations
					updateSearchList.call(this, listItems, searchResult, steps);
				}
				// Tidy up
				if(this.onComplete) {
					this.onComplete(resultsData);
				};
			}.bind(this), 100);
		},

		clear 			: function(){
			$(this.results).empty();
			this.target.val("");
		},

		format 			: function (t, d) {
			return t.replace(/{{([^{}]*)}}/g, function (a, b) {
				var r = d[b];
				return typeof r === 'string' || typeof r === 'number' ? r : a;
			});
		}
	}

})( jQuery );
