document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("insumo-form");
    const idInput = document.getElementById("insumo-id");
    const nomeInput = document.getElementById("nome");
    const categoriaInput = document.getElementById("categoria");
    const quantidadeInput = document.getElementById("quantidade");

    // Verifica se estamos editando um insumo existente
    const urlParams = new URLSearchParams(window.location.search);
    const insumoId = urlParams.get("id");

    if (insumoId) {
        document.getElementById("form-title").textContent = "Editar Insumo";
        fetch(`/api/insumos/${insumoId}`)
            .then(response => response.json())
            .then(insumo => {
                idInput.value = insumo.id;
                nomeInput.value = insumo.nome;
                categoriaInput.value = insumo.categoria;
                quantidadeInput.value = insumo.quantidade;
            })
            .catch(error => console.error("Erro ao carregar insumo:", error));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const insumo = {
            nome: nomeInput.value,
            categoria: categoriaInput.value,
            quantidade: quantidadeInput.value
        };

        const method = insumoId ? "PUT" : "POST";
        const url = insumoId ? `/api/insumos/${insumoId}` : "/api/insumos";

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(insumo)
        })
        .then(response => response.json())
        .then(() => {
            alert("Insumo salvo com sucesso!");
            window.location.href = "insumos.html"; // Redireciona para a lista de insumos
        })
        .catch(error => console.error("Erro ao salvar insumo:", error));
    });
});

async function saveInsumo() {
    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const quantidade = document.getElementById("quantidade").value;

    const insumo = { nome, categoria, quantidade };

    try {
        const response = await fetch("http://localhost:3000/api/insumos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(insumo),
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar insumo");
        }

        const data = await response.json();
        console.log("Insumo salvo com sucesso:", data);
    } catch (err) {
        console.error("Erro ao salvar insumo:", err);
    }
}
