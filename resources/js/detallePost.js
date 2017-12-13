$(document).ready(function () {
    var urlParametro = new URLSearchParams(window.location.search);
    var idPost = urlParametro.get('postId');
    var root = 'https://jsonplaceholder.typicode.com';
    $.ajax({
        url: root + '/posts/' + idPost,
        method: 'GET'
    }).then(function (post) 
    {
        var detalle= "<div class='panel panel-danger'>"+
            "<div class='panel-heading'>"+
            "<h3 class='panel-title'>"+ post.title +"</h3>"+
            "</div>"+
            "<div class='panel-body'>"+ post.body+"</div>"+
            
            "</div>";    
    $('#detalle').append(detalle);

    $.ajax({
        url: root + '/comments',
        method: 'GET'
    }).then(function (comments) 
    {
        $.each(comments, function(index, comentario)
        {
            if(idPost == comentario.postId)
                {
                    var comentarios= "<div class='panel panel-primary'>"+
                    "<div class='panel-heading'>"+
                    "<h3 class='panel-title'> Nombre:  "+ comentario.name +"</h3>"+
                    "</div>"+
                    "<div class='panel-body'>"+ comentario.body+"</div>"+
                    "<div class='panel-body'> Correo:   "+ comentario.email+"</div>"+
                    "</div>";    
            $('#comentarios').append(comentarios);
                }
        });
    });   
    });
});