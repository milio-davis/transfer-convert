# transfer-convert-server

Desarrollo Transferencia y conversion de grabaciones

Funcion del software
Mover las grabaciones que se crearan en una carpeta vigilada constantemente del servidor Linux Voice Recorder a una carpeta que las recibe en el servidor Windows. Luego, convertir las grabaciones (creadas en .wav) a formato .mp3 para ocupar menor espacio.

Composicion del software
- Cliente: Vigilador constante de la carpeta contenedora de grabaciones designada (y sus subcarpetas).
    Cuando un nuevo archivo es creado por la grabadora, automaticamente es transferido al Servidor de 
    IP LAN indicada via TCP.
    Esta transferencia envia un primer paquete con el nombre del archivo y luego la conjuncion del archivo
    streameado del Cliente al Servidor.
    Al finalizar la transferencia cierra la conexion con el servidor.

- Servidor: Net Server en escucha constante por nuevas conecciones. Al abrirse una nueva conexion el archivo
    .wav es recibido en la carpeta de salida designada. Al finalizar recibe un evento para comenzar la 
    conversion a formato .mp3 y luego borrar el viejo archivo.


Requerimientos:
Servidor:
https://www.wikihow.com/Install-FFmpeg-on-Windows

Patron de escritura de directorio obligatoria:
C:/Directorio/

Iniciacion del software
Cliente: 
Ejecutar 'sacme tcp client.exe'
Ingresar directorio para vigilia constante por creacion de archivos. Ejemplo: C:/Users/Emiliano/Desktop/Grabaciones/
Especificar puerto. Si ingresa 'default' el puerto asignado automaticamente es 8000.
Especificar IP LAN del Servidor. Ejemplo: 192.168.0.9

Servidor:
Ejecutar 'sacme tcp server.exe'
Especificar puerto. Si ingresa 'default' el puerto asignado automaticamente es 8000.
Ingresar directorio de salida para los archivos .mp3 final. Ejemplo: C:/Users/Emiliano/Desktop/Finales/
Especificar directorio donde se alberga el archivo 'ffmpeg.exe' para la conversion de formato. Si ingresa 'default' el directorio asignado automaticamente es C:/FFMPEG/bin/ffmpeg.exe

Finalizacion del software
Desde el teclado: Ctrl + C
Desde la ventana: Click en Cerrar (X)

Archivos .wav para prueba incluidos en '.../Client/wav sample files'
