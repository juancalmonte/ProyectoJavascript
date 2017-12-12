function cargarPost(PostData) {
    var root = 'https://jsonplaceholder.typicode.com';
    $.ajax({
        url: root + '/posts',
        method: 'GET'
    }).then(function (data) {
        var localStorage = window.localStorage;
        var postFavoritos = {};
        var dbPostFavoritos = localStorage.getItem('postFavoritos');
        if (dbPostFavoritos != null) {
            postFavoritos = JSON.parse(dbPostFavoritos);
        }
       
        $.each(data, function (index, postData) {
            var existe = postData.id in postFavoritos;
            var post = "<div class='row'>"
                + "<div class='col-md-12'>"
                    + "<h3>" + postData.title + "</h3>"
                + "</div>"
            + " </div>"
            + "<div class='row'>"
                + " <div class='col-md-10'>"
                     + " <a href='datosusuario.html?id=" + postData.userId + "' class = 'publicador'>"
                     + "  <span class='glyphicon glyphicon-user'></span> " +PostData.name+ " </a>"
            + "</div>"
            + "<div class = 'col-md-2'>"
                 + "<button class='btn btn-danger glyphicon " + (existe ? 'glyphicon-star' : 'glyphicon-star-empty') + " postBotton' data-post_id=" + postData.id + "'></button>"
            + "</div>"
            + "</div>"
                + "<div class ='row'>"
                    + "<div class='col-md-12'>"
                        + "<p>" + postData.body + "</p>"
                     + "</div>"
                 + "</div>"
            + "</div>"
            + "<div>";
            $('#post').append(post);
        });
        $('.postBotton').click(function () {
            var post_id = $(this).data('post_id');
            var existe = agregarPostFavorito(post_id);
            $(this).removeClass(existe ? 'glyphicon-star-empty' : 'glyphicon-star');
            $(this).addClass(existe ? 'glyphicon-star' : 'glyphicon-star-empty');
        });
    });
  
}
function guardarDb(usuario) {
    var usuarios = [];
    myStorage = window.localStorage;
    var dbUsuarios = myStorage.getItem("usuarios");
    if (dbUsuarios != null) {
        usuarios = JSON.parse(dbUsuarios)
    }
    usuarios.push(usuario);
    myStorage.setItem("usuarios", JSON.stringify(usuarios));
};
function traerTodosLosUsuarios(root)
    {
      $.ajax({
        url: root + '/users',
        method: 'GET'
      }).then(function (usuarios) {
        $.each(usuarios, function (index, user) {
          guardarDb(user);
        });
        traerTodosLosPosts(root, usuarios);
      });
    }

    function traerTodosLosPosts(root, usuarios)
    {
      $.ajax({
        url: root + '/posts',
        method: 'GET'
      }).then(function (response) {
        var postDataArray = [];
        $.each(response, function(index, post){
          $.each(usuarios, function(indexUsuario, usuario){
            if(usuario.id === post.userId)
            {
              var postData = {
                userId: usuario.id,
                id: post.id,
                name: usuario.name,
                email: usuario.email,
                title: post.title,
                body: post.body,
                address: post.address
              }
              cargarPost(postData);
              postDataArray.push(postData);
              
            }  
          });       
        });
        window.localStorage.setItem("DatosDelPost", JSON.stringify(postDataArray));
      });
    }

    $(document).ready(function () {
      var root = 'https://jsonplaceholder.typicode.com';
      traerTodosLosUsuarios(root);
    });

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
