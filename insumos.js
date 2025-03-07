document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/insumos')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("insumos-table");
            tableBody.innerHTML = ""; // Limpar tabela

            data.forEach(insumo => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${insumo.id}</td>
                    <td>${insumo.nome}</td>
                    <td>${insumo.categoria}</td>
                    <td>${insumo.quantidade}</td>
                    <td>
                        <a href="insumos_form.html?id=${insumo.id}">Editar</a>
                        <button onclick="excluirInsumo(${insumo.id})">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Erro ao carregar insumos:", error));
});

function excluirInsumo(id) {
    if (confirm("Tem certeza que deseja excluir este insumo?")) {
        fetch(`/api/insumos/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(() => location.reload()) // Recarregar página após excluir
            .catch(error => console.error("Erro ao excluir:", error));
    }
}
