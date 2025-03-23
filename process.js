//either use common js throught the file or es(modern)
import Randomizer from './export.js'
import fs from 'fs'
//const fs = require('fs') this is common js
//Read a file,nest functions in callback to follow the async nature of node

//i know i created a callback hell here, but i wanted to show how to nest functions in callback
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
                    fs.appendFile('read.txt','2',(err)=>{
                        if(err){
                            console.log("Error: ",err)
                            return
                        }
                        console.log(`Successfully appended '2' to the txt file without changing the entire value`)
                        fs.readFile('read.txt','utf8',(err,data)=>{
                            if(err){
                                console.log("Error: ",err)
                                return
                            }
                            console.log(data)
                        })
                    })
                })
          })
})
})

//creating a new directory and add txt file

const createDir = (dirName,callback) => {
    fs.mkdir(dirName,(err)=>{
        if(err){
            console.log('Error: ',err)
            if (callback) callback(err)
            return
        }//move the file creation process inside the call back function
        console.log("Directory is created!")
        fs.writeFile(`${dirName}/new-file.txt`,'This is a new file created inside the new-dir',(err)=>{
            if(err){
                console.log("Error: ",err)
                return
            }
            console.log(`File created inside the directory`)
            if(callback) callback(null)
        })
    })
    
}
//deleting files and directory in order
const deleteDir = (dirName) => {
    fs.unlink(`${dirName}/new-file.txt`,(err)=>{
        if(err){
            console.log("Error: ",err)
            return
        }
        console.log('File deleted')
        fs.rmdir(dirName,(err)=>{
            if(err){
                console.log("Error: ",err)
                return
            }
            console.log(`${dirName} is deleted`)
        })
    })

}
//callback for createDir and deleteDir
const dirName = 'test_dir'

createDir(dirName,(err)=>{
    if(err){
        console.log("Error: ",err)
        return
    }
    setTimeout(()=>{
        deleteDir(dirName)
    },2000)//wait for 2 seconds before deleting the directory
})




const str = process.argv[2] || 'tej'

console.log(`Hello, ${str}!`)