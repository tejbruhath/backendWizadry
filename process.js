//either use common js throught the file or es(modern)
import Randomizer from './export.js'
import fs from 'fs'
//const fs = require('fs') this is common js
//Read a file,nest functions in callback to follow the async nature of node
fs.readFile('read.txt','utf8',(err,data)=>{
    if(err){
        console.log("Unable to read file due to:",err)
        return
    }
    console.log(`Initial value ${data}`)
    //write a file
    const content = `The value for this read.txt is changed with 'fs'`
     fs.writeFile('read.txt',content,(err)=>{
         if(err){
             console.log("Error: ",err)
             return
         }
          console.log(`File edited Successfully`)
          fs.writeFile('read.txt',Randomizer(10),(err)=>{
                if(err){
                    console.log("Error: ",err)
                    return
                }
                console.log('read.txt has been edited again with randomizer')
                fs.readFile('read.txt','utf8',(err,data)=>{
                    if(err){
                        console.log("Error: ",err)
                        return
                    }
                    console.log(`The new content of read.txt is: ${data}`)
                })
          })
})
})

// creating a new directory and add txt file
// console.log(fs.readFileSync('read.txt','utf8'))
// const createDir = (dirName) => {
//     fs.mkdir(dirName,(err)=>{
//         if(err){
//             console.log('Error: ',err)
//             return
//         }//move the file creation process inside the call back function
//         console.log("Directory is created!")
//         fs.writeFile(`${dirName}/new-file.txt`,'This is a new file created inside the new-dir',(err)=>{
//             if(err){
//                 console.log("Error: ",err)
//                 return
//             }
//             console.log(`File created inside the directory`)
//         })
//     })
    
// }
// createDir(process.argv[2])




const str = process.argv[2]

console.log(`Hello ,${str}!`)