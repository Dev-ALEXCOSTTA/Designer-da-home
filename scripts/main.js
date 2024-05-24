document.addEventListener('DOMContentLoaded', function() {
    const monthsBr = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const tableDays = document.getElementById('dias');

    function GetDayCalendar(mes, ano) {
        document.getElementById('mes').innerHTML = monthsBr[mes];
        document.getElementById('ano').innerHTML = ano;

        let firstDayOfWeek = new Date(ano, mes, 1).getDay();
        let getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();

        tableDays.innerHTML = ''; // Limpa o conteúdo da tabela

        let date = 1;
        let prevMonthDate = new Date(ano, mes, 0).getDate() - firstDayOfWeek + 1;
        let nextMonthDate = 1;

        for (let i = 0; i < 6; i++) { // 6 semanas (linhas)
            let row = document.createElement('tr');

            for (let j = 0; j < 7; j++) { // 7 dias (colunas)
                let cell = document.createElement('td');

                if (i === 0 && j < firstDayOfWeek) {
                    cell.classList.add('mes-anterior');
                    cell.innerText = prevMonthDate++;
                } else if (date > getLastDayThisMonth) {
                    cell.classList.add('proximo-mes');
                    cell.innerText = nextMonthDate++;
                } else {
                    cell.innerText = date;
                    date++;
                }
                row.appendChild(cell);
            }
            tableDays.appendChild(row);
        }
    }

    let now = new Date();
    let mes = now.getMonth();
    let ano = now.getFullYear();
    GetDayCalendar(mes, ano);

    const botao_proximo = document.getElementById('btn_next');
    const botao_anterior = document.getElementById('btn_ant');

    botao_proximo.addEventListener('click', function() {
        mes++;
        if (mes > 11) {
            mes = 0;
            ano++;
        }
        GetDayCalendar(mes, ano);
    });

    botao_anterior.addEventListener('click', function() {
        mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
        }
        GetDayCalendar(mes, ano);
    });
});
