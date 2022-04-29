
(()=> {	modeSwitcher()})();

function modeSwitcher() {
	document.documentElement.setAttribute('data-theme', 'dark');
	sessionStorage.setItem('theme', 'dark');
}

// 	if (currentTheme === "dark") {
// 		document.documentElement.setAttribute('data-theme', 'light');
// 		sessionStorage.setItem('theme', 'light');
// 	}	else if (currentTheme === "light") {
// 		document.documentElement.setAttribute('data-theme', 'dark');
// 		sessionStorage.setItem('theme', 'dark');
// 	}else{
// 		document.documentElement.setAttribute('data-theme', 'dark');
// 		sessionStorage.setItem('theme', 'dark');
// 	}
// }
