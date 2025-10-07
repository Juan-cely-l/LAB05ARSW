const modulo = (function() {
    let author = null;
    let blueprints = [];
    const api = apiclient; // Make sure apiclient.js is loaded first

    function getBlueprintsByAuthor(name) {
        author = name;
        api.getBlueprintsByAuthor(name, function (list) {
            // Limpiar la tabla antes de llenarla
            $("#blueprintsTable tbody").empty();

            let blueprintsMapped = [];
            if (list && Array.isArray(list)) {
                blueprintsMapped = list.map(b => ({
                    name: b.name,
                    points: b.points.length // Store just the count of points
                }));
            } else {
                console.warn("No blueprints found for author: " + name);
            }

            blueprintsMapped.forEach(p => {
                let fila = `<tr>
                <td>${p.name}</td>
                <td>${p.points}</td>
                <td><button class="open-btn" data-name="${p.name}">Open</button></td>
            </tr>`;
                $("#blueprintsTable tbody").append(fila);
            });

            // Calculate total points correctly - just sum the points numbers
            let total = blueprintsMapped.reduce((cont, b) => cont + b.points, 0);
            $("#TotalPoints").text(total);
            $("#authorName").text("Author: " + author);

            $(".open-btn").click(function() {
                const bpName = $(this).data("name");
                getBlueprintsByNameAndAuthor(author, bpName); // Note order of parameters
            });

            console.log("Planos de " + author + ": " + JSON.stringify(blueprintsMapped));
        });
    }

    function getBlueprintsByNameAndAuthor(authorName, bpName) {
        // Fixed parameter order to match the API call
        api.getBlueprintsByNameAndAuthor(authorName, bpName, function(blueprint) {
            console.log("Plano encontrado:", blueprint);
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (blueprint && blueprint.points && blueprint.points.length > 0) {
                ctx.beginPath();

                // Move to the first point
                ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);

                // Draw lines to all subsequent points
                for (let i = 1; i < blueprint.points.length; i++) {
                    ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y);
                }

                ctx.stroke();
                $("#currentBlueprint").text("Current blueprint: " + blueprint.name);
            } else {
                console.error("Invalid blueprint data");
                $("#currentBlueprint").text("Error: Invalid blueprint data");
            }
        });
    }

    return {
        setAuthor: function (name) {
            author = name;
        },
        loadBlueprints: function () {
            if (author) {
                getBlueprintsByAuthor(author);
            } else {
                console.error("Author not found");
            }
        },
    };
})();

$(document).ready(function() {
    $("#getBlueprintsBtn").click(function() {
        let name = $("#authorInput").val().trim().toLowerCase();
        modulo.setAuthor(name);
        modulo.loadBlueprints();
    });
});