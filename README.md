# transfer-convert-server

Desarrollo Transferencia y conversión de grabaciones

Función del software
Mover las grabaciones que se crearan en una carpeta vigilada constantemente del servidor Linux Voice Recorder a una carpeta que las recibe en el servidor Windows. Luego, convertir las grabaciones (creadas en .wav) a formato .mp3 para ocupar menor espacio.

Composición del software
- Cliente: Vigilador constante de la carpeta contenedora de grabaciones designada (y sus subcarpetas). 
Cuando un nuevo archivo es creado por la grabadora, automáticamente es transferido al Servidor de IP LAN indicada vía TCP.
Esta transferencia envía un primer paquete con el nombre del archivo y luego la conjunción del archivo streameado del Cliente al Servidor.
Al finalizar la transferencia cierra la conexión con el servidor.

- Servidor: Net Server en escucha constante por nuevas conexiones. Al abrirse una nueva conexión el archivo .wav es recibido en la carpeta de salida designada. 
Al finalizar recibe un evento para comenzar la conversión a formato .mp3 y luego borrar el viejo archivo.

Requerimientos:
Servidor:
•	FFMPEG Conversor de audio
TODO


Patrón de escritura de directorios obligatoria:
C:/Directorio/

Iniciación del software:
Cliente: 
•	Ejecutar 'sacme tcp client.exe'
•	Ingresar directorio para vigilia constante por creación de archivos. Ejemplo: C:/Users/Emiliano/Desktop/Grabaciones/
•	Especificar puerto. Si ingresa 'default' el puerto asignado automáticamente es 8000.
•	Especificar IP LAN del Servidor. Ejemplo: 192.168.0.9

Servidor:
•	Ejecutar 'sacme tcp server.exe'
•	Especificar puerto. Si ingresa 'default' el puerto asignado automáticamente es 8000.
•	Ingresar directorio de salida para los archivos .mp3 final. Ejemplo: C:/Users/Emiliano/Desktop/Finales/
•	Especificar directorio donde se alberga el archivo 'ffmpeg.exe' para la conversión de formato. Si ingresa 'default' el directorio asignado automáticamente es C:/FFMPEG/bin/ffmpeg.exe

Finalización del software:
Desde el teclado: Ctrl + C
Desde la ventana: Click en Cerrar (X)

Archivos .wav para prueba incluidos en '.../Client/wav sample files'

