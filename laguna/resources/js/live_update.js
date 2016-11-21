// a constant used to indicate a function that does nothing
var NOOP = function() {}

// ------------------------------------------------------------------------
//   Find the font family, size and face for the provided node in the
//   HTML dom.  The result object contains fontSize, fontFamily and
//   fontFace entries.
//
function findFont( obj )
{
	var result = new Object();
	if ( obj.currentStyle ) {
		result.fontSize = obj.currentStyle[ 'fontSize' ];
		result.fontFamily = obj.currentStyle[ 'fontFamily' ];
		result.fontFace = obj.currentStyle[ 'fontFace' ];
	} else if ( document.defaultView && document.defaultView.getComputedStyle ) {
		var computedStyle = document.defaultView.getComputedStyle( obj, "" );
		result.fontSize = computedStyle.getPropertyValue( 'font-size' );
		result.fontFamily = computedStyle.getPropertyValue( 'font-family' );
		result.fontFace = computedStyle.getPropertyValue( 'font-face' );
	}
	return result;
}

// ---------------------------------------------------------------------------

/*
	Find the bounds of the specified node in the DOM.  This returns
	an objct with x,y, height and width fields
*/
function findBounds( obj )
{
	var bounds = new Object();
	bounds.x = 0;
	bounds.y = 0;
	bounds.width = obj.scrollWidth;
	bounds.height = obj.scrollHeight;
	if( obj.x != null ) {
		bounds.x = obj.x;
		bounds.y = obj.y;
	}
	else {
		while( obj.offsetLeft != null ) {
			bounds.x += obj.offsetLeft;
			bounds.y += obj.offsetTop;
			if( obj.offsetParent ) {
				obj = obj.offsetParent;
			}
			else {
				break;
			}
		}
	}
			
	// subtract the amount the page is scrolled from position
	if (self.pageYOffset) // all except Explorer
	{
		bounds.x -= self.pageXOffset;
		bounds.y -= self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
		// Explorer 6 Strict
	{
		bounds.x -= document.documentElement.scrollLeft;
		bounds.y -= document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		bounds.x -= document.body.scrollLeft;
		bounds.y -= document.body.scrollTop;
	}

	return bounds;
}

// ---------------------------------------------------------------------------

var isFirefoxPat = /Firefox\/([0-9]+)[.]([0-9]+)[.]([0-9]+)/;
var firFoxArr = isFirefoxPat.exec( navigator.userAgent );
var isSafariPat = /AppleWebKit\/([0-9]+)[.]([0-9]+)/;
var safariArr = isSafariPat.exec( navigator.userAgent );

// ---------------------------------------------------------------------------

/*
	Default implementation does nothing when viewing the webpage normally
*/
var clickTarget = NOOP;
var tellLightroomWhatImagesWeAreUsing = NOOP;
var setActiveImageSize = NOOP;

// ---------------------------------------------------------------------------

callCallback = function() {
	var javascript = 'myCallback.' + arguments[ 0 ] + "( ";
	var j = arguments.length;
	var c = j - 1;
	for( var i = 1; i < j; i++ ) {
		var arg = arguments[ i ];
		if( typeof( arg ) == 'string' ) {
			javascript = javascript + '"' + arg + '"';
		}
		if( typeof( arg ) == 'number' ) {
			javascript = javascript + arg
		}
		if( typeof( arg ) == 'undefined' ) {
			javascript = javascript + 'undefined'
		}
		if( i < c ) {
			javascript = javascript + ", "
		}
	}
	javascript = javascript + " )"
	hosteval( javascript )
}

pushresult = function( result ) {
	callCallback( "pushresult", result )
}

// ---------------------------------------------------------------------------

/*
	Set up live feedback between Lightroom and the previewed web page.
*/
if( callCallback != NOOP ) {
	setActiveImageSize = function( size ) {
		document.activeImageSize = size;
		callCallback( "setActiveImageSize", size );
	}

	tellLightroomWhatImagesWeAreUsing = function() {

		if( window.myCallback != null ) {
			var imgElements = document.getElementsByTagName( "img" );
			var elsLen = imgElements.length;
			var result = new Array()
			for( i = 0; i < elsLen; i++ ) {
				var element = imgElements[ i ];
				var imageID = element.id;
				// for html validation purposes, we've prepended "ID" to the GUID for this
				// image, so now we strip that off.
				imageID = imageID.substring( 2 );
				result[ i ] = imageID;
			}
			myCallback.setUsedFiles( result );
		}
	}

	clickTarget = function( obj, target, imageID ) {
		if( imageID != null ) {
			// for html validation purposes, we've prepended "ID" to the GUID for this
			// image, so now we strip that off.
			imageID = imageID.substring( 2 );
		}
		var bounds = findBounds( obj );
		var font = findFont( obj );
		callCallback( 'inPlaceEdit', target, bounds.x, bounds.y, bounds.width, bounds.height, font.fontFamily, font.fontSize, imageID )
	}

	AgDebugPrint = function( message ) {
		callCallback( 'AgDebugPrint', message );
	}
}

// ---------------------------------------------------------------------------

if( firFoxArr && ( firFoxArr[1] > 1 || firFoxArr[2] > 4 ) ||
      safariArr ) {
	window.gridOn = NOOP;
	window.gridOff= NOOP;
}
else {
	window.gridOn = function( t, id ) {
		t.agOriginalClassName = t.className;
		t.className =  "selectedThumbnail " + t.className;
	};
	window.gridOff= function( t ) {
		t.className = t.agOriginalClassName;
	};
}

var needThumbImgLink = !isFirefoxPat;


var oldOnLoad = window.onload;
window.onload = function() {
	if( window.AgOnLoad ) {
		window.AgOnLoad();
	}
	if( oldOnLoad ) {
		oldOnLoad();
	}
};

//------------------------------------------------------------

document.liveUpdateImageMaxSize = function( id, value ) {
	var targetArr = id.split(/[ \t\r\n]*,[ \t\r\n]*/);
	for( i = 0; i < targetArr.length; i++ ) {
		var target = targetArr[i];
		var idRegex = new RegExp( "^[#](.+$)" );
		var theId = idRegex.exec( target );
		if( theId && theId[ 1 ] ) {
			var item = document.getElementById( theId[ 1 ] );
			if( item ) {

				// scale image size
				var max = item.width;
				if( item.height > max ) {
					max = item.height;
				}
				item.width = item.width * value / max;
				item.height = item.height * value / max;
			}
		}
	}


	return "invalidateAllContent";
}

//------------------------------------------------------------

document.liveUpdateProperty = function( id, property, value ) {

	var targetArr = id.split(/[ \t\r\n]*,[ \t\r\n]*/);
	var clasRegex = new RegExp( "^[.](.+$)" )
	var idRegex = new RegExp( "^[#](.+$)" )
	var comboRegex = new RegExp( "[ \t\r\n]" );

	for( i = 0; i < targetArr.length; i++ ) {
		var target = targetArr[i];
		var theClass = clasRegex.exec( target );
		var theId = idRegex.exec( target );
		if( comboRegex.exec( target ) ) {
			return "failed";
		}
		else if( theClass) {
			var pattern = new RegExp( "(^|\\s)" + theClass[1] + "(\\s|$)" );
			var items = document.getElementsByTagName( '*' );
			for( o = 0; o < items.length; o++ ) {
				var item = items[ o ];
				if( pattern.test( item.className ) ){
					item.style.setProperty( property, value, "important" );
				}
			}
			return "invalidateAllContent";
		}
		else if( theId ) {
			if( property == "maxSize" ) {
				return document.liveUpdateImageMaxSize( id, value );
			}
			var item = document.getElementById( theId[ 1 ] );
			if( item ) {
				item.style.setProperty( property, value, "important");
			}
			return "invalidateAllContent";
		}
		else {
			var items = document.getElementsByTagName( target);
			for( i = 0; i < items.length; i++ ) {
				var item = items[i];
				item.style.setProperty( property, value, "important" );
			}
			return "invalidateAllContent";
		}
	}
};

//------------------------------------------------------------

function esc( pre ) {
	pre = pre.replace( /&/g, "&amp;" );
	pre = pre.replace( /</g, "&lt;" );
	return pre;
}

//------------------------------------------------------------

function escapeForHtml( value ) {

	// escape < and & but preserve </html>
	var result = "";
	var index = 0;
	var pat = /(.*?)(<[\/a-zA-Z]?[^&<>]+>)/g;
	var chunk;
	while( ( chunks = pat.exec( value ) ) != null ) {
		var pre = chunks[ 1 ];
		var node = chunks[ 2 ];
		index += pre.length + node.length;
		pre = esc( pre )
		result = result + pre + node;
	}
	result = result + esc( value.substring( index ) )

	return result;
}

//------------------------------------------------------------

document.liveUpdate = function( path, newValue, cssId, property ) {
// AgDebugPrint( "document.liveUpdate( " + path + ", " + newValue + ", " + cssId + " , " + property + " ) " );
	var success = "failed";
	var reg = /(^[^.]+)\./;
	var ar = reg.exec( path );
	if( ar == null ) {

		// override result if we drove this change ourselves
		if( document.LR_modelManipulation ) {
			return "invalidateOldHTML";
		}
		return "failed";
	}
	var area = ar[1];
	if( area == "metadata" ) {
		// our html is built so that the HTML ids are the metadata path
		var a = document.getElementById( path );
		while(a.hasChildNodes()) {
			a.removeChild(a.firstChild);
		}
		newValue = escapeForHtml( newValue );
		a.innerHTML = newValue;
		success = "invalidateOldHTML";
	}
	else if( area == "appearance" ) {
		success = document.liveUpdateProperty( cssId, property, newValue );
	}
	else if( path == "nonCSS.tracking" ) {
		if( newValue == null || newValue == "null") {
			// force reload by signalling failure to update
			// because we don't properly layout all the nuiances of
			// detail image placement during tracking, we reload at the
			// end to make sure it is correct when mouseup
			success = "failed";
		}
		else {
			// FIX_ME, image won't layout properly during drag w/o this
			success = "invalidateOldHTML";
		}
	}
	else if( path == "nonCSS.imageBorderWidth" ) {
		// FIX_ME, not yet implemented, so image won't layout properly during drag
		// as a workaround, we're reloading on tracking up (see previous block)
		success = "invalidateOldHTML";
	}
	else {
		// AgDebugPrint("How do I update " + path + " to " + newValue )
	}

	// override result if we drove this change ourselves
	if( document.LR_modelManipulation ) {
		return "invalidateOldHTML";
	}
	return success;
}

//------------------------------------------------------------

document.liveUpdateImageSize = function( imageID, width, height ) {

	var img = document.getElementById( 'ID' + imageID );
	img.style.width = width + 'px';
	img.style.height = height + 'px';
	return "invalidateAllContent";
}

//------------------------------------------------------------
