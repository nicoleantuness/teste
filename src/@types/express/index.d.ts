import * as express from "express"
import {IAddressRequest} from '../../interfaces/properties/index'
declare global {
    namespace Express {
        interface Request {
            user: {
                id: string
                userEmail: string
                isAdm: boolean,
                isActive: boolean
            },
            categories: {
                name: string
            },
            properties: {
                addresses: IAddressRequest
            }
        }
    }
}