
/*
Servidor GO para la lectura de los datos generador por los modulos

        INTEGRANTES DE GRUPO 28
        Katherine Mishelle Serrano Del Cid -201314697
        Carlos Gabriel Peralta Cambrán - 201314556
        Jossie Bismarck Castrillo Fajardo - 201313692
*/

package main

import (
        "fmt"// Imprimir en consola
        "io"
        "io/ioutil"// Ayuda a escribir en la respuesta
        "log"//Loguear si algo sale mal
        "net/http"// El paquete HTTP
        "strconv"
        "os"

)

func main() {

        http.HandleFunc("/hola", func(w http.ResponseWriter, peticion *http.Request) {
                io.WriteString(w, "Hola Mundo!!")
        })


                http.HandleFunc("/memo", func(w http.ResponseWriter, peticion *http.Request) {

                nombreArchivo := "/proc/mem_grupo28"
                bytesLeidos, err := ioutil.ReadFile(nombreArchivo)
                if err != nil {
                        fmt.Printf("Error leyendo archivo: %v", err)
                }

                contenido := string(bytesLeidos)
                 io.WriteString(w,contenido)


        })

        http.HandleFunc("/proc", func(w http.ResponseWriter, peticion *http.Request) {


                nombreArchivo := "/proc/proc_grupo28"
                bytesLeidos, err := ioutil.ReadFile(nombreArchivo)
                if err != nil {
                        fmt.Printf("Error leyendo archivo: %v", err)
                }

                contenido := string(bytesLeidos)
                 io.WriteString(w,contenido)
        })


        http.HandleFunc("/kill", func(w http.ResponseWriter, peticion *http.Request) {

                                //matar:=peticion.URL.Query()["id"]
                                //proceso := strconv.ParseInt(matar[0], 10, 32)
                                matar:=peticion.URL.Query().Get("id")
                                proceso,err := strconv.Atoi(matar)
                
                                proc, err := os.FindProcess(proceso)

                                if err != nil {
                                        log.Println(err)
                                }
                                // Kill the process
                                proc.Kill()

                io.WriteString(w,"KIllING PROCESS  " + matar)
        })



        direccion := ":8080"
        fmt.Println("Servidor GO listo escuchando en " + direccion)
        log.Fatal(http.ListenAndServe(direccion, nil))
}


