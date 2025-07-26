import { plainToInstance } from 'class-transformer';
import {  IsNumber, IsString, validateSync } from 'class-validator';
import config from './config'; 

class EnvConfig {
  @IsNumber()
  PORT:number
  @IsString()
  DB_HOST: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;
}

const rawConfig = config(); 

const validatedConfig = plainToInstance(EnvConfig, rawConfig);
const errors = validateSync(validatedConfig, { skipMissingProperties: false });

if (errors.length) {
  throw new Error(`Config validation error: ${JSON.stringify(errors, null, 2)}`);
}
export default validatedConfig;
export  const MONGO_URI = `mongodb+srv://${validatedConfig.DB_HOST}:${validatedConfig.DB_PASSWORD}@cluster0.1xqqb.mongodb.net/${validatedConfig.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;