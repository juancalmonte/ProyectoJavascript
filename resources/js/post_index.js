function cargarPost(){
    var root = 'https://jsonplaceholder.typicode.com';
    $.ajax({
      url: root + '/posts',
      method: 'GET'
    }).then(function(data) {
        var localStorage = window.localStorage;
        var postFavoritos = {};
        var dbPostFavoritos = localStorage.getItem('postFavoritos');
        if(dbPostFavoritos != null)
        {
                postFavoritos = JSON.parse(dbPostFavoritos);
        }
        $.each(data, function(index, p)
        {
            var existe = p.id in postFavoritos;
            var post ="<div class='row'>" 
                +"<div class='col-md-12'>"
                    +"<h3>"+ p.title +"</h3>"
                +"</div>"     
            +" </div>"       
            +"<div class='row'>"
                +" <div class='col-md-10'>"
                     +" <a href='' class = 'publicador'>"
                     +"  <span class='glyphicon glyphicon-user'></span> Juan Carlos Almonte - juancalmonter@asd.com </a>"
            +"</div>"
            +"<div class = 'col-md-2'>"
                 +"<button class='btn btn-danger glyphicon "+(existe ? 'glyphicon-star' : 'glyphicon-star-empty')+" postBotton' data-post_id="+p.id+"'></button>"
            +"</div>"
            +"</div>"
                +"<div class ='row'>"
                    +"<div class='col-md-12'>"
                        +"<p>"+p.body +"</p>"
                     +"</div>"
                 +"</div>"
            +"</div>"
            +"<div>";
            $('#post').append(post);
        });
        $('.postBotton').click(function()
        {
            var post_id = $(this).data('post_id');
            var existe = agregarPostFavorito(post_id);
            $(this).removeClass(existe ? 'glyphicon-star-empty' : 'glyphicon-star');
            $(this).addClass(existe ? 'glyphicon-star' : 'glyphicon-star-empty');
        });
    });
}
function agregarPostFavorito(post_id){
    var localStorage = window.localStorage;
    var postFavoritos = {};
    var dbPostFavoritos = localStorage.getItem('postFavoritos');
    if(dbPostFavoritos != null)
    {
            postFavoritos = JSON.parse(dbPostFavoritos);
    }
    var existe = false;
    if(post_id in postFavoritos)
    {
        delete postFavoritos[post_id];
    }
    else
    {
        existe = true;
        postFavoritos[post_id] = true;
    }
    localStorage.setItem('postFavoritos',JSON.stringify(postFavoritos));
    return existe;
}
$(document).ready(function(){
    cargarPost();

});