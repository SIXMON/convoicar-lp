# LANDKIT #

Landkit Theme by Good Themes.

### Documentation ###

Development documentation is available at `src/docs/index.html` (or `dist/docs/index.html` once you've compiled), or visit http://landkit.goodthemes.co/docs/index.html.

### Getting Started ###

The steps to compile and get started with development are covered in detail in documentation mentioned above, but the summary is:

- npm install -g gulp-cli
- npm install
- gulp

### Design Files ###

We provide an "unofficial" Landkit Figma file for you to play with. Learn more about it at http://landkit.goodthemes.co/docs/figma.html and view/download it here: https://www.figma.com/file/dRHDLzwl3ENBYaLlz88cjb/LandKit-1.2.0-Distributed.

### Support ###

Good Themes is happy to provide support for issues. Shoot us an email at support@goodthemes.co and we'll get you squared away.

Le site est hébergé sur Github.com

## How to add a new language translation ##

### 1 - Add to the Language Selector

First you will have to add your new language directly in `src/partials/navbar.html` like that

```html
<span id="lang-en" class="custom-option" data-value="en" onclick="changeLang('en')"></span>
```
You should add an svg flag in the span, you can find it at https://nucleoapp.com/svg-flag-icons

### 2 - Add the new language in the translation script

Go directly to `src/assets/js/i18n.js` and add a new line to the function with your language

```js
function getPreferredLanguage() {
    const languages = navigator.languages || [navigator.language || navigator.userLanguage];
    for (let lang of languages) {
        if (lang.startsWith("fr")) return "fr";
        if (lang.startsWith("es")) return "es";
        //if (lang.startsWith("en")) return "en";
    }
    return 'fr';
}
```

### 3 - Create your translation file

This part is pretty heavy because you will need to do a lot of copy paste.
You will need to create a JSON file with your language ID as name, so for our example it would be `en.json`, create it in the directory `src/locales`

Once that's done, just copy the content of another json file, to already have your keys and then just replace the value with the translation.