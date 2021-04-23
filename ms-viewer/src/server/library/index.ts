import expressLoader from './express';
import { initializeBackend } from "../imodel-web/backend";

export default async ({ expressApp }: any) => {
    console.log('Express loading..');
    await expressLoader({ app: expressApp });
    console.log('Express loaded');
    console.log('4. IModel loading..');
    await initializeBackend();
    console.log('5. IModel loaded');

}