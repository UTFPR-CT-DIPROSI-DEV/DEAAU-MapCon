import { removeAccents } from "./utils.js";

// Determines whether or not a given article's subject
// is related to "Urban conflicts" and "Curitiba".
function classifier(body) {
    const keywords = [
        " conflito",
        " comunidade",
        " protesto",
        " manifestação",
        " manifestante",
        " moradores",
        " greve",
        " paralisação",
        " passeata",
        " bloqueio",
        " confronto",
        " violento",
        " tensão",
        " tumulto",
        " invasão",
        " invasões",
        " ocupação",
        " ocupações",
        " desocupação",
        " desalojamento",
        " deslocamento",
        " reintegração",
    ];
    // Normalize the body content to lowercase
    const normalizedBody = body.toLowerCase();
    let termos = [];
    let found = false;
    for (const keyword of keywords) {
        if (normalizedBody.includes(keyword)) {
            termos.push(removeAccents(keyword));
            found = true;
        }
    }
    return [found, termos];
}

// -====================================================================- //

// Filters URL from "https://www.tribunapr.com.br/noticias/parana/"
// that is not an actual article. 
function filter_TRIBUNAPR(URL) {
    const exclude_list = [
                            "/page/",
                         ];
    if (URL.includes("www.tribunapr.com.br/noticias/curitiba-regiao/") && URL.split("//")[1] !== "www.tribunapr.com.br/noticias/curitiba-regiao/") {
        for (const element of exclude_list) {
            if (URL.includes(element)) return false;
        }
        return true;
    }
}

// Filters URL from "http://www.brasildefatopr.com.br/"
// that is not an actual article. 
const dateRegex = /\/(\d{4})\/(\d{2})\/(\d{2})\//;
function filter_BRASILDEFATOPR(URL) {
    return dateRegex.test(URL);
}

// Filters URL from "http://www.bemparana.com.br/"
// that is not an actual article.  
function filter_BEMPARANA(URL) {
    return URL.includes("www.bemparana.com.br/noticias/parana/") &&
            URL.split("//")[1] !== "www.bemparana.com.br/noticias/parana/";
}

// Filters URL from "https://bandnewsfmcuritiba.com/"
// that is not an actual article.  
function filter_BANDNEWSCURITIBA(URL) {
    const exclude_list = ["/ultimas-noticias/",
                          "editoria",
                          "/institucional",
                          "/contato",
                          "/arquivo/",
                          "/endereco",
                          "episodio",
                          "/colunas/",
                          "/especiais",
                          "/author/",
                          "/curitiba/",
                          "/estado-parana/",
                          "/politica_cat/",
                          "/esportes",
                          "ep-",
                        ];
    if (URL.includes("bandnewsfmcuritiba.com") && URL.split("//")[1].split("/").length === 3) {
        for (const element of exclude_list) {
            if (URL.includes(element)) return false;
        }
        return true;
    }    
}

// Filters URL from "https://www.bandab.com.br/"
// that is not an actual article.  
function filter_BANDAB(URL) {
    return URL.includes("www.bandab.com.br/curitiba/") && URL.split("//")[1] !== "www.bandab.com.br/curitiba/";
}


// Filters URL by subdomain.
// IMPORTANT: All URL in the list must be from the same domain.
function filter_URL(URL) {
    if (URL.includes("www.tribunapr.com.br/")) {
        return filter_TRIBUNAPR(URL);       //
    } else if (URL.includes("www.brasildefatopr.com.br/")) {
        return filter_BRASILDEFATOPR(URL);  //
    } else if (URL.includes("www.bemparana.com.br/")) {
        return filter_BEMPARANA(URL);       //
    } else if (URL.includes("bandnewsfmcuritiba.com/")) {
        return filter_BANDNEWSCURITIBA(URL);//
    } else if (URL.includes("www.bandab.com.br/")) {
        return filter_BANDAB(URL);          //
    }
}

export { classifier, filter_URL };