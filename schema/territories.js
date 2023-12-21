const z = require('zod')

const territorySchema = z.object({
  territoryName: z.string(),
  territoryImg: z.string().url(),
  territoryBlocks: z.number(),
  predicate: z.array(z.number()),
  historyPredicate: z.array(z.object({
    capitain: z.string(),
    blocks: z.array(z.number()),
    date: z.string(),
    observations: z.string()
  })).default({})
 })

 const validateHistory = z.object({
    capitain: z.string(),
    blocks: z.array(z.number()),
    date: z.string(),
    observations: z.string()
 })

 function validateSchema(fn, object) {
  if(fn === "territory") {
    return territorySchema.safeParse(object)
  }
  if(fn === "history") {
    return validateHistory.safeParse(object)
  }
 }

 module.exports = {
  validateSchema
 }
