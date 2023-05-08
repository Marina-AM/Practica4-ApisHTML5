//let boton = document.getElementById('iniciar');

//if (boton) {

   // boton.removeEventListener('click', handleFileSelect);
   // boton.addEventListener('click', function() {

    if(window.File && window.FileReader && window.FileList && window.Blob) { //Comprobamos que lo soporta4

        alert('API soportada')

        function handleFileSelect(evt) {
            let file = evt.target.files[0];
            if (!file.type.match('video.*')) {
                return;
            }
        
            let reader = new FileReader();

            reader.onload = (function (archivo) {

                return function (e) {

                    let divVideo = document.getElementsByClassName('contenVideo');

                    if(divVideo[0] != null) {
                        divVideo[0].parentNode.removeChild(divVideo[0]);
                    }
                    
                    let div = document.createElement('div');
                    div.id = "videoDiv";
                    div.className = "contenVideo";
                    div.innerHTML = `<video controls id="video" class="thumb" src="${e.target.result}" title="${escape(archivo.name)}"/>`;

                    document.getElementById('videoOutput').insertBefore(div, null);

                    let cargandoMensaje = document.createElement('p');

                    cargandoMensaje.id = "cargando";
                    cargandoMensaje.className = "cargandoMensaje";
                    cargandoMensaje.innerHTML = 'El video está cargando';

                    document.getElementById('videoOutput').insertBefore(cargandoMensaje, null);

                    let iniciarBoton = document.getElementById('iniciar');
                    let pararBoton = document.getElementById('parar');
                    let subirBoton = document.getElementById('subir');
                    let bajarBoton = document.getElementById('bajar');
                
                    iniciarBoton.addEventListener('click', () => {
                        document.getElementById('video').play();
                    });
                
                    pararBoton.addEventListener('click', () => {
                        document.getElementById('video').pause();
                    })

                    subirBoton.addEventListener('click', () => {
                        document.getElementById('video').volume += 0.1;
                    })

                    bajarBoton.addEventListener('click', () => {
                        document.getElementById('video').volume -= 0.1;
                    })

                    document.getElementById('video').addEventListener('canplay', () => {
                        let cargandoMensaje = document.getElementById('cargando');

                        document.getElementById('videoOutput').removeChild(cargandoMensaje);

                        document.getElementById('video').style.visibility = "visible";

                        iniciarBoton.style.visibility = "visible";
                        pararBoton.style.visibility = "visible";
                        subirBoton.style.visibility = "visible";
                        bajarBoton.style.visibility = "visible"; 
                    });
                }

            }) (file);

            reader.readAsDataURL(file);
        }

        document.getElementById('videoInput').addEventListener('change', handleFileSelect, false);
    } else {
    alert('API no soportada')
    }
//});
//}