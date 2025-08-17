import AppScreen from "./view/AppScreen.js";

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

header =

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
