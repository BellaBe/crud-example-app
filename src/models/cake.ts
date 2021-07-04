import mongoose from "mongoose";
import { CakeStatus } from "./types/cake-status";

export { CakeStatus };

interface CakeAttrs {
    name: string,
    comment: string,
    imageUrl: string,
    yumFactor: number,
    status: CakeStatus
}
interface CakeDoc extends mongoose.Document {
    name: string,
    comment: string,
    imageUrl: string,
    yumFactor: number,
    status: CakeStatus
}
interface CakeModel extends mongoose.Model<CakeDoc> {
    build(attrs: CakeAttrs): CakeDoc;
}

const cakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    yumFactor: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        require: true,
        enum: Object.values(CakeStatus),
        default: CakeStatus.Created
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    });

cakeSchema.statics.build = (attrs: CakeAttrs) => {
    return new Cake(attrs);
};

const Cake = mongoose.model<CakeDoc, CakeModel>("Cake", cakeSchema);

export { Cake };
