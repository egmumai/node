import mongoose, { ConnectOptions } from 'mongoose';

interface MongooseConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;

}

const options: MongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,

};

export const dbConnection = async (): Promise<void> => {
  try {
    const MONGODB_URI = 'mongodb+srv://explotacion:ZAsJIuqgFsvsJpyJ@explotaciones.aou2erk.mongodb.net/jesuscaceres';
    await mongoose.connect(MONGODB_URI, options);
    console.log('Connected to MongoDB');
  } catch (err) {

    throw new Error('Error al iniciar BD');
  }
};