// Obtenemos los elementos del DOM que necesitamos manipular
var inputTarea = document.getElementById("tarea"); // Input donde el usuario escribe la nueva tarea
var btn = document.getElementById("agregar"); // Botón que agrega la tarea a la lista
var listado = document.getElementById("listado"); // Contenedor de las tareas (una lista <ul>)
var cantidad = document.getElementById("cantidad"); // Mostrará la cantidad de tareas pendientes
var completadas = document.getElementById("completadas"); // Mostrará la cantidad de tareas completadas
var mensaje = document.getElementById("mensaje"); // Mensaje que aparece si intentamos agregar una tarea vacía

// Variables que usamos para llevar el conteo de tareas
var total = 0; // Número total de tareas pendientes
var totalCompletadas = 0; // Número total de tareas completadas

// Acción principal: añadir una nueva tarea al hacer clic en el botón "Agregar"
btn.onclick = function () {
    // Si el campo está vacío, mostramos un mensaje de error
    if (inputTarea.value === "") {
        mensaje.style.display = "block"; // Mostramos el mensaje de advertencia
        setTimeout(function () {
            mensaje.style.display = "none"; // Ocultamos el mensaje después de 10 segundos
        }, 10000); // 10 segundos de espera antes de ocultar
        return; //Salimos de la función
    }

    // Guardamos el texto ingresado en el input
    var elemento = inputTarea.value;

    // Creamos un nuevo elemento <li> que representa la tarea
    var li = document.createElement("li");
    li.textContent = elemento; // Añadimos el texto de la tarea al <li>
    listado.appendChild(li); // Insertamos el <li> en la lista de tareas

    // Creamos un botón para eliminar esta tarea
    var btnEliminar = document.createElement("button");
    btnEliminar.textContent = "×"; // El texto del botón es el símbolo "×" (para eliminar)
    btnEliminar.className = "btn-eliminar"; // Añadimos una clase para aplicar estilos

    // Cuando se hace clic en el botón de eliminar
    btnEliminar.onclick = function () {
        if (!li.classList.contains("completed")) { // Solo podemos eliminar tareas no completadas
            li.remove(); // Eliminamos el <li> de la lista
            total--; // Disminuimos el número total de tareas pendientes
            cantidad.innerHTML = total; // Actualizamos el contador en la interfaz
        }
    };

    // Creamos un botón para marcar la tarea como completada
    var btnCheck = document.createElement("button");
    btnCheck.textContent = "✔"; // El texto del botón es un check (✔) para completar
    btnCheck.className = "btn-check"; // Añadimos una clase para estilos específicos

    // Cuando se hace clic en el botón de completar/descompletar
    btnCheck.onclick = function () {
        if (li.classList.contains("completed")) {
            // Si ya estaba completada, la desmarcamos
            li.classList.remove("completed"); // Quitamos la clase "completed"
            btnEliminar.disabled = false; // Rehabilitamos el botón de eliminar
            total++; // Aumentamos la cantidad de tareas pendientes
            totalCompletadas--; // Disminuimos las tareas completadas
        } else {
            // Si no estaba completada, la marcamos como completada
            li.classList.add("completed"); // Añadimos la clase "completed"
            btnEliminar.disabled = true; // Deshabilitamos el botón de eliminar
            total--; // Disminuimos las pendientes
            totalCompletadas++; // Aumentamos las completadas
        }

        // Actualizamos los contadores en la interfaz
        cantidad.innerHTML = total;
        completadas.innerHTML = totalCompletadas;
    };

    // Agregamos los botones (eliminar y completar) al <li>
    li.appendChild(btnCheck);
    li.appendChild(btnEliminar);

    // Actualizamos el contador de tareas pendientes
    total++;
    cantidad.innerHTML = total;

    // Limpiamos el campo de entrada para que el usuario pueda escribir otra tarea
    inputTarea.value = "";
};
