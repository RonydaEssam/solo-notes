import { PrismaClient } from '../../generated/prisma/client';
import { configDotenv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg"

configDotenv();

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };