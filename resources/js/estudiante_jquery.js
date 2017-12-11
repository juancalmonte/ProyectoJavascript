
var Estudiante = function () {
    var self = this;
    self.id = "";
    self.nombre = "";
    self.matricula = "";
    self.identificacion = "";
    self.telefono = "";
    self.email = "";
}
function agregarEstudiante(estudiante) {
    var rowEstudiante = `<tr>
    <td>${estudiante.id}</td>
    <td>${estudiante.nombre}</td>
    <td>${estudiante.matricula}</td>
    <td>${estudiante.identificacion}</td>
    <td>${estudiante.telefono}</td>
    <td>${estudiante.email}</td>
    <td><input type='checkbox'name='checkbox' id='check' value='${estudiante.id}' class='checked'></td>
    </tr>`
    $("table tbody").append(rowEstudiante);
}
function guardarDb(estudiante) {
    myStorage = window.localStorage;
    var estudiantes = [];
    var dbEstdudiantes = myStorage.getItem("estudiantes");

    if (dbEstdudiantes != null) {
        estudiantes = JSON.parse(dbEstdudiantes);
    }
    estudiantes.push(estudiante);
    myStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}
$(document).ready(function () {
    var myStorage = window.localStorage;
    var dbEstudiantes = myStorage.getItem("estudiantes");
    if (dbEstudiantes != null) {
        var estudiantes = JSON.parse(dbEstudiantes);
        $.each(estudiantes, function (i, est) {
            agregarEstudiante(est);
        });
    };
    $("#agregar-estudiante").click(function () {
        var est = new Estudiante();
        est.id = $("#id").val();
        est.nombre = $("#nombre").val();
        est.matricula = $("#matricula").val();
        est.identificacion = $("#identificacion").val();
        est.telefono = $("#telefono").val();
        est.email = $("#email").val();
        agregarEstudiante(est);
        guardarDb(est);
    });
    $('#eliminar_estudiante').click(function () {
        $('input[name="checkbox"]:checked').each(function () {
            if ($(this).is(':checked')) {
                var idEstudiante = ($(this).val());
                var estudiantesArray = JSON.parse(myStorage.getItem("estudiantes"));
                estudiantesArray = jQuery.grep(estudiantesArray, function (estudiante) {
                    return estudiante.id !== idEstudiante;
                });
                
                myStorage.setItem("estudiantes", JSON.stringify(estudiantesArray));
            }
        });
    });
    $("#eliminar_estudiante").click(function(){
        
        $('input:checked').each(function() {
        $(this).closest('tr').remove();
    });
        
      });
});

