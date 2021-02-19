const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')
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

// await = apenas para funções assíncronas (async)
app.get(
    '/pdf',
    async(request, response) => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(
            'http://localhost:3000/',
            {
                waitUntil: 'networkidle0'
            } // Esperar a página carregar
        )

        const pdf = await page.pdf({
            printBackground: true,
            format: 'Letter',
            margin: {
                top: "20px",
                bottom: "20px",
                left: "20px",
                right: "20px"
            }
        })

        await browser.close()

        response.contentType("application/pdf")

        return response.send(pdf)
    }
)

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
                
                return response.send(html)
            }
        )
    } // Função
)

app.listen(3000)