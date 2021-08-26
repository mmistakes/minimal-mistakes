/* assets/js/custom/dark-theme.js */

var defaultTheme = [...document.styleSheets].find(style => /(main.css)$/.test(style.href))
var darkTheme = [...document.styleSheets].find(style => /(main_dark.css)$/.test(style.href))

if (darkTheme) {
    const darkModeCookie = document.cookie
        .split('; ')
        .find(co => co.startsWith('MDARK='))
    if (darkModeCookie !== undefined) {
        const dmodeValue = darkModeCookie.split('=')[1]
        darkTheme.disabled = dmodeValue !== 'Y'
        defaultTheme.disabled = dmodeValue === 'Y'
    } else {
        if (matchMedia('(prefers-color-scheme: dark)').matches) {
            darkTheme.disabled = false
            defaultTheme.disabled = true
        } else {
            darkTheme.disabled = true
            defaultTheme.disabled = false
        }
        document.cookie = `MDARK=${darkTheme.disabled ? 'N' : 'Y'}; path=/;`
    }

    let toggleThemeBtn = document.getElementById("toggle_dark_theme")
    if (toggleThemeBtn) {
        toggleThemeBtn.checked = defaultTheme.disabled
    }

    let changeTheme = () => {
        darkTheme.disabled = !darkTheme.disabled
        defaultTheme.disabled = !darkTheme.disabled
        document.cookie = `MDARK=${darkTheme.disabled ? 'N' : 'Y'}; path=/;`
    }

    toggleThemeBtn.addEventListener('click', changeTheme)
}
