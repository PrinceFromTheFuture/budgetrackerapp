import config from '@payload-config'

import { getPayload } from "payload"

export const log = (val:any)=>console.log(val)


export const payload = await getPayload({ config })
