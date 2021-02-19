const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const app = express()

const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00"
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00"
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00"
    },
]

// endpoint
app.get(
    '/', // Rota
    (request, response) => {
        const filePath = path.join(__dirname, "/print.ejs")

        ejs.renderFile(
            filePath,
            { passengers },
            (error, html) => { // callback 1
                if (error) {
                    return response.send("Erro na leitura do arquivo")
                }

                // Formato do PDF
                const options = {
                    height: "11.21in",
                    width: "8.5in",
                    header: {
                        height: "20mm"
                    },
                    footer: {
                        height: "20mm"
                    }
                }
                // Criar PDF
                pdf.create(html, options).toFile(
                    "report.pdf",
                    (error, data) => { // callback 2
                        if (error) {
                            return response.send("Erro ao gerar o PDF")
                        }

                        // Enviar para o navegador
                        return response.send(html)  
                    }
                )
            }
        )
    } // Função
)

app.listen(3000)