// Odotetaan, että dokumentti on ladattu ennen kuin ajetaan mitään
$(document).ready(function() {

    // Haetaan tarvittavat DOM-elementit jQueryn avulla
    const $form = $('#todo-form');
    const $input = $('#todo-input');
    const $todoList = $('#todo-list');

    // Ladataan tallennetut tehtävät localStoragesta, tai luodaan tyhjä lista
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Tallennetaan tehtävät localStorageen
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Piirretään kaikki tehtävät listaan
    function renderTodos() {
        $todoList.empty(); // Tyhjennetään lista ensin

        todos.forEach((todo, index) => {
            // Luodaan <li>-elementti jQueryllä ja piilotetaan aluksi
            const $li = $('<li></li>')
                .toggleClass('completed', todo.completed)
                .hide(); // Piilotetaan ennen fadeIn

            // Tehtävän teksti
            const $span = $('<span></span>').text(todo.text);

            // Poista-nappi, jossa data-index
            const $deleteBtn = $('<button class="delete-btn">Poista</button>')
                .attr('data-index', index);

            // Checkbox tehtävän suorittamiseen
            const $checkbox = $('<input type="checkbox" class="complete-btn">')
                .attr('data-index', index)
                .prop('checked', todo.completed);

            // Lisätään elementit <li>-elementtiin
            $li.append($span, $deleteBtn, $checkbox);

            // Lisätään <li> listaan ja näytetään fadeIn-efektillä
            $todoList.append($li);
            $li.fadeIn(400);
        });
    }

    // Lomakkeen lähetys: uuden tehtävän lisäys
    $form.on('submit', function(event) {
        event.preventDefault(); // Estetään lomakkeen oletustoiminta

        const todoText = $input.val().trim();

        // Validointi: ei tyhjää ja vähintään 3 merkkiä
        if (todoText === '') {
            $input.addClass('error');
            alert('Tehtävä ei voi olla tyhjä!');
            return;
        } else if (todoText.length < 3) {
            $input.addClass('error');
            alert('Tehtävän tulee olla vähintään 3 merkkiä pitkä');
            return;
        }

        // Poistetaan virheluokka
        $input.removeClass('error');

        // Luodaan uusi tehtäväobjekti ja lisätään listaan
        todos.push({
            text: todoText,
            completed: false
        });

        // Tallennetaan ja päivitetään näkymä
        saveTodos();
        renderTodos();

        // Tyhjennetään syötekenttä
        $input.val('');
    });

    // Delegoitu tapahtumankäsittely Poista-napille
    $todoList.on('click', '.delete-btn', function() {
        const index = $(this).data('index');

        // Poistetaan tehtävä fadeOut-efektillä
        $(this).closest('li').fadeOut(400, function() {
            todos.splice(index, 1); // Poistetaan listasta
            saveTodos();
            renderTodos(); // Päivitetään näkymä
        });
    });

    // Tehtävän merkitseminen suoritetuksi / suorittamattomaksi
    $todoList.on('change', '.complete-btn', function() {
        const index = $(this).data('index');
        todos[index].completed = $(this).prop('checked'); // Päivitetään tila
        saveTodos();
        renderTodos(); // Päivitetään näkymä (päivittää ulkoasun)
    });

    // Ladataan tehtävät sivun alussa
    renderTodos();
});

    renderTodos();
});
