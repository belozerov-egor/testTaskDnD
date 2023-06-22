import axios from "axios";



const instance = axios.create({
    baseURL: "https://dashboard.bit76.ru/"
 })

 export const control = {
    getValues () {
        return instance.get("/controlValue/")
    },
 }
 export const table = {
    getValues () {
        return instance.get("/tableValues/")
    },
 }
 export const graph = {
    getValues () {
        return instance.get("/graphValues/")
    },
 }
