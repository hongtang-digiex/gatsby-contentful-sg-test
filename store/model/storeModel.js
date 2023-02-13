const mongoose = require("mongoose");
//const ratingSchema = require("./rating");
const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    catalog_ids:[String],
    creator_id: String,
    seller_id: String | null,
    product_ids: [String],
    type: String,
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number]
      }
    }
  },
  { timestamps: true }
);
storeSchema.index({ location: '2dsphere' });
storeSchema.method.addCatalogId=function(id){
  this.catalog_ids.push(id);
  return this.save();
}
storeSchema.method.editCatalogId=function(idNew,oldId){
  const index = this.catalog_ids.indexOf(oldId);
  if (index === -1) {
    throw new Error(`Id ${oldId} not found in catalog_ids`);
  }
  this.catalog_ids.splice(index, 1, newId);
  return this.save();
 
}
storeSchema.method.deleteCatalogId=function(catalogId){
  this.catalog_ids=this.catalog_ids.filter((id)=>id!=catalogId)


  return this.save();

}




const Store = mongoose.model("Store", storeSchema);
module.exports = { Store, storeSchema };
