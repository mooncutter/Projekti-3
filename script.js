$(document).ready(function() {
    const $form = $('#todo-form');
    const $input = $('#todo-input');
    const $todoList = $('#todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        $todoList.empty();
        todos.forEach((todo, index) => {
            const $li = $('<li></li>')
                .toggleClass('completed', todo.completed)
                .hide();

            const $span = $('<span></span>').text(todo.text);
            const $deleteBtn = $('<button class="delete-btn">Poista</button>').attr('data-index', index);
            const $checkbox = $('<input type="checkbox" class="complete-btn">')
                .attr('data-index', index)
                .prop('checked', todo.completed);

            $li.append($span, $deleteBtn, $checkbox);
            $todoList.append($li);
            $li.fadeIn(400);
        });
    }

    $form.on('submit', function(event) {
        event.preventDefault();
        const todoText = $input.val().trim();

        if (todoText === '') {
            $input.addClass('error');
            alert('Tehtävä ei voi olla tyhjä!');
            return;
        } else if (todoText.length < 3) {
            $input.addClass('error');
            alert('Tehtävän tulee olla vähintään 3 merkkiä pitkä');
            return;
        }

        $input.removeClass('error');

        todos.push({
            text: todoText,
            completed: false
        });

        saveTodos();
        renderTodos();

        $input.val('');
    });

    $todoList.on('click', '.delete-btn', function() {
        const index = $(this).data('index');

        $(this).closest('li').fadeOut(400, function() {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });
    });

    $todoList.on('change', '.complete-btn', function() {
        const index = $(this).data('index');
        todos[index].completed = $(this).prop('checked');
        saveTodos();
        renderTodos();
    });

    renderTodos();
});