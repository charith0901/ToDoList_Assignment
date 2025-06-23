import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw new Error('MongoDB connection failed');
    }   
}
export default connect;
