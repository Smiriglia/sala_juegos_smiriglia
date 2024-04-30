import { Timestamp } from "firebase/firestore";
import { UserInterface } from "./user.interface";

export interface MessageInterface{
    sender: UserInterface,
    texto: string
    fecha: Timestamp,
}