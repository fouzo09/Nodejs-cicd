import { v4 as uuid} from "uuid";

let contacts = [];

export const getUsers = (req, resp)=>{

    return resp.json(contacts);
}

export const addUser = (req, resp)=>{

    contacts.push({...req.body, id: uuid()});
    return resp.json("Contact ajoute avec succes");
}

export const editUser = (req, resp)=>{

    const id = req.body.id;
    const index = contacts.findIndex((item)=> item.id === id);
    if(index !== -1){
        contacts[index]["fullName"] = req.body.fullName;
        contacts[index]["email"] = req.body.email;
        contacts[index]["telephone"] = req.body.telephone;

        return resp.json("Contact modifie avec succes");
    }
    return resp.json("Oopps!!! Contact non trouvé.");
}

export const getUser = (req, resp)=>{

    const id = req.params.id;
    const index = contacts.findIndex((item)=> item.id === id);
    if(index !== -1){
        return resp.json(contacts[index]);
    }
    return resp.json({});
}

export const deleteUser = (req, resp)=>{

    const id = req.params.id;
    const index = contacts.findIndex((item)=> item.id === id);
    if(index !== -1){
        
        contacts.splice(index, 1);
        return resp.json("Contact supprimé avec succes");
    }
    return resp.json("Oopps!!! Contact non trouvé.");
}   

