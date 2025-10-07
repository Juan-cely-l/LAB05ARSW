var apiclient = (function () {
    function getBlueprintsByAuthor(author, callback) {
        $.get("http://localhost:8080/blueprints/" + author, function (data) {
            console.log(" Datos recibidos del servidor:", data);
            callback(data);
        }).fail(function () {
            console.error(" Error al obtener los planos para este autor: " + author);
        });
    }

    function getBlueprintsByNameAndAuthor(authorName, bpName, callback) {
        $.get("http://localhost:8080/blueprints/" + authorName + "/" + bpName, function (data) {
            console.log(" Plano recibido del servidor:", data);
            callback(data);
        }).fail(function () {
            console.error(" Error al obtener el plano con nombre: " + bpName + " y autor: " + authorName);
        });
    }

    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    };
})();