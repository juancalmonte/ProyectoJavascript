//Buscar los posts mediante jquery ajax
function cargarPost(){
	var root = 'https://jsonplaceholder.typicode.com';

	$.ajax({
		url: root + '/posts',
		method: 'GET'
	}).then(function(data) {
        var localStorage= window.localStorage;
		var postFavoritos={};
		var dbpostFavoritos= localStorage.getItem('postFavoritos');
		if(dbpostFavoritos!=null){
			postFavoritos=JSON.parse(dbpostFavoritos);
			
		} 
		$.each(data, function(i, p){ 
			var existe= p.id in postFavoritos;	
			var post="<div class='row'>"+
			"<div class='col-md-12'>"+
			"<a class='titulo' href='detallePost.html?postId="+p.id+"'<h3>"+p.title+"</h3></a>"+
			"</div>"+
			"</div>"+
			"<div class='row'>"+
			"<div class='col-md-10'>"
			+ " <a href='datosusuario.html?id=" + p.userId + "' class = 'publicador''>"
			+ "  <span class='glyphicon glyphicon-user'></span> " +  + " </a>"+
			"</div>"+
			"<div class='col-md-2'>"+
			"<button class='btn glyphicon "+(existe ? 'glyphicon-star': 'glyphicon-star-empty')+ " post_boton' data-postid='"+p.id+"'></button>"+
			"</div>"+
			"</div>"+
			"<div class='row'>"+
			"<div class='col-md-12'>"+
			"<p>"+p.body+"</p>"+
			"</div>"+
			"</div>";
			$('#post').append(post);
			
		});
		
		$('.post_boton').click(function(){
			var postId=$(this).data('postid');
			var existe= agregarPostFavorito(postId);

			$(this).removeClass(existe ? 'glyphicon-star-empty': 'glyphicon-star');
            $(this).addClass(existe ? 'glyphicon-star': 'glyphicon-star-empty');
			/*if(existe){
               $(this).removeClass('glyphicon-star-empty');
               $(this).addClass('glyphicon-star');
			}else{
				$(this).addClass('glyphicon-star');
				$(this).removeClass('glyphicon-star-empty');
			}*/
			
		})
	});

};
/*
function guardarDbUsuarios(usuario) {
    myStorage = window.localStorage;
    var usuarios = [];
    var dbUsuarios = myStorage.getItem("usuarios");

    if (dbUsuarios != null) {
        usuarios = JSON.parse(usuario);
    }
    usuarios.push(usuario);
	myStorage.setItem("usuarios", JSON.stringify(usuarios));
}
function traerUsuarios(root)
{
	$.ajax({
        url: root + '/users',
        method: 'GET'
      }).then(function (usuarios) {
        $.each(usuarios, function (index, user) {
			debugger;
			guardarDbUsuarios(user);
        });
      });
}*/
function agregarPostFavorito(postId){
	var localStorage= window.localStorage;
	var postFavoritos={};
	var dbpostFavoritos= localStorage.getItem('postFavoritos');
	if(dbpostFavoritos!=null){
		postFavoritos=JSON.parse(dbpostFavoritos);
	}
	var existe=false;
	if(postId in postFavoritos){
		delete postFavoritos[postId];
	}else {
		existe=true;
		postFavoritos[postId]=true;
	}

	localStorage.setItem('postFavoritos', JSON.stringify(postFavoritos));
	return existe;
}

$(document).ready(function(){
	var root = 'https://jsonplaceholder.typicode.com';
	userid = cargarPost();
	
	//traerUsuarios(root);
	traerUsers(root);
	buscarNombre(2);
});

function buscarNombre(userId)
{
	var myStorage = window.localStorage;
	var usuariosArray = JSON.parse(myStorage.getItem("usuarios"));
	$.each(usuariosArray, function(i, usuarios){
		$.each(usuarios, function(index,id)
		{	
		if(userId === id.id)
			{
				console.log(id.name);
			}
	});
});
}
function guardarDb(user) {
    var myStorage = window.localStorage;
    var users = [];
    var dbuser = myStorage.getItem("usuarios");

    if (dbuser != null) {
        users = JSON.parse(dbuser);
	}
	
    users.push(user);
	myStorage.setItem("usuarios", JSON.stringify(users));
	
}
function traerUsers(root) {
    $.ajax({
		url: root + '/users',
		method: 'GET'
	  }).then(function(data) {
		
		guardarDb(data);
	  });
}

