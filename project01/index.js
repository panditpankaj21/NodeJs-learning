const express = require("express")
const fs = require("fs")
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

//****************************Routes****************************

app.use(express.urlencoded({extended: false}));

app.get("/api/users", (req, res)=>{
    return res.json(users)
})

/*
app.get("/api/users/:id", (req, res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id)
    return res.json(user)
})

app.patch("/api/users/:id", (req, res)=>{
    //TODO: Edit the user with id
    return res.json({status: "pending"});
})

app.delete("/api/users/:id", (req, res)=>{
    //TODO: Delete the user with id
    return res.json({status: "pending"});
})
*/
//above all have same path or route so we can combine together we get

app.route("/api/users/:id")
.get((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id)
    return res.json(user)
})
.patch((req, res)=> {
     //TODO: Edit the user with id
     const body = req.body;
     console.log(req.params);
     const id = req.params.id;
     const newUsers = users.map(user => {
        if(user.id==id){
            return {...user, ...body}
        }else return user
     })
     fs.writeFile("./MOCK_DATA.json", JSON.stringify(newUsers), (err, data)=>{
        return res.json({status: "user edited successfully", id: id});
     })
})
.delete((req, res)=> {
    //TODO: Delete the user with id
    return res.json({status: "pending"});
})



app.post("/api/users", (req, res)=>{
    //TODO: Create new User
    console.log(req.body)
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json({status: "success", id: users.length});
    })
})







// Server Side Rendering

// app.get("/users", (req, res)=>{
//     const html = `
//     <ul>
//         ${users.map(user => `<li>${user.first_name}</li>`)}
//     </ul>
//     `
//     res.send(html)
// })



//*********************************************************** */



app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})


