import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const connect = () => {
    return mongoose.connect(process.env.MONGODB_URI);
    
};

export default connect;
