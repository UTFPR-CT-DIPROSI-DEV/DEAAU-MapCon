
// Determines whether or not a given article's subject
// is related to "Urban conflicts" and "Curitiba".
function classifier() {

}

// -====================================================================- //

// Filters URLs from "https://www.tribunapr.com.br/noticias/parana/"
// that are not actual articles. 
function filter_TRIBUNAPR(URLs) {
    const filteredURLs = URLs.filter((url) => {
        return url.includes("https://www.tribunapr.com.br/noticias/curitiba-regiao/");
    });
    return filteredURLs;
}

// Filters URLs from "http://www.brasildefatopr.com.br/"
// that are not actual articles. 
function filter_BRASILDEFATOPR() {

}

// Filters URLs from "http://www.bemparana.com.br/"
// that are not actual articles. 
function filter_BEMPARANA() {

}

// Filters URLs from "http://bandnewsfmcuritiba.com/"
// that are not actual articles. 
function filter_BANDNEWSCURITIBA() {

}

// Filters URLs from "http://www.bandab.com.br/"
// that are not actual articles. 
function filter_BANDAB() {

}


// Filters URLs by subdomain.
// IMPORTANT: All URLs in the list must be from the same domain.
function filter_URLs(URLs) {
    if (URLs[0].includes("https://www.tribunapr.com.br/")) {
        return filter_TRIBUNAPR(URLs);
    } else if (URLs[0].includes("http://www.brasildefatopr.com.br/")) {
        return filter_BRASILDEFATOPR(URLs);
    } else if (URLs[0].includes("http://www.bemparana.com.br/")) {
        return filter_BEMPARANA(URLs);
    } else if (URLs[0].includes("http://bandnewsfmcuritiba.com/")) {
        return filter_BANDNEWSCURITIBA(URLs);
    } else if (URLs[0].includes("http://www.bandab.com.br/")) {
        return filter_BANDAB(URLs);
    }
}