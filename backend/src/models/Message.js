import mongoose from 'mongoose';

const messsageSchema = new mongoose.Schema({

    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
        index: true,
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    content: {
        type: String,
        trim: true,
    },
    imgUrl: {
        type: String,
    },

}, {
    timestamps: true
});

messsageSchema.index({ conversationId: 1, createdAt: -1 });
export default mongoose.model('Message', messsageSchema);