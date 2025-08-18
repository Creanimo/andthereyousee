import AppScreen from "./view/AppScreen.js";

const menu = new AppScreenComponent({
    template: "data/templates/mainMenu.mustache",
    templatePlaceholders: {
        containerId: "menu",
        menuEntries: [
            { label: "Overview", link: "./index.html" },
            { label: "Categories", link: "./category.html" },
        ]
    }
})

const header = new AppScreenComponent({
    template: "data/templates/header.mustache",
    templatePlaceholders: {
        containerId: "header",
        titel: "And There You Are",
        subtitle: "Practice describing characters, landscapes, and combat to spice up your role playing games.",
    }
})

const layout = new AppScreenComponent({
    template: "data/templates/layout.mustache",
    templateAppendForId: {
        menuContainer: menu.getHtmlElement(),
        headerContainer: header.getHtmlElement(),
    }
})

bodyOverview = new AppScreenComponent({
    template: "data/templates/bodyOverview.mustache",
    templatePlaceholders: {
        myLastEntries: [
            { label: "Create your first entry", link: "newEntry.html" },
        ]
    }
})

const pageOverview = layout.withAddedTemplateAppendForId({ mainContentContainer: bodyOverview.getHtmlElement() })

// only if run from npm
if(typeof process === 'object') {
    // code to generate index.html and categories.html to dist/ directory
    pageOverview.compileStaticHtml();
    process.exit();
}

switch(document.location.pathname) {
    case "/index.html":
        // codeblock
        break;
    case "/category.html":
        // codeblock
        break;
    case "/entry.html":
        // codeblock
        break;
}


promptCategories = new PromptCategoryCollection({
    dataSource: "data/promptCategories.json"
});

categoryList = new AppScreenComponent({
    name: "categoryList",
    template: "templates/categorySelect.mustache",
    templateSlots: [],
    templateFields: [],
    data: promptCategories.mapToAppScreenComponent,
});
categoryScreen = new AppScreen({
    name: "categoryScreen",
    content: categoryList,
});

routing = [
    ["./index.html", categoryScreen],
    ["./categories.html", categoryScreen],
    ["./entry.html", entryScreen]
];

app = new App({
    routing: routing
});

app.start();
