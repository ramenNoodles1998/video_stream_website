const { v4: uuidv4 } = require('uuid')
const through = require('through2')
const { Readable } = require('stream')
const fs = require('fs')

const con = require('../../db/db_connection')
const { fstat } = require('fs')

module.exports = homepage = (app) => {
    app.post('/', (req, res) => {
    let req_buffer

    // req.pipe(through((data, _, next) => {
    //     req_buffer = data

    //     next()
    // })).on('finish', () => {
    //         let values = {
    //             video: req_buffer,
    //             video_name: uuidv4() 
    //         }

    //         con.query('insert into videos set ?', values, (err, data) => {
    //             if(err) console.log(err)

    //             console.log('1 record inserted')
    //         })
    //     })
        let stream = fs.createWriteStream('./video.mp4')
        req.pipe(stream)
    })

    app.get('/video', (req, res) => {
        console.log('hit video')
        con.query('select * from videos', (err, result, fields) => {
            if(err) console.log(err)

            if(result.length > 0) {
                //const range = req.headers.range

                let video = result[0].video  
                console.log(video)
                // let video_size = Buffer.byteLength(video)          

                // const chunk_size = 10 ** 6 // 1MB
                // const start = Number(range.replace(/\D/g, ""))
                // const end = Math.min(start + chunk_size, video_size - 1)

                // Create headers
                // const content_length = end - start + 1
                // const headers = {
                //     "Content-Range": `bytes ${start} - ${video_size}`,
                //     "Accept-Ranges": "bytes",
                //     "Content-Length": content_length,
                //     "Content-Type": "video/mp4",
                // }

                // HTTP Status 206 for Partial Content
                //res.writeHead(206, headers)

                let stream = fs.createReadStream('./video.mp4')
                
                // let readable = new Readable()
                // readable._read = () => {}
                // readable.push(video)
                // readable.push(null)
                
                stream.pipe(res)
            }
        })
    })
}

module.exports = homepage 